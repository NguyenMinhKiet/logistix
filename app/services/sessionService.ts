import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { db } from '@/app/lib/db';
import { SessionPayload, UserSession } from '@/app/types';

export class SessionService {
    private readonly secretKey: Uint8Array;
    private readonly SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

    constructor() {
        const key = process.env.SESSION_SECRET;
        if (!key) throw new Error('SESSION_SECRET is not defined');
        this.secretKey = new TextEncoder().encode(key);
    }

    private async encrypt(payload: SessionPayload): Promise<string> {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(this.secretKey);
    }

    private async decrypt(token: string | undefined = ''): Promise<SessionPayload | null> {
        try {
            const { payload } = await jwtVerify(token, this.secretKey, {
                algorithms: ['HS256'],
            });
            return payload as SessionPayload;
        } catch (error) {
            console.error('Failed to verify session:', error);
            return null;
        }
    }

    async createSession(userId: string) {
        const expiresAt = new Date(Date.now() + this.SESSION_DURATION);

        // Create session in database
        const dataSession = await db.session.create({
            data: { userId, expiresAt },
        });

        // Get user data for session payload
        const user = await db.user.findUniqueOrThrow({
            where: { id: userId },
        });

        // Create and encrypt session token
        const session = await this.encrypt({
            sessionId: dataSession.id,
            expiresAt,
            userId: user.id,
            userName: user.name,
            userRole: user.role,
        });

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set('session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        });

        return dataSession;
    }

    async updateSession() {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;
        const payload = await this.decrypt(session);

        if (!session || !payload) {
            return null;
        }

        const expires = new Date(Date.now() + this.SESSION_DURATION);

        cookieStore.set('session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires,
            sameSite: 'lax',
            path: '/',
        });
    }

    async deleteSession() {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;
        if (session) {
            const payload = await this.decrypt(session);
            if (payload?.sessionId) {
                await db.session.delete({
                    where: { id: payload.sessionId },
                });
            }
        }
        cookieStore.delete('session');
    }

    async getCurrentUser() {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;
        const payload = await this.decrypt(session);

        if (!session || !payload) {
            return null;
        }

        return {
            id: payload.userId,
            name: payload.userName,
            role: payload.userRole,
        };
    }

    async verifySession(token?: string): Promise<UserSession | null> {
        try {
            const cookieStore = await cookies();
            const sessionToken = token || cookieStore.get('session')?.value;

            if (!sessionToken) {
                return null;
            }

            const payload = await this.decrypt(sessionToken);

            // Early return if payload or required fields are missing
            if (!payload?.userId || !payload.userName || !payload.userRole) {
                return null;
            }

            const session = await db.session.findUnique({
                where: { id: payload.sessionId },
                include: { user: true },
            });

            if (!session || session.expiresAt < new Date()) {
                await this.deleteSession();
                return null;
            }

            // Now we're sure all fields exist
            return {
                id: payload.userId,
                name: payload.userName,
                role: payload.userRole,
            };
        } catch (error) {
            console.error('Session verification failed:', error);
            return null;
        }
    }
}

export const sessionService = new SessionService();
