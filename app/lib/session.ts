import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '@/app/lib/definitions/definitions';
import { cookies } from 'next/headers';
import { db } from '@/app/lib/db';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error: any) {
        console.log('Failed to verify session:', error.message);
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 1. Create a session in the database
    const dataSession = await db.session.create({ data: { userId, expiresAt } });

    const sessionId = dataSession.id;

    const user = await db.user.findUnique({ where: { id: userId } });

    // 2. Encrypt the session ID
    const session = await encrypt({
        sessionId,
        expiresAt,
        userId: user?.id,
        userName: user?.name,
        userRole: user?.role,
    });

    // 3. Store the session in cookies for optimistic auth checks
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
