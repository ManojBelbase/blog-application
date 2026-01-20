import React from 'react';

interface ShimmerProps {
    containerClass?: string;
    itemClass?: string;
    count?: number;
}

export const Shimmer: React.FC<ShimmerProps> = ({
    containerClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full",
    itemClass = "aspect-square",
    count = 6
}) => {
    return (
        <div className={containerClass}>
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className={`border border-(--border-color) animate-pulse bg-(--border-color)/20 ${itemClass}`}
                />
            ))}
        </div>
    );
};
