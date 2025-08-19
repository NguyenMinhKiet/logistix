import clsx from 'clsx';
import { Package, Truck, Warehouse } from 'lucide-react';
import Link from 'next/link';

export default function Header({
    toggleMenu = false,
    menuButtonShow = false,
}: {
    toggleMenu: boolean;
    menuButtonShow: boolean;
}) {
    return (
        <Link className="relative w-full rounded" href="/">
            {/* <div className="w-32 text-white md:w-40">Logistix Solutions</div> */}
            <div
                className={clsx(
                    `bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white relative rounded transition-all duration-500 ease-in-out`,

                    { 'md:rounded-tr-none': menuButtonShow },
                    { 'h-14 flex justify-center items-center': !toggleMenu },
                )}
            >
                {/* <div className="absolute inset-0 bg-black/10"></div> */}
                <div className="relative z-10">
                    {/* Logo */}
                    <div className="flex justify-center ">
                        <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                            <Package className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Title */}
                    {toggleMenu && (
                        <>
                            <h1 className="text-xl font-bold mb-1 sm:mb-2">Logistix Solutions</h1>
                            <p className=" text-blue-100 text-sm">Hệ thống quản lý logistics thông minh</p>
                        </>
                    )}
                </div>
                {toggleMenu && (
                    <>
                        {/* Decorative elements */}
                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-20">
                            <Truck className="w-10 h-10 sm:w-16 sm:h-16 md:w-10 md:h-10" />
                        </div>
                        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 opacity-20">
                            <Warehouse className="w-8 h-8 sm:w-12 sm:h-12 md:w-8 md:h-8" />
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
}
