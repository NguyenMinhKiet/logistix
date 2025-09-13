import { ExclamationCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { DriverBadge } from '@prisma/client';
import clsx from 'clsx';
import { ShieldCheck } from 'lucide-react';
import { JSX } from 'react';

export const wrapper = 'shadow-md rounded-xl';

export const badgeBorderColors: Record<DriverBadge, string> = {
    [DriverBadge.FREE]: 'border-green-500',
    [DriverBadge.BUSY]: 'border-amber-500',
    [DriverBadge.OFFLINE]: 'border-red-500',
};

export const badgeTextColors: Record<DriverBadge, string> = {
    [DriverBadge.FREE]: 'text-green-500',
    [DriverBadge.BUSY]: 'text-amber-500',
    [DriverBadge.OFFLINE]: 'text-red-500',
};

export const badgeBorderTextColors: Record<DriverBadge, string> = {
    [DriverBadge.FREE]: 'border-green-500 bg-green-50 text-green-500',
    [DriverBadge.BUSY]: 'border-amber-500 bg-amber-50 text-amber-500',
    [DriverBadge.OFFLINE]: 'border-red-500 bg-red-50 text-red-500',
};

export const badgeIcons: Record<string, JSX.Element> = {
    [DriverBadge.FREE]: <ShieldCheck className={clsx('w-5 h-5 ', badgeTextColors[DriverBadge.FREE])} />,
    [DriverBadge.BUSY]: <ShieldExclamationIcon className={clsx('w-5 h-5', badgeTextColors[DriverBadge.BUSY])} />,
    [DriverBadge.OFFLINE]: <ExclamationCircleIcon className={clsx('w-5 h-5', badgeTextColors[DriverBadge.OFFLINE])} />,
};
