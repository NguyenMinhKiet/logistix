'use client';

import NavLinks from '@/app/components/ui/dashboard/nav-link';
import Header from '@/app/components/layout/header/Header';
import { ListBulletIcon, PowerIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import clsx from 'clsx';

export default function SideNav({
    toggleMenu,
    setToggleMenu,
}: {
    toggleMenu: boolean;
    setToggleMenu: (toggleMenu: boolean) => void;
}) {
    const [menuButtonShow, setMenuButtonShow] = useState(false);

    return (
        <div
            className={clsx(
                `flex md:h-full flex-col bg-white shadow-md relative transition-all duration-500 ease-in-out`,
                toggleMenu ? 'w-full md:w-64' : 'w-18 md:w-18',
            )}
            onMouseEnter={() => setMenuButtonShow(true)}
            onMouseLeave={() => setMenuButtonShow(false)}
        >
            {/* Toggle button nổi bên phải */}
            <button
                onClick={() => setToggleMenu(!toggleMenu)}
                className={clsx(
                    `cursor-pointer absolute top-4  z-10 p-2 
                    rounded-tr-full rounded-br-full 
                    bg-indigo-700 text-white hover:text-black 
                    transition-all duration-500 ease-in-out`,
                    menuButtonShow ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0',
                    toggleMenu ? '-right-6' : '-right-8',
                )}
            >
                <ListBulletIcon className="w-6 h-6 " />
            </button>

            {/* Header */}
            <div className="p-4">
                <Header toggleMenu={toggleMenu} menuButtonShow={menuButtonShow} />
            </div>

            {/* NavLinks cuộn được */}
            <div className="md:flex-1 overflow-y-auto mt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <NavLinks toggleMenuParent={toggleMenu} />
            </div>

            {/* Footer */}
            <div className="p-4 hidden md:block">
                <form>
                    <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
                        <PowerIcon className="w-6" />
                        {toggleMenu && <span className="hidden md:inline">Sign Out</span>}
                    </button>
                </form>
            </div>
        </div>
    );
}
