import clsx from 'clsx';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { formatNumber } from '../../lib/format';

interface trendIndicatorProps {
    isPositive: boolean;
    change: number;
    outline?: boolean;
    bgColor?: string;
}

function TrendIndicator({ isPositive, change, outline = true, bgColor }: trendIndicatorProps) {
    return (
        <div
            className={clsx(
                `flex max-w-[80px]  rounded-2xl p-2 items-center font-[600]`,
                isPositive ? 'text-green-600' : 'text-red-600',
                outline ? 'border' : 'border-transparent',
                bgColor ? bgColor : '',
            )}
        >
            {isPositive ? (
                <ArrowUpIcon className="w-4 h-4 text-green-600" />
            ) : (
                <ArrowDownIcon className="w-4 h-4 text-red-600" />
            )}

            <span className={clsx(`${isPositive ? 'text-green-600' : 'text-red-600'}`)}>{formatNumber(change)}%</span>
        </div>
    );
}

export default TrendIndicator;
