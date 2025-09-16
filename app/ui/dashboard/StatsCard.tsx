import { UsersIcon } from '@heroicons/react/24/outline';

interface StatsCardProps {
    title: string;
    count: number;
    color?: string;
}

export const StatsCard = ({ title, count, color = 'black' }: StatsCardProps) => (
    <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
        <h1 className="text-gray-700">{title}</h1>
        <div className="flex justify-between items-center">
            <span className="font-semibold text-xl">{count}</span>
            <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                <UsersIcon className={`w-5 h-5 text-${color}`} />
            </div>
        </div>
    </div>
);
