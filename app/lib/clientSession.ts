import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';

export async function verifySession() {
    const cookie = (await cookies()).get('session')?.value;
    if (!cookie) return null;

    const payload = await decrypt(cookie);

    if (!payload?.userId) return null;

    return {
        userId: payload.userId as string,
        userRole: payload.userRole as string,
        userName: payload.userName as string,
    };
}
