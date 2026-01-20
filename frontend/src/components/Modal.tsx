import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import type { ModalProps } from '../types';
export const Modal: React.FC<ModalProps> = ({ opened, onClose, title, children, size = 'xl' }) => {
    useEffect(() => {
        if (opened) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [opened]);

    if (!opened) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className={`bg-(--bg-primary) border border-(--border-color) w-full max-w-${size} sm:max-w-${size} shadow-2xl animate-in zoom-in-95 duration-200 rounded-sm`}>
                <div className="flex justify-between items-center p-2 sm:p-5 border-b border-(--border-color)">
                    <h3 className="text-sm sm:text-lg font-bold uppercase tracking-tight">{title}</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-(--bg-secondary) rounded transition-colors" aria-label="Close modal">
                        <Icon icon="lucide:x" className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-2  sm:p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};
