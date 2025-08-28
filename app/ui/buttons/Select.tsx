'use client';

import { ArrowDownIcon, ArrowDownTrayIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface SelectProps {
    options: { label: string; value: string }[];
    value?: string;
    Icon?: React.ElementType;
    onChange?: (value: string) => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'mainColor' | 'default';
}

export default function Select({ options, value, Icon, onChange, variant = 'default' }: SelectProps) {
    const baseStyle =
        'relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm transition-colors cursor-pointer w-fit';

    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        mainColor: 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600',
        default: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
    };

    // Lấy label hiển thị từ value
    const selectedLabel = options.find((opt) => opt.value === value)?.label ?? options[0]?.label;

    return (
        <div className={clsx(baseStyle, variants[variant])}>
            {Icon && <Icon className="w-5 h-5 text-gray-500" />}
            <span>{selectedLabel}</span>

            {/* Select thật ẩn nhưng phủ toàn bộ */}
            <select
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDownIcon className="w-3 h-3" />
        </div>
    );
}
