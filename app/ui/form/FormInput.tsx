import { ChangeEvent } from 'react';

interface FormInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string[];
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function FormInput({
    id,
    label,
    value,
    onChange,
    error,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    className = '',
}: FormInputProps) {
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`
                    px-3 py-2
                    border rounded-lg
                    text-sm
                    transition-all duration-200
                    focus:outline-none focus:ring-2
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    ${
                        error
                            ? 'border-red-300 bg-red-50 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500 hover:border-gray-400'
                    }
                `}
            />

            {error && error.length > 0 && <p className="text-sm text-red-600">{error.join(', ')}</p>}
        </div>
    );
}
