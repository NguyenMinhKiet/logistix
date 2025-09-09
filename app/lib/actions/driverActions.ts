'use server';
import { db } from '@/app/lib/db';
import { DriverFormSchema } from '../formSchema';
import { zodErrorsToTree } from '../zodErrorsToTree';
import { DriverBadge } from '@prisma/client';
import { Driver } from '@/app/types';

export type FormState =
    | {
          data?: Driver;
          success?: boolean;
          errors?: {
              name?: string[];
              phone?: string[];
              imageUrl?: string[];
              license?: string[];
          };
          message?: string;
      }
    | undefined;

// CRUD
export async function Create(name: string, phone: string, imageUrl?: string, license?: string, vehicleId?: string) {
    // Kiểm tra số điện thoại trùng
    const isExisting = await db.driver.findUnique({ where: { phone } });
    if (isExisting) {
        throw {
            field: 'phone',
            message: `Số điện thoại '${phone}' đã tồn tại !`,
            status: 409,
        };
    }

    // Tạo driver mới
    return await db.driver.create({
        data: {
            name,
            phone,
            imageUrl,
            license,
            vehicle: vehicleId ? { connect: { id: vehicleId } } : undefined,
            shipments: { create: [] },
        },
        include: { vehicle: true, shipments: true },
    });
}

export async function Update(
    id: string,
    name: string,
    phone: string,
    badge?: DriverBadge,
    imageUrl?: string,
    license?: string,
    vehicleId?: string,
    shipmentIds?: string[], // 👈 sửa thành mảng id shipments
) {
    // Kiểm tra số điện thoại (không tính driver hiện tại)
    const isExisting = await db.driver.findFirst({
        where: {
            phone,
            NOT: { id },
        },
    });
    if (isExisting) {
        throw {
            field: 'phone',
            message: `Số điện thoại '${phone}' đã tồn tại !`,
            status: 409,
        };
    }

    return await db.driver.update({
        where: { id },
        data: {
            name,
            phone,
            badge,
            imageUrl,
            license,
            vehicle: vehicleId ? { connect: { id: vehicleId } } : { disconnect: true },
            shipments: shipmentIds ? { set: shipmentIds.map((sid) => ({ id: sid })) } : undefined,
        },
        include: { vehicle: true, shipments: true },
    });
}

export async function Delete(id: string) {
    // Kiểm tra driver tồn tại
    const driver = await db.driver.findUnique({
        where: { id },
        include: { vehicle: true, shipments: true },
    });

    if (!driver) {
        throw {
            field: 'id',
            message: `Driver với id '${id}' không tồn tại !`,
            status: 404,
        };
    }

    // Cập nhật trước: ngắt quan hệ vehicle + shipments
    await db.driver.update({
        where: { id },
        data: {
            vehicle: { disconnect: true },
            shipments: { set: [] },
        },
    });

    // Xóa driver
    return await db.driver.delete({
        where: { id },
    });
}

// CAll Server Action
export async function createDriver(state: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const imageUrl = formData.get('imageUrl') as File;
    const previewImage = formData.get('previewImage') as string;
    const license = formData.get('license') as string;
    const vehicleId = formData.get('vehicleId') as string;
    console.log('image: ');
    console.log('preImage: ', previewImage);
    const validatedFields = DriverFormSchema.safeParse({
        name,
        phone,
        license,
    });

    if (!validatedFields.success) {
        return {
            errors: zodErrorsToTree(validatedFields.error),
        };
    }

    try {
        const driver = await Create(
            name,
            phone,
            !imageUrl || imageUrl.size === 0 || imageUrl.name === 'undefined'
                ? previewImage
                : imageUrl.name || undefined,
            license || undefined,
            vehicleId || undefined,
        );
        return { success: true, message: 'Thêm tài xế thành công', data: driver };
    } catch (err) {
        return { success: false, message: (err as Error).message ?? 'Thêm tài xế thất bại' };
    }
}

export async function getDrivers() {
    const drivers = await db.driver.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            vehicle: true,
            shipments: {
                include: { order: true },
            },
        },
    });
    return drivers;
}
