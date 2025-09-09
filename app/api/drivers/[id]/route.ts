import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

// Lấy 1 driver theo id
export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const driver = await db.driver.findUnique({
            where: { id: params.id },
            include: { vehicle: true, shipments: true },
        });

        if (!driver) {
            return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
        }

        return NextResponse.json(driver);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch driver' }, { status: 500 });
    }
}

// Cập nhật driver
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { name, phone, imageUrl, badge, license, vehicleId, shipments } = body;

        const driver = await db.driver.update({
            where: { id: params.id },
            data: { name, phone, imageUrl, badge, license, vehicleId, shipments },
        });

        return NextResponse.json(driver);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update driver' }, { status: 500 });
    }
}

// Xoá driver
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await db.driver.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Driver deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete driver' }, { status: 500 });
    }
}
