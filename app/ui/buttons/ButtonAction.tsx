'use client';

import clsx from 'clsx';
import { da } from 'zod/locales';

interface ActionButtonProps {
    Icon?: React.ElementType;
    label?: string;
    onClick?: () => void;
    variant?:
        | 'primary'
        | 'secondary'
        | 'danger'
        | 'mainColor'
        | 'warning'
        | 'success'
        | 'info'
        | 'dark'
        | 'outlineDark'
        | 'outlineSuccess'
        | 'outlineDanger'
        | 'outlineWarning'
        | 'outlineInfo'
        | 'outlineMainColor'
        | 'textDark';
}

function ButtonAction({ Icon, label, onClick, variant = 'secondary' }: ActionButtonProps) {
    const baseStyle =
        'flex items-center gap-2 px-4 py-2 border rounded-xl font-medium  transition-colors cursor-pointer';

    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-50 text-gray-400 hover:bg-gray-100',
        warning: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-200',
        danger: 'bg-red-600 text-white hover:bg-red-500',
        info: 'bg-cyan-600 text-white hover:bg-cyan-500',
        success: 'bg-green-600 text-white hover:bg-green-500',
        mainColor: 'bg-gradient-to-br text-white from-blue-500 to-indigo-500',
        dark: 'bg-gray-800 text-white hover:bg-gray-700',
        outlineDark: 'bg-white text-gray-800 border border-gray-500 hover:bg-gray-100',
        outlineSuccess: 'bg-white text-green-600 border border-green-600 hover:bg-green-50',
        outlineDanger: 'bg-white text-red-600 border border-red-600 hover:bg-red-50',
        outlineWarning: 'bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-50',
        outlineInfo: 'bg-white text-cyan-600 border border-cyan-600 hover:bg-cyan-50',
        outlineMainColor: 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50',
        textDark: 'bg-transparent text-gray-800 border-none hover:bg-gray-100',
    };

    return (
        <button onClick={onClick} className={clsx(baseStyle, variants[variant])}>
            {Icon && <Icon className="w-4 h-4" />}
            {label}
        </button>
    );
}

export default ButtonAction;
