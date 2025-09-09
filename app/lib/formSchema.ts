import { InstanceStatus, OrderStatus, PaymentMethod, ShipmentStatus, TransactionType } from '@prisma/client';
import { z } from 'zod';

// User Form Schema
export const UserFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a name.' }),
    email: z.email({ message: 'Please enter a valid email.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

// Warehouse Form Schema
export const WarehouseFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a warehouse name.' }),
    location: z.string().min(1, { message: 'Please enter a location.' }),
    capacity: z.coerce.number().int().min(0, { message: 'Capacity must be a non-negative integer.' }).optional(),
});

// Store Form Schema
export const StoreFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a store name.' }),
    location: z.string().min(1, { message: 'Please enter a location.' }),
});

// Product Form Schema
export const ProductFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a product name.' }),
    sku: z.string().min(1, { message: 'Please enter a unique SKU.' }),
    category: z.string().optional(),
    priceIn: z.coerce.number().gt(0, { message: 'Price In must be greater than 0.' }),
    priceOut: z.coerce.number().gt(0, { message: 'Price Out must be greater than 0.' }),
    unit: z.string().min(1, { message: 'Please enter a unit.' }),
    imageUrl: z.url({ message: 'Please enter a valid URL.' }).optional(),
    supplierId: z.string().min(1, { message: 'Please select a supplier.' }).optional(),
});

// Inventory Form Schema
export const InventoryFormSchema = z
    .object({
        id: z.string().optional(),
        productId: z.string().min(1, { message: 'Please select a product.' }),
        warehouseId: z.string().min(1, { message: 'Please select a warehouse.' }).optional(),
        storeId: z.string().min(1, { message: 'Please select a store.' }).optional(),
        quantity: z.coerce.number().int().min(0, { message: 'Quantity must be a non-negative integer.' }),
        minStock: z.coerce.number().int().min(0, { message: 'Minimum stock must be a non-negative integer.' }),
    })
    .refine((data) => !!(data.warehouseId || data.storeId), {
        message: 'Either warehouseId or storeId must be provided.',
        path: ['warehouseId', 'storeId'],
    });

// Transaction Form Schema
export const TransactionFormSchema = z
    .object({
        id: z.string().optional(),
        type: z.enum(Object.values(TransactionType) as [string, ...string[]], {
            message: 'Please select a transaction type.',
        }),
        productId: z.string().min(1, { message: 'Please select a product.' }),
        quantity: z.coerce.number().int().gt(0, { message: 'Quantity must be greater than 0.' }),
        warehouseId: z.string().min(1, { message: 'Please select a warehouse.' }).optional(),
        storeId: z.string().min(1, { message: 'Please select a store.' }).optional(),
        userId: z.string().min(1, { message: 'Please select a user.' }),
        approved: z.boolean(),
    })
    .refine((data) => !!(data.warehouseId || data.storeId), {
        message: 'Either warehouseId or storeId must be provided.',
        path: ['warehouseId', 'storeId'],
    });

// ProductInstance Form Schema
export const ProductInstanceFormSchema = z
    .object({
        id: z.string().optional(),
        productId: z.string().min(1, { message: 'Please select a product.' }),
        imei: z.string().min(1, { message: 'Please enter an IMEI.' }).optional(),
        serial: z.string().min(1, { message: 'Please enter a serial number.' }).optional(),
        status: z.enum(Object.values(InstanceStatus) as [string, ...string[]], {
            message: 'Please select a valid status.',
        }),
        warehouseId: z.string().min(1, { message: 'Please select a warehouse.' }).optional(),
        storeId: z.string().min(1, { message: 'Please select a store.' }).optional(),
    })
    .refine((data) => !!(data.imei || data.serial), {
        message: 'Either IMEI or serial number must be provided.',
        path: ['imei', 'serial'],
    })
    .refine((data) => !!(data.warehouseId || data.storeId), {
        message: 'Either warehouseId or storeId must be provided.',
        path: ['warehouseId', 'storeId'],
    });

// Customer Form Schema
export const CustomerFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a customer name.' }),
    phone: z.string().min(1, { message: 'Please enter a phone number.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
    address: z.string().min(1, { message: 'Please enter an address.' }).optional(),
});

// Order Form Schema
export const OrderFormSchema = z.object({
    id: z.string().optional(),
    customerId: z.string().min(1, { message: 'Please select a customer.' }),
    userId: z.string().min(1, { message: 'Please select a user.' }),
    status: z.enum(Object.values(OrderStatus) as [string, ...string[]], {
        message: 'Please select a valid order status.',
    }),
    total: z.coerce.number().gt(0, { message: 'Total must be greater than 0.' }),
});

// OrderItem Form Schema
export const OrderItemFormSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().min(1, { message: 'Please select an order.' }),
    productId: z.string().min(1, { message: 'Please select a product.' }),
    quantity: z.coerce.number().int().gt(0, { message: 'Quantity must be greater than 0.' }),
    price: z.coerce.number().gt(0, { message: 'Price must be greater than 0.' }),
});

// Payment Form Schema
export const PaymentFormSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().min(1, { message: 'Please select an order.' }).optional(),
    amount: z.coerce.number().gt(0, { message: 'Amount must be greater than 0.' }),
    method: z.enum(Object.values(PaymentMethod) as [string, ...string[]], {
        message: 'Please select a payment method.',
    }),
});

// Shipment Form Schema
export const ShipmentFormSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().min(1, { message: 'Please select an order.' }),
    driverId: z.string().min(1, { message: 'Please select a driver.' }).optional(),
    vehicleId: z.string().min(1, { message: 'Please select a vehicle.' }).optional(),
    routeId: z.string().min(1, { message: 'Please select a route.' }).optional(),
    status: z.enum(Object.values(ShipmentStatus) as [string, ...string[]], {
        message: 'Please select a valid shipment status.',
    }),
    tracking: z.string().min(1, { message: 'Please enter a tracking code.' }).optional(),
});

// Supplier Form Schema
export const SupplierFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a supplier name.' }),
    phone: z.string().min(1, { message: 'Please enter a phone number.' }).optional(),
    email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
    address: z.string().min(1, { message: 'Please enter an address.' }).optional(),
});

// Vehicle Form Schema
export const VehicleFormSchema = z.object({
    id: z.string().optional(),
    plate: z.string().min(1, { message: 'Please enter a license plate.' }),
    type: z.string().min(1, { message: 'Please enter a vehicle type.' }),
    capacity: z.coerce.number().int().min(0, { message: 'Capacity must be a non-negative integer.' }).optional(),
});

// Driver Form Schema
export const DriverFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a driver name.' }),
    phone: z.string().min(1, { message: 'Please enter a phone number.' }),
    license: z.string().min(1, { message: 'Please enter a license number.' }).optional(),
});

// Route Form Schema
export const RouteFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a route name.' }),
    origin: z.string().min(1, { message: 'Please enter an origin.' }),
    destination: z.string().min(1, { message: 'Please enter a destination.' }),
});
