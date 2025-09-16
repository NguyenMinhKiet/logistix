'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/app/lib/db';

import { EShipmentStatus } from '@/app/types';

// Shipment Form Schema
export const ShipmentFormSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().min(1, { message: 'Please select an order.' }),
    driverId: z.string().min(1, { message: 'Please select a driver.' }).optional(),
    vehicleId: z.string().min(1, { message: 'Please select a vehicle.' }).optional(),
    routeId: z.string().min(1, { message: 'Please select a route.' }).optional(),
    status: z.enum(Object.values(EShipmentStatus) as [string, ...string[]], {
        message: 'Please select a valid shipment status.',
    }),
    tracking: z.string().min(1, { message: 'Please enter a tracking code.' }).optional(),
});

export type State = {
    errors?: {
        orderId?: string[];
        driverId?: string[];
        vehicleId?: string[];
        routeId?: string[];
        status?: string[];
    };
    message?: string | null;
};

const CreateShipment = ShipmentFormSchema.omit({ id: true });

export async function createShipment(prevState: State, formData: FormData) {
    // Validate from using Zod
    const validatedFields = CreateShipment.safeParse(Object.entries(formData));

    if (!validatedFields.success) {
        return {
            errors: z.treeifyError(validatedFields.error),
            message: 'Missing Fields. Failed to Create Shipment.',
        };
    }

    const { orderId, driverId, vehicleId, routeId, status, tracking } = validatedFields.data;

    try {
        await db.shipment.create({
            data: {
                orderId,
                driverId,
                vehicleId,
                routeId,
                status: status as EShipmentStatus,
                tracking,
            },
        });
    } catch (error) {
        console.log(error);
        return {
            message: 'Database Error: Failed to Create Shipment.',
        };
    }

    revalidatePath('/shipments');
    redirect('/shipments');
}
