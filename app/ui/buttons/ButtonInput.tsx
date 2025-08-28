'use client';
import { useRef } from 'react';
import clsx from 'clsx';

interface ButtonProps {
    Icon: React.ElementType;
    type: string;
    value?: string | number;
    iconColor?: string;
    bgColor?: string;
    borderColor?: string;
    placeHolder?: string;

    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ButtonInput({
    Icon,
    type,
    value,
    iconColor = 'text-gray-500',
    bgColor = 'bg-white',
    borderColor = 'border-gray-300',
    placeHolder,
    onClick,
    onChange,
}: ButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        if (inputRef.current) {
            // focus input
            inputRef.current.focus();

            if (typeof inputRef.current.showPicker === 'function') {
                try {
                    inputRef.current.showPicker();
                    return;
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        console.log('Button Component Error: ', err.message);
                    } else console.log('Button Component Error: ', err);
                }
            }

            // fallback click (để text/number cũng focus và mở bàn phím mobile)
            inputRef.current.click();
        }
        onClick?.();
    };

    return (
        <div
            onClick={handleDivClick}
            className={clsx(
                `flex items-center gap-2 border ${borderColor} p-2 rounded-xl ${bgColor} shadow-sm cursor-pointer`,
            )}
        >
            <Icon className={clsx(`w-5 h-5 ${iconColor}`)} />
            <input
                ref={inputRef}
                type={type}
                onChange={onChange}
                placeholder={placeHolder}
                value={value}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 cursor-pointer bg-transparent"
            />
        </div>
    );
}

export default ButtonInput;
