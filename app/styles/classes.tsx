import { ExclamationCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { EDriverStatus, EShipmentStatus } from '@/app/types';
import clsx from 'clsx';
import { ShieldCheck } from 'lucide-react';
import { JSX } from 'react';

export const wrapper = 'shadow-md rounded-xl';

export const badgeBorderColors: Record<EDriverStatus, string> = {
    [EDriverStatus.FREE]: 'border-green-500',
    [EDriverStatus.BUSY]: 'border-amber-500',
    [EDriverStatus.OFFLINE]: 'border-red-500',
};

export const badgeTextColors: Record<EDriverStatus, string> = {
    [EDriverStatus.FREE]: 'text-green-500',
    [EDriverStatus.BUSY]: 'text-amber-500',
    [EDriverStatus.OFFLINE]: 'text-red-500',
};

export const badgeBorderTextColors: Record<EDriverStatus, string> = {
    [EDriverStatus.FREE]: 'border-green-500 bg-green-50 text-green-500',
    [EDriverStatus.BUSY]: 'border-amber-500 bg-amber-50 text-amber-500',
    [EDriverStatus.OFFLINE]: 'border-red-500 bg-red-50 text-red-500',
};

export const badgeIcons: Record<string, JSX.Element> = {
    [EDriverStatus.FREE]: <ShieldCheck className={clsx('w-5 h-5 ', badgeTextColors[EDriverStatus.FREE])} />,
    [EDriverStatus.BUSY]: <ShieldExclamationIcon className={clsx('w-5 h-5', badgeTextColors[EDriverStatus.BUSY])} />,
    [EDriverStatus.OFFLINE]: (
        <ExclamationCircleIcon className={clsx('w-5 h-5', badgeTextColors[EDriverStatus.OFFLINE])} />
    ),
};

export const shipmentStatusColors: Record<EShipmentStatus, string> = {
    [EShipmentStatus.PENDING]: 'yellow', // Waiting status
    [EShipmentStatus.PICKED_UP]: 'blue', // Started status
    [EShipmentStatus.IN_TRANSIT]: 'indigo', // Active status
    [EShipmentStatus.DELIVERED]: 'green', // Success status
    [EShipmentStatus.FAILED]: 'red', // Error status
};
