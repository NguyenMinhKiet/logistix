'use client';
import Header from '@/app/components/layout/header/Header';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Package, Truck, Warehouse } from 'lucide-react';

interface LoginFormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Simulate login API call
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    console.log('Login data:', formData);
                    console.log('Login successful!');
                    resolve();
                }, 1500);
            });

            // Handle successful login (redirect, etc.)
            alert('Đăng nhập thành công! (Demo)');
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ email: 'Đăng nhập thất bại. Vui lòng thử lại.' });
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-2 sm:p-4 lg:p-8">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3C svg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%239C92AC fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

                <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                    {/* Login Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Header Section */}
                        <Header />

                        {/* Form Section */}
                        <div className="p-4 sm:p-6 lg:p-8">
                            <div className="text-center mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
                                    Đăng nhập
                                </h2>
                                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                                    Nhập thông tin để truy cập hệ thống
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                                            errors.email
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="admin@logistic.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>
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
                                                errors.password
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                            ) : (
                                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-xs sm:text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium text-left sm:text-right"
                                    >
                                        Quên mật khẩu?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 lg:py-4 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                                            <span className="text-xs sm:text-sm lg:text-base">Đang đăng nhập...</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm sm:text-base lg:text-lg">Đăng nhập</span>
                                    )}
                                </button>
                            </form>

                            {/* Demo Credentials */}
                            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border">
                                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
                                    🔧 Demo Credentials:
                                </p>
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
                                    <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
                                        Đăng ký ngay
                                    </button>
                                </p>
                            </div>
                        </div>
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
};

export default LoginPage;
