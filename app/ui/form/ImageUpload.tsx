'use client';

import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
    previewImage: string;
    imageFile: string;
    onImageChange: (file: File) => void;
    error?: string[];
}

export function ImageUpload({ previewImage, imageFile, onImageChange, error }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageChange(file);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group" onClick={handleClick}>
                <Image
                    src={previewImage || '/placeholder-avatar.png'}
                    alt="Driver avatar"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CameraIcon className="h-8 w-8 text-white" />
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                name="imageUrl"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <input type="hidden" name="currentImage" value={imageFile || ''} />

            {error && <p className="text-sm text-red-500 text-center">{error.join(', ')}</p>}
        </div>
    );
}
