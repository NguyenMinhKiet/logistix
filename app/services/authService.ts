import { db } from '@/app/lib/db';
import { hash, compare } from 'bcrypt';

export class AuthService {
    async createUser(name: string, email: string, password: string) {
        const exists = await db.user.findUnique({ where: { email } });
        if (exists) {
            throw new Error('Email đã được sử dụng');
        }

        const hashedPassword = await hash(password, 10);

        return db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    }

    async authorize(email: string, password: string) {
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Email không tồn tại');
        }

        const valid = await compare(user.password, password);
        if (!valid) {
            throw new Error('Mật khẩu không chính xác');
        }

        return user;
    }
}

export const authService = new AuthService();
