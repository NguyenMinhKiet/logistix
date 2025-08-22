// Enums
export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    STAFF = 'STAFF',
    USER = 'USER',
}

export enum TransactionType {
    IMPORT = 'IMPORT',
    EXPORT = 'EXPORT',
    TRANSFER = 'TRANSFER',
}

export enum InstanceStatus {
    IN_STOCK = 'IN_STOCK',
    TRANSFERRED = 'TRANSFERRED',
    SOLD = 'SOLD',
    RETURNED = 'RETURNED',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export enum PaymentMethod {
    CASH = 'CASH',
    BANK_TRANSFER = 'BANK_TRANSFER',
    CREDIT_CARD = 'CREDIT_CARD',
}

export enum ShipmentStatus {
    PENDING = 'PENDING',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
}

// Interfaces
export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: Role;
    warehouses?: Warehouse[];
    stores?: Store[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Warehouse {
    id: string;
    name: string;
    location: string;
    capacity?: number;
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
    category?: string;
    priceIn: number;
    priceOut: number;
    unit: string;
    imageUrl?: string;
    inventories: Inventory[];
    transactions: Transaction[];
    supplier?: Supplier;
    supplierId?: string;
    instances: ProductInstance[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Inventory {
    id: string;
    product: Product;
    productId: string;
    warehouse?: Warehouse;
    warehouseId?: string;
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
    warehouse?: Warehouse;
    warehouseId?: string;
    store?: Store;
    storeId?: string;
    createdBy: User;
    userId: string;
    approved: boolean;
    createdAt: Date;
}

export interface ProductInstance {
    id: string;
    product: Product;
    productId: string;
    imei?: string;
    serial?: string;
    status: InstanceStatus;
    warehouse?: Warehouse;
    warehouseId?: string;
    store?: Store;
    storeId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string;
    address?: string;
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
    order?: Order;
    orderId?: string;
    amount: number;
    method: PaymentMethod;
    createdAt: Date;
    updatedAt: Date;
}

export interface Shipment {
    id: string;
    order: Order;
    orderId: string;
    driver?: Driver;
    driverId?: string;
    vehicle?: Vehicle;
    vehicleId?: string;
    route?: Route;
    routeId?: string;
    status: ShipmentStatus;
    tracking?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Supplier {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Vehicle {
    id: string;
    plate: string;
    type: string;
    capacity?: number;
    drivers: Driver[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Driver {
    id: string;
    name: string;
    phone: string;
    license?: string;
    vehicle?: Vehicle;
    vehicleId?: string;
    shipments: Shipment[];
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
