import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-(--text-secondary)">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 bg-(--bg-primary) border border-(--border-color) rounded-none text-(--text-primary) text-sm transition-all focus:border-(--accent) placeholder:text-gray-400 ${error ? 'border-red-500' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};




