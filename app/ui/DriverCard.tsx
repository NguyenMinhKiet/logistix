'use client';

import { PhoneIcon, ShieldCheck, ShieldX } from 'lucide-react';
import ButtonAction from './buttons/ButtonAction';
import {
    EllipsisHorizontalIcon,
    ExclamationCircleIcon,
    PencilIcon,
    ShieldExclamationIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import clsx from 'clsx';
import { badgeBorderColors, badgeBorderTextColors, badgeIcons, wrapper } from '../styles/classes';
import { JSX, useState } from 'react';
import ConfirmDialog from './modals/ConfirmDialog';
import { useDrivers } from '../context/DriverContext';
import EditDriverModal from './modals/EditDriverModal';
import { Driver } from '@/app/types';

type DriverCardProps = {
    driver: Driver;
};

function DriverCard({ driver }: DriverCardProps) {
    const { deleteDriver } = useDrivers();

    const [showActions, setShowActions] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [editingDriver, setEditingDriver] = useState<Driver>();

    const handleDelete = async () => {
        setShowConfirmDialog(false);
        await deleteDriver(driver.id);
    };

    return (
        <div className={clsx(`${wrapper} flex flex-col p-3 border border-gray-200`)}>
            <div className="relative w-[70px] h-[70px] mx-auto mb-3">
                <Image
                    src={`/${driver.imageUrl}`}
                    alt="User Image"
                    width={70}
                    height={70}
                    className={clsx(
                        `w-[70px] h-[70px] object-cover rounded-full border-2  p-1`,
                        badgeBorderColors[driver.badge],
                    )}
                />
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">{badgeIcons[driver.badge]}</div>
            </div>

            <div className="flex items-center justify-between gap-3">
                <h2 className="text-bold font-semibold">{driver.name}</h2>
                <div className="flex items-center justify-between gap-2">
                    <span
                        className={clsx(
                            `border text-center  p-1 rounded-md  text-sm px-2`,
                            badgeBorderTextColors[driver.badge],
                        )}
                    >
                        {driver.badge}
                    </span>
                    <div className="relative inline-block">
                        <ButtonAction Icon={EllipsisHorizontalIcon} onClick={() => setShowActions(!showActions)} />

                        {showActions && (
                            <div className="absolute z-50 mt-2 right-0 bg-white border rounded-lg shadow-lg">
                                <div className="flex flex-col p-1  gap-2">
                                    <ButtonAction
                                        Icon={PencilIcon}
                                        variant="outlineWarning"
                                        onClick={() => setEditingDriver(driver)}
                                    />
                                    <ButtonAction
                                        Icon={XMarkIcon}
                                        variant="outlineDanger"
                                        onClick={() => setShowConfirmDialog(true)}
                                    />
                                </div>

                                <ConfirmDialog
                                    isOpen={showConfirmDialog}
                                    title="Xoá tài xế"
                                    message={`Bạn có chắc chắn muốn xoá tài xế ${driver.name}?`}
                                    data={[{ id: driver.id, name: driver.name }]}
                                    confirmText="Xoá"
                                    cancelText="Huỷ"
                                    onConfirm={handleDelete}
                                    onCancel={() => setShowConfirmDialog(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                <div className="flex gap-3 items-center">
                    <PhoneIcon className="w-5 h-5" />
                    <span className="text-sm text-gray-500">phone</span>
                    <span className="">{driver.phone}</span>
                </div>
            </div>

            {editingDriver && (
                <EditDriverModal data={editingDriver} isModalOpen={true} onClose={() => setEditingDriver(undefined)} />
            )}
        </div>
    );
}

export default DriverCard;
