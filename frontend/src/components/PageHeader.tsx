import React from 'react';
import { Button } from './UI/Button';
import type { PageHeaderProps } from '../types';
export const PageHeader: React.FC<PageHeaderProps> = ({ title, onClick, actionLabel = 'Create', actionVariant = 'primary' }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-(--border-color) pb-4 mb-5 gap-4">
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase">{title}</h1>
            {onClick && (
                <Button onClick={onClick} variant={actionVariant} className="w-full sm:w-auto px-6 py-2 uppercase tracking-widest text-[10px] font-black">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
