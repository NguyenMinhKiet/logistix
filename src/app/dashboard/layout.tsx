'use client';

import SideNav from '@/app/components/ui/dashboard/sidenav';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [toggleMenu, setToggleMenu] = useState(true);
    useEffect(() => {
        console.log('toggle: ', toggleMenu);
    }, [toggleMenu]);
    return (
        <div className="flex h-screen flex-col md:flex-row transition-all duration-500 ease-in-out relative overflow-auto">
            <div className={clsx(` flex-none md:h-full `, toggleMenu ? 'md:w-64' : 'md:w-18')}>
                <SideNav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {children}
            </div>
        </div>
    );
}
