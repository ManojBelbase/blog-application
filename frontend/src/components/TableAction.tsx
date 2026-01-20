import React from 'react';
import { Icon } from '@iconify/react';
import type { TableActionsProps } from '../types';
export const TableActions: React.FC<TableActionsProps> = ({
    id,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex gap-4">
            {onEdit && (
                <button
                    onClick={() => onEdit(id)}
                    className="text-(--text-primary) cursor-pointer hover:text-(--accent) transition-colors"
                    title="Edit"
                >
                    <Icon icon="lucide:edit" className="w-4 h-4" />
                </button>
            )}

            {onDelete && (
                <button
                    onClick={() => onDelete(id)}
                    className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                    title="Delete"
                >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};
