import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../const/Path';
import { Icon } from '@iconify/react';

export const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <div className="mb-8">
                <Icon icon="lucide:ghost" className="w-24 h-24 text-(--text-secondary) opacity-20" />
            </div>

            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-4">404</h1>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-8">Page Not Found</h2>

            <p className="text-(--text-secondary) max-w-md mb-12 leading-relaxed">
                The Blog you are looking for doesn't exist or has been moved to another digital universe.
            </p>

            <Link
                to={PATH.HOME}
                className="inline-flex items-center gap-3 px-8 py-4 bg-(--accent) text-(--bg-primary) text-xs font-bold uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity"
            >
                <Icon icon="lucide:home" className="w-4 h-4" />
                Return to Safety
            </Link>
        </div>
    );
};
