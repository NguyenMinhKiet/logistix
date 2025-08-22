'use client';

import NavLinks from '@/app/ui/dashboard/nav-link';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import Logo from '@/app/ui/logo';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { logout } from '@/app/lib/authActions';

export default function SideNav() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetch('/api/auth/session')
            .then((res) => res.json())
            .then((data) => setUsername(data.userName));
    }, []);

    const handleSignOut = async () => {
        setLoading(true);
        toast.loading('Đang đăng xuất...', { id: 'signout', duration: Infinity });
        try {
            await logout();
            toast.success('Đăng xuất thành công!', { id: 'signout', duration: 2000 });
        } catch (error: any) {
            toast.error(`Đăng xuất thất bại: ${error.message}`, { id: 'signout', duration: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={clsx(
                `flex md:h-full flex-col w-full bg-white shadow-md relative transition-all duration-500 ease-in-out`,
            )}
        >
            {/* Header */}
            <div className="p-4">
                <Link className="relative w-full rounded" href="/">
                    <Logo />
                </Link>
            </div>

            {/* NavLinks cuộn được */}
            <div className="md:flex-1 overflow-y-auto mt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <NavLinks />
            </div>

            {/* Footer */}
            <div className="p-4 hidden md:block">
                <div className="cursor-pointer flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
                    <UserIcon className="w-6" />
                    <span className="hidden md:inline line-clamp-1">{username ? username : 'Loading . . .'}</span>
                </div>
                <button
                    onClick={handleSignOut}
                    className="cursor-pointer flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
                >
                    <PowerIcon className="w-6" />
                    <span className="hidden md:inline">{loading ? 'Đăng xuất ...' : 'Đăng xuất'}</span>
                </button>
            </div>
        </div>
    );
}
