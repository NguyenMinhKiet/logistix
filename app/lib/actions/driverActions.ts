'use server';
import { db } from '@/app/lib/db';
import { DriverFormSchema } from '../formSchema';
import { zodErrorsToTree } from '../zodErrorsToTree';
import { Driver, DriverBadge } from '@prisma/client';
import { AppError } from '../errors';

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

// ==================== CRUD ====================

export async function Create(name: string, phone: string, imageUrl?: string, license?: string, vehicleId?: string) {
    const isExisting = await db.driver.findUnique({ where: { phone } });
    if (isExisting) {
        throw new AppError(`Số điện thoại '${phone}' đã tồn tại!`, 'phone', 409);
    }

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
    shipmentIds?: string[],
) {
    const isExisting = await db.driver.findFirst({
        where: {
            phone,
            NOT: { id },
        },
    });
    if (isExisting) {
        throw new AppError(`Số điện thoại '${phone}' đã tồn tại!`, 'phone', 409);
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

export async function deleteDriver(id: string) {
    const driver = await db.driver.findUnique({
        where: { id },
        include: { vehicle: true, shipments: true },
    });

    if (!driver) {
        throw new AppError(`Driver với id '${id}' không tồn tại!`, undefined, 404);
    }

    await db.driver.update({
        where: { id },
        data: {
            vehicleId: null,
            shipments: { set: [] },
        },
    });

    await db.driver.delete({ where: { id } });

    return driver;
}

// ==================== Server Actions ====================

export async function createDriver(state: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const imageUrl = formData.get('imageUrl') as File;
    const previewImage = formData.get('previewImage') as string;
    const license = formData.get('license') as string;
    const vehicleId = formData.get('vehicleId') as string;

    const validatedFields = DriverFormSchema.safeParse({ name, phone, license });

    if (!validatedFields.success) {
        return { errors: zodErrorsToTree(validatedFields.error) };
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
    } catch (error) {
        if (error instanceof AppError) {
            return {
                success: false,
                message: error.message,
                errors: error.field ? { [error.field]: [error.message] } : undefined,
            };
        }
        console.error(error);
        return { success: false, message: 'Thêm tài xế thất bại. Vui lòng thử lại sau.' };
    }
}

export async function editDriver(state: FormState, formData: FormData): Promise<FormState> {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const badge = formData.get('badge') as DriverBadge;
    const license = formData.get('license') as string | null;
    const vehicleId = formData.get('vehicleId') as string | null;
    const previewImage = formData.get('previewImage') as string;
    const imageUrl = formData.get('imageUrl') as File | null;

    const validatedFields = DriverFormSchema.safeParse({ name, phone, license });

    if (!validatedFields.success) {
        return { errors: zodErrorsToTree(validatedFields.error) };
    }

    try {
        const oldDriver = await db.driver.findUnique({ where: { id } });
        if (!oldDriver) {
            throw new AppError('Không tìm thấy thông tin tài xế.', undefined, 404);
        }

        const newVehicleId = vehicleId || null;
        if (
            name === oldDriver.name &&
            phone === oldDriver.phone &&
            badge === oldDriver.badge &&
            license === oldDriver.license &&
            (imageUrl === oldDriver.imageUrl || previewImage === oldDriver.imageUrl) &&
            newVehicleId === oldDriver.vehicleId
        ) {
            return { success: false, message: 'Bạn chưa thay đổi thông tin nào.' };
        }

        const driver = await Update(
            id,
            name,
            phone,
            badge,
            !imageUrl || imageUrl.size === 0 ? previewImage ?? undefined : imageUrl.name ?? undefined,
            license || undefined,
            vehicleId || undefined,
        );

        return { success: true, message: `Thông tin tài xế "${driver.name}" đã được cập nhật.`, data: driver };
    } catch (error) {
        if (error instanceof AppError) {
            return {
                success: false,
                message: error.message,
                errors: error.field ? { [error.field]: [error.message] } : undefined,
            };
        }
        console.error(error);
        return { success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' };
    }
}

// ==================== Utility ====================

export async function getDrivers() {
    return await db.driver.findMany({
        orderBy: { createdAt: 'desc' },
        include: { vehicle: true, shipments: { include: { order: true } } },
    });
}

export async function deleteDrivers(ids: string[]): Promise<FormState> {
    try {
        await db.driver.deleteMany({ where: { id: { in: ids } } });
        return { success: true, message: `Đã xoá ${ids.length} tài xế` };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Xoá thất bại. Vui lòng thử lại sau.' };
    }
}
