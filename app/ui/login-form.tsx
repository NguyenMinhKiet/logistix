'use client';

import { ChangeEvent, useActionState, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { signIn } from '@/app/lib/authActions';
import clsx from 'clsx';

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(signIn, undefined);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = (): void => setShowPassword((prev) => !prev);

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">Đăng nhập</h2>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Nhập thông tin để truy cập hệ thống</p>
            </div>

            <form action={formAction} className="space-y-4 sm:space-y-6">
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                            state?.errors?.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="admin@logistic.com"
                    />
                    {state?.errors?.email && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{state?.errors?.email}</p>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                        Mật khẩu
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                                state?.errors?.password
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                    </div>
                    {state?.errors?.password && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{state?.errors?.password}</p>
                    )}
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    aria-disabled={isPending}
                    className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 lg:py-4 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                >
                    <span className="text-sm sm:text-base lg:text-lg">
                        {isPending ? 'Đang xử lý ...' : 'Đăng nhập'}
                    </span>
                </button>
                {state?.message && (
                    <p className={clsx(!state?.success ? 'text-red-500 ' : 'text-green-600')}>{state?.message}</p>
                )}
            </form>

            {/* Demo Credentials */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border">
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">🔧 Demo Credentials:</p>
                <div className="space-y-1 text-xs sm:text-sm">
                    <p>
                        <span className="font-medium">Email:</span> admin@logistic.com
                    </p>
                    <p>
                        <span className="font-medium">Password:</span> admin123
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                    Chưa có tài khoản?{' '}
                    <Link href="/register" className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
