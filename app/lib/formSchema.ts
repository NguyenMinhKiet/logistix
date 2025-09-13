import { InstanceStatus, OrderStatus, PaymentMethod, ShipmentStatus, TransactionType } from '@prisma/client';
import { z } from 'zod';

// User Form Schema
export const UserFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Vui lòng nhập tên người dùng.' }),
    email: z.email({ message: 'Vui lòng nhập email hợp lệ.' }),
    password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' }),
});

// Warehouse Form Schema
export const WarehouseFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Vui lòng nhập tên kho.' }),
    location: z.string().min(1, { message: 'Vui lòng nhập địa điểm.' }),
    capacity: z.coerce.number().int().min(0, { message: 'Sức chứa phải là số nguyên không âm.' }).optional(),
});

// Store Form Schema
export const StoreFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Vui lòng nhập tên cửa hàng.' }),
    location: z.string().min(1, { message: 'Vui lòng nhập địa điểm.' }),
});

// Product Form Schema
export const ProductFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Vui lòng nhập tên sản phẩm.' }),
    sku: z.string().min(1, { message: 'Vui lòng nhập mã SKU.' }),
    category: z.string().optional(),
    priceIn: z.coerce.number().gt(0, { message: 'Giá nhập phải lớn hơn 0.' }),
    priceOut: z.coerce.number().gt(0, { message: 'Giá bán phải lớn hơn 0.' }),
    unit: z.string().min(1, { message: 'Vui lòng nhập đơn vị tính.' }),
    imageUrl: z.url({ message: 'Vui lòng nhập URL hợp lệ.' }).optional(),
    supplierId: z.string().min(1, { message: 'Vui lòng chọn nhà cung cấp.' }).optional(),
});

// Inventory Form Schema
export const InventoryFormSchema = z
    .object({
        id: z.string().optional(),
        productId: z.string().min(1, { message: 'Vui lòng chọn sản phẩm.' }),
        warehouseId: z.string().min(1, { message: 'Vui lòng chọn kho.' }).optional(),
        storeId: z.string().min(1, { message: 'Vui lòng chọn cửa hàng.' }).optional(),
        quantity: z.coerce.number().int().min(0, { message: 'Số lượng phải là số nguyên không âm.' }),
        minStock: z.coerce.number().int().min(0, { message: 'Tồn kho tối thiểu phải là số nguyên không âm.' }),
    })
    .refine((data) => !!(data.warehouseId || data.storeId), {
        message: 'Phải chọn kho hoặc cửa hàng.',
        path: ['warehouseId', 'storeId'],
    });

// Transaction Form Schema
export const TransactionFormSchema = z
    .object({
        id: z.string().optional(),
        type: z.enum(Object.values(TransactionType) as [string, ...string[]], {
            message: 'Vui lòng chọn loại giao dịch.',
        }),
        productId: z.string().min(1, { message: 'Vui lòng chọn sản phẩm.' }),
        quantity: z.coerce.number().int().gt(0, { message: 'Số lượng phải lớn hơn 0.' }),
        warehouseId: z.string().min(1, { message: 'Vui lòng chọn kho.' }).optional(),
        storeId: z.string().min(1, { message: 'Vui lòng chọn cửa hàng.' }).optional(),
        userId: z.string().min(1, { message: 'Vui lòng chọn người dùng.' }),
        approved: z.boolean(),
    })
    .refine((data) => !!(data.warehouseId || data.storeId), {
        message: 'Phải chọn kho hoặc cửa hàng.',
        path: ['warehouseId', 'storeId'],
    });

// ProductInstance Form Schema
export const ProductInstanceFormSchema = z
    .object({
        id: z.string().optional(),
        productId: z.string().min(1, { message: 'Vui lòng chọn sản phẩm.' }),
        imei: z.string().min(1, { message: 'Vui lòng nhập số IMEI.' }).optional(),
        serial: z.string().min(1, { message: 'Vui lòng nhập số serial.' }).optional(),
        status: z.enum(Object.values(InstanceStatus) as [string, ...string[]], {
            message: 'Vui lòng chọn trạng thái hợp lệ.',
        }),
        warehouseId: z.string().min(1, { message: 'Vui lòng chọn kho.' }).optional(),
        storeId: z.string().min(1, { message: 'Vui lòng chọn cửa hàng.' }).optional(),
    })
    .refine((data) => !!(data.imei || data.serial), {
        message: 'Phải nhập số IMEI hoặc số serial.',
        path: ['imei', 'serial'],
    })
    .refine((data) => !!(data.warehouseId || data.storeId), {
        message: 'Phải chọn kho hoặc cửa hàng.',
        path: ['warehouseId', 'storeId'],
    });

// Customer Form Schema
export const CustomerFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Vui lòng nhập tên khách hàng.' }),
    phone: z.string().min(1, { message: 'Vui lòng nhập số điện thoại.' }),
    email: z.string().email({ message: 'Vui lòng nhập email hợp lệ.' }).optional(),
    address: z.string().min(1, { message: 'Vui lòng nhập địa chỉ.' }).optional(),
});

// Order Form Schema
export const OrderFormSchema = z.object({
    id: z.string().optional(),
    customerId: z.string().min(1, { message: 'Vui lòng chọn khách hàng.' }),
    userId: z.string().min(1, { message: 'Vui lòng chọn người dùng.' }),
    status: z.enum(Object.values(OrderStatus) as [string, ...string[]], {
        message: 'Vui lòng chọn trạng thái đơn hàng hợp lệ.',
    }),
    total: z.coerce.number().gt(0, { message: 'Tổng tiền phải lớn hơn 0.' }),
});

// OrderItem Form Schema
export const OrderItemFormSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().min(1, { message: 'Vui lòng chọn đơn hàng.' }),
    productId: z.string().min(1, { message: 'Vui lòng chọn sản phẩm.' }),
    quantity: z.coerce.number().int().gt(0, { message: 'Số lượng phải lớn hơn 0.' }),
    price: z.coerce.number().gt(0, { message: 'Giá phải lớn hơn 0.' }),
});

// Payment Form Schema
export const PaymentFormSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().min(1, { message: 'Vui lòng chọn đơn hàng.' }).optional(),
    amount: z.coerce.number().gt(0, { message: 'Số tiền phải lớn hơn 0.' }),
    method: z.enum(Object.values(PaymentMethod) as [string, ...string[]], {
        message: 'Vui lòng chọn phương thức thanh toán.',
    }),
});

// Shipment Form Schema
export const ShipmentFormSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().min(1, { message: 'Vui lòng chọn đơn hàng.' }),
    driverId: z.string().min(1, { message: 'Vui lòng chọn tài xế.' }).optional(),
    vehicleId: z.string().min(1, { message: 'Vui lòng chọn phương tiện.' }).optional(),
    routeId: z.string().min(1, { message: 'Vui lòng chọn tuyến đường.' }).optional(),
    status: z.enum(Object.values(ShipmentStatus) as [string, ...string[]], {
        message: 'Vui lòng chọn trạng thái giao hàng hợp lệ.',
    }),
    tracking: z.string().min(1, { message: 'Vui lòng nhập mã theo dõi.' }).optional(),
});

// Supplier Form Schema
export const SupplierFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Vui lòng nhập tên nhà cung cấp.' }),
    phone: z.string().min(1, { message: 'Vui lòng nhập số điện thoại.' }).optional(),
    email: z.string().email({ message: 'Vui lòng nhập email hợp lệ.' }).optional(),
    address: z.string().min(1, { message: 'Vui lòng nhập địa chỉ.' }).optional(),
});

// Vehicle Form Schema
export const VehicleFormSchema = z.object({
    id: z.string().optional(),
    plate: z.string().min(1, { message: 'Vui lòng nhập biển số xe.' }),
    type: z.string().min(1, { message: 'Vui lòng nhập loại xe.' }),
    capacity: z.coerce.number().int().min(0, { message: 'Sức chứa phải là số nguyên không âm.' }).optional(),
});

// Driver Form Schema
export const DriverFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, { message: 'Vui lòng nhập tên tài xế.' }),
    phone: z
        .string()
        .min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' })
        .max(11, { message: 'Số điện thoại không được quá 11 ký tự.' })
        .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa số.' }),
    license: z.string().min(2, { message: 'Vui lòng nhập số giấy phép lái xe.' }).optional(),
});

// Route Form Schema
export const RouteFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Vui lòng nhập tên tuyến đường.' }),
    origin: z.string().min(1, { message: 'Vui lòng nhập điểm xuất phát.' }),
    destination: z.string().min(1, { message: 'Vui lòng nhập điểm đến.' }),
});

export const SigninFormSchema = z.object({
    email: z.email({ message: 'Vui lòng nhập Email' }).trim(),
    password: z.string().min(6, { message: 'Vui lòng nhập Mật khẩu' }).trim(),
});

export const SignupFormSchema = z
    .object({
        name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }).trim(),
        email: z.email({ message: 'Vui lòng nhập Email hợp lệ' }).trim(),
        password: z
            .string()
            .min(6, { message: 'Phải có ít nhất 6 ký tự.' })
            .regex(/[a-zA-Z]/, { message: 'Có ít nhất 1 chữ cái.' })
            .regex(/[0-9]/, { message: 'Có ít nhất 1 số.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Có ít nhất 1 ký tự đặc biệt.',
            })
            .trim(),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu nhập lại không trùng',
        path: ['confirmPassword'],
    });
