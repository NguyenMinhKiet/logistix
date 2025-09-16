import { ButtonHTMLAttributes } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isPending?: boolean;
    text?: string;
    pendingText?: string;
    className?: string;
}

export function SubmitButton({
    isPending = false,
    text = 'Lưu thay đổi',
    pendingText = 'Đang lưu...',
    className = '',
    ...props
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={isPending}
            className={`
                w-full px-4 py-2
                bg-blue-600 hover:bg-blue-700
                disabled:bg-blue-400
                text-white font-medium
                rounded-lg
                transition-colors duration-200
                flex items-center justify-center
                space-x-2
                ${className}
            `}
            {...props}
        >
            {isPending && (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            <span>{isPending ? pendingText : text}</span>
        </button>
    );
}
