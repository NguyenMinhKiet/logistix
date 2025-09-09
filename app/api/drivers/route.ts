import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

// Lấy tất cả drivers
export async function GET() {
    try {
        const drivers = await db.driver.findMany({
            include: { vehicle: true, shipments: true },
        });
        return NextResponse.json(drivers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 });
    }
}

// Tạo driver mới
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, imageUrl, badge, license, vehicleId } = body;
        console.log(name, phone, imageUrl, badge, license, vehicleId);
        const driver = await db.driver.create({
            data: { name, phone, imageUrl, badge, license, vehicleId },
        });

        return NextResponse.json(driver, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create driver' }, { status: 500 });
    }
}
