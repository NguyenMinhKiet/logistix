'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ButtonAction from './buttons/ButtonAction';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { badgeBorderTextColors, wrapper } from '../styles/classes';
import ConfirmDialog from './modals/ConfirmDialog';
import { useDrivers } from '../context/DriverContext';
import EditDriverModal from './modals/EditDriverModal';
import { Driver } from '@prisma/client';

type DriverTableProps = {
    drivers: Driver[];
    filterBy?: ('name' | 'phone' | 'badge' | '')[];
};
function DriverTable({ drivers, filterBy }: DriverTableProps) {
    const [selectAll, setSelectAll] = useState(false);
    const [selected, setSelected] = useState<{ id: string; name: string }[]>([]);
    const [selectOne, setSelectOne] = useState<{ id: string; name: string } | null>(null);
    const [showConfirmDialogAll, setShowConfirmDialogAll] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [editingDriver, setEditingDriver] = useState<Driver>();
    const { deleteDriverContext } = useDrivers();

    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]);
        } else {
            setSelected(drivers.map((user) => ({ id: user.id, name: user.name })));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectOne = (user: { id: string; name: string }) => {
        setSelected((prev) => {
            const exists = prev.find((i) => i.id === user.id);
            return exists ? prev.filter((i) => i.id !== user.id) : [...prev, user];
        });
    };

    useEffect(() => {
        if (selected.length === drivers.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selected, drivers.length]);

    const handleDelete = () => {
        if (selected) {
            selected.map(async (selected) => {
                setSelected([]);
                setShowConfirmDialog(false);
                await deleteDriverContext(selected.id);
            });
        }
    };

    return (
        <div className="h-[700px]  overflow-x-auto">
            {selected.length > 0 && (
                <div className={clsx('flex items-center justify-between mb-2 p-2 border', wrapper)}>
                    <span className="text-sm">{selected.length} selected</span>
                    <div className="flex gap-2">
                        <ButtonAction
                            Icon={XMarkIcon}
                            variant="outlineDanger"
                            onClick={() => setShowConfirmDialogAll(!showConfirmDialogAll)}
                        />
                        <ConfirmDialog
                            isOpen={showConfirmDialogAll}
                            title="Xoá tài xế"
                            message={'Bạn có chắc chắn muốn xoá các tài xế này?'}
                            data={selected}
                            confirmText="Xoá"
                            cancelText="Huỷ"
                            onConfirm={handleDelete}
                            onCancel={() => setShowConfirmDialogAll(false)}
                        />
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
                                        checked={selected.some((s) => s.id === driver.id)}
                                        onChange={() => handleSelectOne({ id: driver.id, name: driver.name })}
                                    />
                                </td>
                                <td className="py-4 px-6">
                                    <Image
                                        alt="Driver Image"
                                        src={`/${driver.imageUrl}` || '/nguyenminhkiet.JPG'}
                                        width={100}
                                        height={150}
                                        className="w-[100px] h-[150px]  rounded-xl  object-cover"
                                    />
                                </td>
                                {filterBy && filterBy.includes('name') && <td className="py-4 px-6">{driver.name}</td>}
                                {filterBy && filterBy.includes('phone') && (
                                    <td className="py-4 px-6">{driver.phone}</td>
                                )}
                                {filterBy && filterBy.includes('badge') && (
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                badgeBorderTextColors[driver.badge]
                                            }`}
                                        >
                                            {driver.badge}
                                        </span>
                                    </td>
                                )}

                                <td className="py-4 px-6">
                                    <div className="flex item-center justify-center gap-2">
                                        <ButtonAction
                                            Icon={PencilIcon}
                                            variant="outlineWarning"
                                            onClick={() => setEditingDriver(driver)}
                                        />
                                        <ButtonAction
                                            Icon={XMarkIcon}
                                            variant="outlineDanger"
                                            onClick={() => {
                                                setSelectOne({ id: driver.id, name: driver.name });
                                                setShowConfirmDialog(true);
                                            }}
                                        />
                                    </div>
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

            {editingDriver && (
                <EditDriverModal data={editingDriver} isModalOpen={true} onClose={() => setEditingDriver(undefined)} />
            )}

            <ConfirmDialog
                isOpen={showConfirmDialog}
                title="Xoá tài xế"
                message={'Bạn có chắc chắn muốn xoá tài xế này?'}
                data={selectOne ? [selectOne] : []}
                confirmText="Xoá"
                cancelText="Huỷ"
                onConfirm={() => {
                    if (selectOne) {
                        deleteDriverContext(selectOne.id);
                        setSelectOne(null);
                    }
                    setShowConfirmDialog(false);
                }}
                onCancel={() => setShowConfirmDialog(false)}
            />
        </div>
    );
}

export default DriverTable;
