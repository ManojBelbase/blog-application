import React from 'react';

interface DropdownProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    error?: string;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange, options, error, className = '' }) => {
    return (
        <div className={`w-full space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-(--text-secondary)">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full px-2 sm:px-4 py-1.5 sm:py-2 bg-(--bg-primary) border border-(--border-color) rounded text-(--text-primary) text-sm transition-all focus:border-(--accent) ${error ? 'border-red-500' : ''
                    }`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};