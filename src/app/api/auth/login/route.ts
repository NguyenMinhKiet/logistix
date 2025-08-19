import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Tìm user theo email
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                warehouses: true,
                stores: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // So sánh password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Tạo JWT
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                warehouses: user.warehouses,
                stores: user.stores,
            },
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) return NextResponse.json({ error: 'JWT_SECRET is not defined' }, { status: 404 });

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        // Nếu muốn trả JWT hoặc session, xử lý ở đây
        return NextResponse.json({
            token,
            message: 'Login successfully',
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
