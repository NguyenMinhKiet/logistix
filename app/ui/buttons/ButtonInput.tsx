'use client';
import { useRef } from 'react';
import clsx from 'clsx';

interface ButtonProps {
    Icon?: React.ElementType;
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

            if (inputRef.current.type === 'date') {
                inputRef.current.showPicker();
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
            {Icon && <Icon className={clsx(`w-5 h-5 ${iconColor}`)} />}
            <input
                ref={inputRef}
                type={type}
                onChange={onChange}
                placeholder={placeHolder}
                value={value}
                className={clsx(
                    'outline-none border-none text-sm text-gray-700 placeholder-gray-400 cursor-pointer bg-transparent',
                    type === 'checkbox' &&
                        'appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-gray-500 checked:border-gray-500',
                )}
            />
        </div>
    );
}

export default ButtonInput;
