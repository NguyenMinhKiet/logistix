import clsx from 'clsx';
import { ReactNode } from 'react';

interface CardWrapperProps {
    children: ReactNode;
    status?: 'success' | 'warning' | 'pending';
    onClick?: () => void;
}

export default function CardWrapper({ children, status, onClick }: CardWrapperProps) {
    const success = 'border-2 border-green-600';
    const warning = 'border border-red-600';
    const pending = 'border border-yellow-600';
    const defaultBorder = 'border border-gray-200';

    return (
        <div
            onClick={onClick}
            className={clsx(
                'shadow-md rounded-xl',
                status === 'success' && success,
                status === 'warning' && warning,
                status === 'pending' && pending,
                !status && defaultBorder,
            )}
        >
            {children}
        </div>
    );
}
