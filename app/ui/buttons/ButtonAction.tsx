'use client';

import clsx from 'clsx';

interface ActionButtonProps {
    Icon?: React.ElementType;
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'mainColor' | 'default';
}

function ButtonAction({ Icon, label, onClick, variant = 'default' }: ActionButtonProps) {
    const baseStyle =
        'flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm transition-colors cursor-pointer';

    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        mainColor: 'bg-gradient-to-br text-white from-blue-500 to-indigo-500',
        default: 'bg-white text-dark hover:bg-gray-50',
    };

    return (
        <button onClick={onClick} className={clsx(baseStyle, variants[variant])}>
            {Icon && <Icon className="w-4 h-4" />}
            {label}
        </button>
    );
}

export default ButtonAction;
