// app/actions/Create.ts
'use server';
import { db } from '@/app/lib/db';
import bcrypt from 'bcrypt';

export async function createUser(name: string, email: string, password: string) {
    const isExistingUser = await db.user.findUnique({ where: { email } });
    if (isExistingUser) throw { field: 'email', message: `Email '${email}' đã tồn tại !`, status: 409 };
    return await db.user.create({
        data: {
            name,
            email,
            password: await bcrypt.hash(password, 10),
        },
    });
}

export async function authorize(email: string, password: string) {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw { field: 'email', message: 'User not found', status: 404 };
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw { field: 'password', message: 'Password incorrect', status: 409 };

    return user;
}
