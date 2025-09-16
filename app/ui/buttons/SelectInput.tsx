import { ChangeEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectInputProps {
    id: string;
    Icon?: any;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    label?: string;
    error?: string[];
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function SelectInput({
    id,
    Icon,
    value,
    onChange,
    options,
    label,
    error,
    required = false,
    disabled = false,
    className = '',
}: SelectInputProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={`relative ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                )}

                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`
                        block w-full
                        ${Icon ? 'pl-10' : 'pl-3'} pr-10 py-2
                        bg-white border border-gray-300 rounded-lg
                        text-sm text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                        appearance-none
                        ${error ? 'border-red-300 bg-red-50' : 'hover:border-gray-400'}
                    `}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
            </div>

            {error && error.length > 0 && <p className="mt-1 text-sm text-red-600">{error.join(', ')}</p>}
        </div>
    );
}
