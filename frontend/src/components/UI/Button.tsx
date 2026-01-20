import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    className = '',
    ...props
}) => {
    const variants = {
        primary: 'bg-[var(--accent)] text-[var(--bg-primary)]',
        outline: 'border border-[var(--border-color)] text-[var(--text-primary)]',
        danger: 'bg-red-600 text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-8 py-3.5 text-base',
    };

    return (
        <button
            className={`inline-flex items-center justify-center font-semibold rounded cursor-pointer transition-all disabled:opacity-50 ${variants[variant as keyof typeof variants]} ${sizes[size]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? 'Please wait...' : children}
        </button>
    );
};
