'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ButtonAction from './buttons/ButtonAction';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { wrapper } from '../styles/classes';
import { Driver } from '@/app/types';

type DriverTableProps = {
    drivers: Driver[];
    filterBy?: ('name' | 'phone' | 'badge' | '')[];
};
function DriverTable({ drivers, filterBy }: DriverTableProps) {
    const [selectAll, setSelectAll] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [data, setData] = useState<Driver[]>(drivers);

    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]);
        } else {
            setSelected(drivers.map((user) => user.id));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectOne = (index: string) => {
        if (selected.includes(index)) {
            setSelected(selected.filter((i) => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    useEffect(() => {
        if (selected.length === drivers.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selected, drivers.length]);

    return (
        <div className="overflow-x-auto">
            {selected.length > 0 && (
                <div className={clsx('flex items-center justify-between mb-2 p-2 border', wrapper)}>
                    <span className="text-sm">{selected.length} selected</span>
                    <div className="flex gap-2">
                        <ButtonAction label="Delete" variant="danger" />
                    </div>
                </div>
            )}

            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                        <th className="py-3 px-6 w-5">
                            <input type="checkbox" className="w-5 h-5" checked={selectAll} onChange={handleSelectAll} />
                        </th>
                        <th className="py-3 px-6 text-left">Image</th>
                        {filterBy && filterBy.includes('name') && <th className="py-3 px-6 text-left">Name</th>}
                        {filterBy && filterBy.includes('phone') && <th className="py-3 px-6 text-left">Phone</th>}
                        {filterBy && filterBy.includes('badge') && <th className="py-3 px-6 text-left">Badge</th>}

                        <th className="py-3 px-6 w-[50px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.length > 0 ? (
                        drivers.map((driver) => (
                            <tr key={driver.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5"
                                        checked={!!selected.includes(driver.id)}
                                        onChange={() => handleSelectOne(driver.id)}
                                    />
                                </td>
                                <td className="py-4 px-6">
                                    <Image
                                        alt="Driver Image"
                                        src={driver.imageUrl || '/nguyenminhkiet.JPG'}
                                        width={50}
                                        height={50}
                                        className="w-auto h-auto object-cover"
                                    />
                                </td>
                                {filterBy && filterBy.includes('name') && <td className="py-4 px-6">{driver.name}</td>}
                                {filterBy && filterBy.includes('name') && <td className="py-4 px-6">{driver.phone}</td>}
                                {filterBy && filterBy.includes('name') && (
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                driver.badge === 'BUSY'
                                                    ? 'bg-amber-50 text-amber-500'
                                                    : driver.badge === 'FREE'
                                                    ? 'bg-green-50 text-green-500'
                                                    : 'bg-gray-50 text-gray-500'
                                            }`}
                                        >
                                            {driver.badge}
                                        </span>
                                    </td>
                                )}

                                <td className="py-4 px-6">
                                    <ButtonAction Icon={PencilIcon} variant="warning" />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DriverTable;
