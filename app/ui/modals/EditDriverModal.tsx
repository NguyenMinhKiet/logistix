'use client';

import { Driver, EDriverStatus } from '@/app/types';
import { useDrivers } from '@/app/context/DriverContext';
import { useDriverForm } from '@/app/hooks/driverHooks/useDriverForm';
import { useNotification } from '@/app/hooks/useNotification';
import Modal from './Modal';
import { FormInput } from '@/app/ui/form/FormInput';
import { ImageUpload } from '../form/ImageUpload';
import { useActionState, useEffect } from 'react';
import { editDriver } from '@/app/lib/serverActions/driverActions';
import { SelectInput } from '../buttons/SelectInput';
import { SubmitButton } from '../form/SubmitButton';

interface EditDriverModalProps {
    isModalOpen: boolean;
    data?: Driver;
    onClose: () => void;
}

function EditDriverModal({ isModalOpen = false, onClose, data }: EditDriverModalProps) {
    if (!isModalOpen || !data) return null;

    const { updateDriver } = useDrivers();
    const addNotification = useNotification((s) => s.addNotification);
    const [state, formAction, isPending] = useActionState(editDriver, undefined);

    const { formData, setFormData, previewImage, imageFile, handleInputChange, handleImageChange } =
        useDriverForm(data);

    useEffect(() => {
        if (state?.success) {
            state.data && updateDriver(state.data);
            onClose();
        }

        if (state?.message) {
            addNotification(state.message, state.success ? 'success' : 'error');
        }
    }, [state, onClose, addNotification]);

    return (
        <Modal isOpen={isModalOpen} title="Edit Driver" onCancel={onClose}>
            <form action={formAction} className="space-y-4 sm:space-y-6">
                <input type="hidden" name="id" value={formData.id} />

                {/* Image Upload Section */}
                <ImageUpload
                    previewImage={previewImage}
                    imageFile={imageFile}
                    onImageChange={handleImageChange}
                    error={state?.errors?.imageUrl}
                />

                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        id="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={state?.errors?.name}
                    />

                    <FormInput
                        id="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={state?.errors?.phone}
                    />

                    <FormInput
                        id="license"
                        label="License"
                        value={formData.license ?? 'Chưa cung cấp'}
                        onChange={handleInputChange}
                        error={state?.errors?.license}
                    />

                    <SelectInput
                        id="vehicleId"
                        label="Vehicle"
                        value={formData.vehicleId ?? ''}
                        onChange={(val) => setFormData({ ...formData, vehicleId: val })}
                        options={[
                            { value: '', label: 'Select a vehicle' },
                            { value: 'vehicle1', label: 'Vehicle 1' },
                            { value: 'vehicle2', label: 'Vehicle 2' },
                            { value: 'vehicle3', label: 'Vehicle 3' },
                        ]}
                    />

                    <SelectInput
                        id="badge"
                        label="Badge Status"
                        value={formData.badge}
                        onChange={(val) => setFormData({ ...formData, badge: val as EDriverStatus })}
                        options={[
                            { value: '', label: 'Select a Badge' },
                            { value: EDriverStatus.FREE, label: 'FREE' },
                            { value: EDriverStatus.BUSY, label: 'BUSY' },
                            { value: EDriverStatus.OFFLINE, label: 'OFFLINE' },
                        ]}
                    />
                </div>

                <SubmitButton isPending={isPending} />
            </form>
        </Modal>
    );
}

export default EditDriverModal;
