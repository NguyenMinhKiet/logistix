import {
    $Enums,
    InstanceStatus,
    OrderStatus,
    PaymentMethod,
    Role,
    ShipmentStatus,
    TransactionType,
} from '@prisma/client';

// Interfaces
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    warehouses?: Warehouse[] | null;
    stores?: Store[] | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Warehouse {
    id: string;
    name: string;
    location: string;
    capacity?: number | null;
    inventories: Inventory[];
    transactions: Transaction[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Store {
    id: string;
    name: string;
    location: string;
    inventories: Inventory[];
    transactions: Transaction[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    sku: string;
    category?: string | null;
    priceIn: number;
    priceOut: number;
    unit: string;
    imageUrl?: string | null;
    inventories: Inventory[];
    transactions: Transaction[];
    supplier?: Supplier | null;
    supplierId?: string | null;
    instances: ProductInstance[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Inventory {
    id: string;
    product: Product;
    productId: string;
    warehouse?: Warehouse | null;
    warehouseId?: string | null;
    store?: Store;
    storeId?: string;
    quantity: number;
    minStock: number;
    updatedAt: Date;
}

export interface Transaction {
    id: string;
    type: TransactionType;
    product: Product;
    productId: string;
    quantity: number;
    warehouse?: Warehouse | null;
    warehouseId?: string | null;
    store?: Store | null;
    storeId?: string | null;
    createdBy: User;
    userId: string;
    approved: boolean;
    createdAt: Date;
}

export interface ProductInstance {
    id: string;
    product: Product;
    productId: string;
    imei?: string | null;
    serial?: string | null;
    status: InstanceStatus;
    warehouse?: Warehouse | null;
    warehouseId?: string | null;
    store?: Store | null;
    storeId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    address?: string | null;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    id: string;
    customer: Customer;
    customerId: string;
    user: User;
    userId: string;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    payments: Payment[];
    shipments: Shipment[];
    createdAt: Date;
}

export interface OrderItem {
    id: string;
    order: Order;
    orderId: string;
    product: Product;
    productId: string;
    quantity: number;
    price: number;
}

export interface Payment {
    id: string;
    order?: Order | null;
    orderId?: string | null;
    amount: number;
    method: PaymentMethod;
    createdAt: Date;
    updatedAt: Date;
}

export interface Shipment {
    id: string;
    order: Partial<Order>;
    orderId: string;
    driver?: Driver | null;
    driverId?: string | null;
    vehicle?: Vehicle | null;
    vehicleId?: string | null;
    route?: Route | null;
    routeId?: string | null;
    status: ShipmentStatus;
    tracking?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Supplier {
    id: string;
    name: string;
    phone?: string | null;
    email?: string | null;
    address?: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Vehicle {
    id: string;
    plate: string;
    type: string;
    capacity?: number | null;
    drivers?: Driver[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Driver {
    id: string;
    name: string;
    imageUrl?: string | null;
    phone: string;
    badge: $Enums.DriverBadge;
    license?: string | null;
    vehicle?: Vehicle | null;
    vehicleId?: string | null;
    shipments?: Partial<Shipment>[] | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Route {
    id: string;
    name: string;
    origin: string;
    destination: string;
    shipments: Shipment[];
    createdAt: Date;
    updatedAt: Date;
}

// Session
export type SessionPayload = {
    sessionId?: string;
    userId?: string;
    userName?: string;
    userRole?: string;
    expiresAt?: Date;
};

export type FormState =
    | {
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
