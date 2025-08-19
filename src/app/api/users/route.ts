// app/api/users/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        },
    });
    return NextResponse.json(user);
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        if (!body.id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Lấy user hiện tại
        const existingUser = await prisma.user.findUnique({
            where: { id: body.id },
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        //  Chỉ update những trường được gửi, còn lại giữ nguyên
        const updateData: Prisma.UserUpdateInput = {
            name: body.name ?? existingUser.name,
            email: body.email ?? existingUser.email,
            role: body.role ?? existingUser.role,
            updatedAt: new Date(),
        };

        if (body.password) {
            updateData.password = await bcrypt.hash(body.password, 10);
        }

        // Nếu muốn update mối quan hệ (warehouses, stores, transactions)
        // thì cần dùng connect / disconnect / set
        if (body.warehouses) {
            updateData.warehouses = { set: body.warehouses }; // body.warehouses = array of warehouse IDs
        }
        if (body.stores) {
            updateData.stores = { set: body.stores }; // body.stores = array of store IDs
        }
        if (body.transactions) {
            updateData.transactions = { set: body.transactions }; // array of transaction IDs
        }

        const user = await prisma.user.update({
            where: { id: body.id },
            data: updateData,
        });

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = params.id;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Kiểm tra user tồn tại
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Xóa user
        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
