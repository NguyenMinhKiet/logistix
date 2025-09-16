'use client';

import NavLinks from '@/app/ui/dashboard/nav-link';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import Logo from '@/app/ui/logo';
import { useEffect, useState } from 'react';
import { logout } from '@/app/lib/serverActions/authActions';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/hooks/useNotification';
import { useSession } from '@/app/hooks/useSession';
import { SideNavButton } from './navbar/SideNavButton';

export default function SideNav() {
    const router = useRouter();
    const addNotification = useNotification((s) => s.addNotification);
    const { session, isLoading } = useSession();
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLogoutLoading(true);
            const res = await logout();

            if (!res) return;

            if (res.success) {
                addNotification(res.message, 'success');
                router.push('/login');
            } else {
                addNotification(res.message, 'error');
            }
        } catch (error) {
            addNotification('Đăng xuất thất bại', 'error');
        } finally {
            setIsLogoutLoading(false);
        }
    };

    return (
        <div
            className={clsx(
                'flex md:h-full flex-col w-full bg-white shadow-md relative',
                'transition-all duration-500 ease-in-out',
            )}
        >
            {/* Header */}
            <div className="p-4">
                <Link className="relative w-full rounded" href="/">
                    <Logo />
                </Link>
            </div>

            {/* NavLinks with scroll */}
            <div className="md:flex-1 overflow-y-auto mt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <NavLinks />
            </div>

            {/* Footer */}
            <div className="p-4 hidden md:block space-y-2">
                <SideNavButton icon={UserIcon}>{isLoading ? 'Loading...' : session?.name}</SideNavButton>

                <SideNavButton icon={PowerIcon} onClick={handleLogout} loading={isLogoutLoading}>
                    Đăng xuất
                </SideNavButton>
            </div>
        </div>
    );
}
