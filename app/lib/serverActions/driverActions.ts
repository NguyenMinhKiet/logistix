'use server';

import { formatArrayServerToClient, formatServerToClient } from '@/app/helpers/formatServerToClient';
import { db } from '@/app/lib/db';
import { Driver, EDriverStatus } from '@/app/types';
import { Driver as PrismaDriver } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Cast Server To Client
const formatDriver = (driver: PrismaDriver): Driver => ({
    ...formatServerToClient(driver),
    badge: driver.badge as unknown as Driver['badge'],
});

const formatDrivers = (drivers: PrismaDriver[]): Driver[] => drivers.map((driver) => formatDriver(driver));

export async function getDrivers() {
    try {
        const drivers = await db.driver.findMany();
        return formatDrivers(drivers);
    } catch (error) {
        throw new Error('Failed to fetch drivers');
    }
}

export async function editDriver(prevState: any, formData: FormData) {
    try {
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const license = formData.get('license') as string;
        const badge = formData.get('badge') as string;
        const vehicleId = formData.get('vehicleId') as string;
        const imageUrl = formData.get('currentImage') as string;

        // Validation
        const errors: { [key: string]: string[] } = {};

        if (!name) errors.name = ['Tên tài xế là bắt buộc'];
        if (!phone) errors.phone = ['Số điện thoại là bắt buộc'];
        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                errors,
                message: 'Vui lòng kiểm tra lại thông tin',
            };
        }

        // Update driver
        const updatedDriver = await db.driver.update({
            where: { id },
            data: {
                name,
                phone,
                license: license || null,
                badge: badge as any,
                vehicleId: vehicleId || null,
                imageUrl: imageUrl || null,
            },
        });

        revalidatePath('/dashboard/drivers');

        return {
            success: true,
            data: formatDriver(updatedDriver),
            message: 'Cập nhật tài xế thành công',
        };
    } catch (error) {
        console.error('Edit driver error:', error);
        return {
            success: false,
            message: 'Có lỗi xảy ra khi cập nhật tài xế',
        };
    }
}

export async function createDriver(prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const license = formData.get('license') as string;
        const badge = formData.get('badge') as string;
        const vehicleId = formData.get('vehicleId') as string;
        const imageUrl = formData.get('currentImage') as string;

        // Validation
        const errors: { [key: string]: string[] } = {};

        if (!name) errors.name = ['Tên tài xế là bắt buộc'];
        if (!phone) errors.phone = ['Số điện thoại là bắt buộc'];
        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                errors,
                message: 'Vui lòng kiểm tra lại thông tin',
            };
        }

        // Create driver
        const newDriver = await db.driver.create({
            data: {
                name,
                phone,
                license: license || null,
                badge: badge as EDriverStatus,
                vehicleId: vehicleId || null,
                imageUrl: imageUrl || null,
            },
        });

        revalidatePath('/dashboard/drivers');

        return {
            success: true,
            data: formatDriver(newDriver),
            message: 'Thêm tài xế thành công',
        };
    } catch (error) {
        console.error('Create driver error:', error);
        return {
            success: false,
            message: 'Có lỗi xảy ra khi thêm tài xế',
        };
    }
}

export async function deleteDriver(id: string) {
    try {
        // Xoá driver trong DB
        const driver = await db.driver.delete({
            where: { id },
        });

        // Revalidate lại trang drivers
        revalidatePath('/dashboard/drivers');

        return {
            success: true,
            message: `Xóa tài xế ${driver.name} thành công`,
        };
    } catch (error) {
        console.error('Delete driver error:', error);
        return {
            success: false,
            message: 'Có lỗi xảy ra khi xóa tài xế',
        };
    }
}

export async function deleteDrivers(ids: string[]) {
    try {
        await db.driver.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        revalidatePath('/dashboard/drivers');

        return {
            success: true,
            message: `Đã xóa ${ids.length} tài xế`,
        };
    } catch (error) {
        console.error('Delete drivers error:', error);
        return {
            success: false,
            message: 'Có lỗi xảy ra khi xóa tài xế',
        };
    }
}
