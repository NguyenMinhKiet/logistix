import { ArrowDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ArrowUpIcon } from 'lucide-react';
import TrendIndicator from './TrendIndicator';

interface CardProps {
    Icon: React.ElementType;
    title: string;
    value: string | number;
    bgColor: string;
    iconColor: string;
    change: number;
    isPositive?: boolean;
}

export default function Card({ Icon, title, value, bgColor, iconColor, change = 0, isPositive = true }: CardProps) {
    return (
        <div className={`relative overflow-hidden rounded-xl ${bgColor} p-2 shadow-sm py-4`}>
            <div className="flex py-2 px-4">{<Icon className={`w-8 h-8 ${iconColor}`} />}</div>
            <div className="flex py-2 px-3 truncate">
                <h2 className="text-xl font-[400]">{title}</h2>
            </div>
            <div className="flex p-2 gap-3 items-center">
                <span className="text-xl font-medium">{value}</span>
                <TrendIndicator isPositive={isPositive} change={change} />
                <span>vs Last Month</span>
            </div>
        </div>
    );
}
