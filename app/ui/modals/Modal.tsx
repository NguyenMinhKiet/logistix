'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ButtonAction from '../buttons/ButtonAction';

interface ModalProps {
    isOpen: boolean; // bật/tắt dialog
    title?: string; // tiêu đề
    children: React.ReactNode;
    onCancel: () => void; // callback khi huỷ
}

export default function Modal({ isOpen, title = 'Modal', children, onCancel }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <ButtonAction Icon={XMarkIcon} onClick={onCancel} variant="danger" />
                </div>

                {/* Body */}
                <div className="mt-4 text-gray-700">{children}</div>
            </div>
        </div>
    );
}
