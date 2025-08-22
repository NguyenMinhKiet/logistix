import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { db } from '@/app/lib/db';
import { Role as PrismaRole } from '@prisma/client';

export type UserSummary = {
    id: string;
    name: string;
    email: string;
    role: PrismaRole;
};
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return { isAuth: true, userId: session.userId, userName: session.userName, userRole: session.userRole };
});

export const getUser = cache(async (id: string): Promise<UserSummary | null> => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const user = await db.user.findFirst({
            where: { id: session.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return user;
    } catch (error) {
        console.log('Failed to fetch user', error);
        return null;
    }
});
