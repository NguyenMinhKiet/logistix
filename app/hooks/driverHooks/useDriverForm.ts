import { ChangeEvent, useState, useEffect } from 'react';
import { Driver, EDriverStatus } from '@/app/types';

interface DriverFormData {
    id: string;
    name: string;
    phone: string;
    badge: EDriverStatus;
    license?: string | null;
    vehicleId?: string | null;
}

export const useDriverForm = (initialData: Driver) => {
    const [formData, setFormData] = useState<DriverFormData>({
        id: initialData.id,
        name: initialData.name,
        phone: initialData.phone,
        badge: initialData.badge,
        license: initialData.license,
        vehicleId: initialData.vehicleId,
    });

    const [previewImage, setPreviewImage] = useState('/nguyenminhkiet.JPG');
    const [imageFile, setImageFile] = useState<string>('');

    useEffect(() => {
        setPreviewImage(`/${initialData.imageUrl}`);
        setImageFile(initialData.imageUrl ?? '');
    }, [initialData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (file: File) => {
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
        setImageFile(file.name);
    };

    return {
        formData,
        previewImage,
        imageFile,
        handleInputChange,
        handleImageChange,
        setFormData,
    };
};
