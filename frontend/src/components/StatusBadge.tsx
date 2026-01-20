import React from 'react';

interface StatusBadgeProps {
    status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStyles = (val: string) => {
        const s = val?.toLowerCase();
        if (s === 'tech') return 'border-blue-500/30 text-blue-500 bg-blue-500/5';
        if (s === 'life') return 'border-green-500/30 text-green-500 bg-green-500/5';
        if (s === 'news') return 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5';
        return 'border-(--border-color) text-(--text-secondary) bg-(--bg-secondary)/10';
    };

    return (
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border rounded-full ${getStyles(status)}`}>
            {status || 'General'}
        </span>
    );
};
