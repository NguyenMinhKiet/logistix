'use client';

import {
    TruckIcon,
    InboxIcon,
    UserGroupIcon,
    MapIcon,
    BuildingStorefrontIcon,
    CubeIcon,
    ArrowDownTrayIcon,
    UserIcon,
    DocumentIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    HomeIcon,
    Cog6ToothIcon,
    ListBulletIcon,
    PowerIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

// Shipments
const shipmentLinks = [
    { name: 'Đơn hàng', href: 'shipments/orders', icon: InboxIcon },
    { name: 'Xe', href: 'shipments/cars', icon: TruckIcon },
    { name: 'Tài xế', href: 'shipments/drivers', icon: UserGroupIcon },
    { name: 'Tuyến đường', href: 'shipments/routes', icon: MapIcon },
];

// Inventory
const inventoryLinks = [
    { name: 'Kho', href: '/warehouse', icon: BuildingStorefrontIcon },
    { name: 'Sản phẩm', href: '/items', icon: CubeIcon },
    { name: 'Nhập xuất', href: '/in-out', icon: ArrowDownTrayIcon },
];

// Customers / Partner
const customerLinks = [
    { name: 'Khách hàng', href: '/clients', icon: UserIcon },
    { name: 'Nhà cung cấp', href: '/vendors', icon: CubeIcon },
];

// Finance
const financeLinks = [
    { name: 'Hóa đơn', href: '/invoices', icon: DocumentIcon },
    { name: 'Báo cáo', href: '/reports', icon: ChartBarIcon },
];

// Settings
const settingsLinks = [
    { name: 'Người dùng', href: '/users', icon: UserIcon },
    { name: 'Cài đặt', href: '/settings', icon: Cog6ToothIcon },
];

// navlinks
const links = [
    { name: 'Trang chính', href: '/dashboard', icon: HomeIcon },
    { name: 'Quản lý vận tải', href: '/dashboard/shipments', icon: TruckIcon, subLinks: shipmentLinks },
    { name: 'Quản lý kho', href: '/dashboard/inventories', icon: BuildingStorefrontIcon, subLinks: inventoryLinks },
    {
        name: 'Quản lý khách hàng & đối tác',
        href: '/dashboard/customers',
        icon: UserGroupIcon,
        subLinks: customerLinks,
    },
    { name: 'Hệ thống & cấu hình', href: '/dashboard/settings', icon: Cog6ToothIcon, subLinks: settingsLinks },
    { name: 'Tài chính', href: '/dashboard/finances', icon: CurrencyDollarIcon, subLinks: financeLinks },
];

export default function NavLinks() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = (name: string) => {
        setOpenMenus((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
    };
    return (
        <>
            <>
                {/* Mobile hamburger */}
                <div className="md:hidden flex items-center p-2 bg-white shadow-md">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-md hover:bg-sky-100 hover:text-blue-600"
                    >
                        {mobileMenuOpen ? <ListBulletIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                    <span className="ml-2 font-bold text-lg">Logistix</span>
                </div>

                {/* Mobile menu */}
                <div
                    className={clsx(
                        'md:hidden bg-white shadow-md flex flex-col gap-1 transition-all duration-300 overflow-hidden',
                        mobileMenuOpen ? 'max-h-screen' : 'max-h-0',
                    )}
                >
                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        const isOpen = openMenus.includes(link.name);
                        const isActive = pathname === link.href;

                        return (
                            <div key={link.name}>
                                {/* Menu cha */}
                                <Link
                                    href={link.href}
                                    onClick={() => link.subLinks && toggleMenu(link.name)}
                                    className={clsx(
                                        'flex items-center justify-between p-2 cursor-pointer rounded-md hover:bg-sky-100',
                                        { 'bg-sky-100 text-blue-600': isActive || isOpen },
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <LinkIcon className="w-6 h-6 flex-shrink-0" />
                                        <span>{link.name}</span>
                                    </div>
                                    {link.subLinks && (
                                        <span className={clsx('transition-transform', isOpen && 'rotate-90')}>
                                            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-black"></div>
                                        </span>
                                    )}
                                </Link>

                                {/* Submenu */}
                                {link.subLinks && isOpen && (
                                    <div className="ml-6 flex flex-col gap-1">
                                        {link.subLinks.map((sub) => {
                                            const SubIcon = sub.icon;
                                            const isSubActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className={clsx(
                                                        'flex items-center gap-2 p-2 rounded-md hover:bg-sky-50',
                                                        { 'bg-sky-100 text-blue-600': isSubActive },
                                                    )}
                                                >
                                                    <SubIcon className="w-5 h-5 flex-shrink-0" />
                                                    <span>{sub.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div key="logout">
                        <form method="POST" className="text-5xl">
                            <button
                                type="submit"
                                className={clsx(
                                    'cursor-pointer flex w-full items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                                )}
                            >
                                <PowerIcon className="w-6 h-6 flex-shrink-0" />
                                <span className="text-[16px] font-[400] leading-[24px]">Đăng xuất</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Desktop sidebar */}
                <div className="hidden md:flex flex-col gap-1 p-2 bg-white">
                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        const isOpen = openMenus.includes(link.name);
                        const isActive = pathname === link.href;

                        return (
                            <div key={link.name}>
                                {/* Menu cha */}
                                {link.subLinks ? (
                                    <Link
                                        href={link.href}
                                        onClick={() => toggleMenu(link.name)}
                                        className={clsx(
                                            'flex items-center justify-between gap-2 p-2 rounded-md cursor-pointer hover:bg-sky-100',
                                            { 'bg-sky-100 text-blue-600': isOpen },
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <LinkIcon className="w-6 h-6 flex-shrink-0" />
                                            <span>{link.name}</span>
                                        </div>
                                        <span className={clsx('transition-transform', isOpen && 'rotate-90')}>
                                            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-black"></div>
                                        </span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.href!}
                                        className={clsx('flex items-center gap-2 p-2 rounded-md hover:bg-sky-100', {
                                            'bg-sky-100 text-blue-600': isActive,
                                        })}
                                    >
                                        <LinkIcon className="w-6 h-6 flex-shrink-0" />
                                        <span>{link.name}</span>
                                    </Link>
                                )}

                                {/* Submenu */}
                                {link.subLinks && isOpen && (
                                    <div className="ml-6 mt-1 flex flex-col gap-1">
                                        {link.subLinks.map((sub) => {
                                            const SubIcon = sub.icon;
                                            const isSubActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className={clsx(
                                                        'flex items-center gap-2 p-2 rounded-md hover:bg-sky-50',
                                                        { 'bg-sky-100 text-blue-600': isSubActive },
                                                    )}
                                                >
                                                    <SubIcon className="w-5 h-5 flex-shrink-0" />
                                                    <span className="truncate">{sub.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </>
        </>
    );
}
