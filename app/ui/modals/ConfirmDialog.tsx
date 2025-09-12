'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ButtonAction from '../buttons/ButtonAction';
import Modal from './Modal';

interface ConfirmDialogProps {
    isOpen: boolean; // bật/tắt dialog
    title?: string; // tiêu đề
    message?: string; // nội dung
    data?: { id: string; name: string }[]; // danh sách item
    confirmText?: string; // text nút confirm
    cancelText?: string; // text nút cancel
    onConfirm: () => void; // callback khi xác nhận
    onCancel: () => void; // callback khi huỷ
}

export default function ConfirmDialog({
    isOpen,
    title = 'Xác nhận',
    message = 'Bạn có chắc muốn thực hiện hành động này?',
    data,
    confirmText = 'Xoá',
    cancelText = 'Huỷ',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            onCancel={onCancel}
            children={
                <>
                    {/* Body */}
                    <div className="mt-4 text-gray-700">
                        {message}
                        {data && data.length > 0 && (
                            <ul className="mt-3 list-disc list-inside text-gray-600 max-h-[500px] overflow-y-auto">
                                {data.map((item) => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                            {confirmText}
                        </button>
                    </div>
                </>
            }
        />
    );
}
