import { Suspense } from 'react';
import { Package, Truck, Warehouse } from 'lucide-react';
import RegisterForm from '@/app/ui/register-form';
import Link from 'next/link';
import Logo from '@/app/ui/logo';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Register',
};

export default function RegisterPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-2 sm:p-4 lg:p-8">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3C svg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%239C92AC fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

                <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                    {/* Register Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Header Section */}
                        <Link className="relative w-full rounded" href="/">
                            <Logo />
                        </Link>
                        {/* Form Section */}
                        <Suspense>
                            <RegisterForm />
                        </Suspense>
                    </div>

                    {/* Features Preview */}
                    <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="bg-white/60 backdrop-blur-sm p-2 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl text-center border border-white/20 hover:bg-white/70 transition-all duration-200">
                            <Package className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-tight">
                                Quản lý sản phẩm
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-2 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl text-center border border-white/20 hover:bg-white/70 transition-all duration-200">
                            <Warehouse className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-indigo-600 mx-auto mb-1 sm:mb-2" />
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-tight">
                                Theo dõi kho hàng
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-2 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl text-center border border-white/20 hover:bg-white/70 transition-all duration-200">
                            <Truck className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600 mx-auto mb-1 sm:mb-2" />
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-tight">
                                Vận chuyển logistics
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
