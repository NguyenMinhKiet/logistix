'use client';
import clsx from 'clsx';
import Image from 'next/image';

import { editDriver } from '@/app/lib/actions/driverActions';
import { Driver, DriverBadge } from '@prisma/client';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { useDrivers } from '@/app/context/DriverContext';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { useNotificationStore } from '@/app/store/notificationStore';

interface DriverFormData {
    id: string;
    name: string;
    imageUrl?: string | null;
    phone: string;
    badge: DriverBadge;
    license?: string | null;
    vehicleId?: string | null;
}

interface EditDriverModalProps {
    isModalOpen: boolean;
    data?: Driver;
    onClose: () => void; // callback đóng modal
}

function EditDriverModal({ isModalOpen = false, onClose, data }: EditDriverModalProps) {
    if (!isModalOpen || !data) return null;

    // Notification Store
    const addNotification = useNotificationStore((s) => s.addNotification);

    const { editDriverContext } = useDrivers();
    const [state, formAction, isPending] = useActionState(editDriver, undefined);

    const [previewImage, setPreviewImage] = useState('/nguyenminhkiet.JPG');
    const [imageFile, setImageFile] = useState<string>('');

    const [formData, setFormData] = useState<DriverFormData>({
        id: data.id,
        name: data.name,
        imageUrl: data.imageUrl,
        phone: data.phone,
        badge: data.badge,
        license: data.license,
        vehicleId: data.vehicleId,
    });

    // Đặt preview image
    useEffect(() => {
        setPreviewImage(`/${data.imageUrl}`);
    }, [data]);

    // Tắt modal khi thành công
    useEffect(() => {
        if (state?.success) {
            if (state.data) {
                editDriverContext(state.data);
            }
            onClose();
        }
    }, [state?.success, onClose]);

    // Thông báo
    useEffect(() => {
        if (!state?.message) return;
        if (state.success) {
            addNotification(state.message, 'success');
        } else {
            addNotification(state.message, 'error');
        }
    }, [state, addNotification]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Modal
            isOpen={isModalOpen}
            title="Edit Driver"
            children={
                <form action={formAction} className="space-y-4 sm:space-y-6">
                    <input type="hidden" name="id" value={formData.id} />
                    {/* Image Preview */}
                    <div className="flex items-center justify-center py-2 relative">
                        <div className="border rounded-xl p-2 ">
                            {previewImage && (
                                <Image
                                    className="w-[100px] h-[150px] rounded-xl object-cover"
                                    src={previewImage}
                                    alt="Preview"
                                    width={100}
                                    height={150}
                                />
                            )}
                            <input type="hidden" name="previewImage" value={imageFile} />
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[150px] opacity-0 hover:opacity-100 inset-0 flex flex-col items-center justify-center bg-white/70 rounded-xl transition">
                            <label
                                htmlFor="imageUrl"
                                className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50"
                            >
                                <span className="text-sm text-gray-600">Choose File</span>
                                <input
                                    type="file"
                                    id="imageUrl"
                                    name="imageUrl"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const objectUrl = URL.createObjectURL(file);
                                            setPreviewImage(objectUrl);
                                            setImageFile(file.name);
                                        }
                                    }}
                                    className="hidden"
                                />
                            </label>

                            {state?.errors?.imageUrl && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">{state?.errors?.imageUrl}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Upload Input */}

                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="name"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                                    state?.errors?.name
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="admin@logistic.com"
                            />
                            {state?.errors?.name && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">{state?.errors?.name}</p>
                            )}
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                            >
                                Phone
                            </label>
                            <input
                                type="phone"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                                    state?.errors?.phone
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="admin@logistic.com"
                            />
                            {state?.errors?.phone && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">{state?.errors?.phone}</p>
                            )}
                        </div>

                        {/* License Input */}
                        <div>
                            <label
                                htmlFor="license"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                            >
                                License
                            </label>
                            <input
                                type="license"
                                id="license"
                                name="license"
                                value={formData.license ?? 'Chưa cung cấp'}
                                onChange={handleInputChange}
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                                    state?.errors?.license
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="admin@logistic.com"
                            />
                            {state?.errors?.license && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">{state?.errors?.license}</p>
                            )}
                        </div>

                        {/* Select Vehicle */}
                        <div>
                            <label
                                htmlFor="vehicleId"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                            >
                                Vehicle
                            </label>
                            <select
                                id="vehicleId"
                                name="vehicleId"
                                value={formData.vehicleId ?? ''}
                                onChange={handleInputChange}
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base border-gray-300 hover:border-gray-400`}
                            >
                                <option value="">Select a vehicle</option>
                                <option value="vehicle1">Vehicle 1</option>
                                <option value="vehicle2">Vehicle 2</option>
                                <option value="vehicle3">Vehicle 3</option>
                            </select>
                        </div>
                        {/* Badge */}
                        <div>
                            <label
                                htmlFor="badge"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                            >
                                Badge Status
                            </label>
                            <select
                                id="badge"
                                name="badge"
                                value={formData.badge ?? ''}
                                onChange={handleInputChange}
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base border-gray-300 hover:border-gray-400`}
                            >
                                <option value="">Select a Badge</option>
                                <option value={DriverBadge.FREE}>FREE</option>
                                <option value={DriverBadge.BUSY}>BUSY</option>
                                <option value={DriverBadge.OFFLINE}>OFFLINE</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        aria-disabled={isPending}
                        className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 lg:py-4 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                    >
                        <span className="text-sm sm:text-base lg:text-lg">{isPending ? 'Đang xử lý ...' : 'Thêm'}</span>
                    </button>
                </form>
            }
            onCancel={() => onClose()}
        />
    );
}

export default EditDriverModal;
