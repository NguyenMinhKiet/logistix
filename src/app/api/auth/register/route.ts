import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Email, name and password are required' }, { status: 400 });
        }

        const isExistUser = await prisma.user.findUnique({
            where: { email },
        });
        if (isExistUser) return NextResponse.json({ error: `Email ${email} is already in use` }, { status: 400 });

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 10),
            },
        });

        const newUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: { warehouses: true, stores: true },
        });

        // Tạo JWT
        const payload = {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                warehouses: newUser.warehouses,
                stores: newUser.stores,
            },
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) return NextResponse.json({ error: 'JWT_SECRET is not defined' }, { status: 404 });

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        // Nếu muốn trả JWT hoặc session, xử lý ở đây
        return NextResponse.json({
            token,
            message: 'Register successfully',
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
