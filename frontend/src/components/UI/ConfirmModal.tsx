import React from 'react';
import { Modal } from '../Modal';
import { Button } from './Button';

interface ConfirmModalProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    opened,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    loading = false
}) => {
    return (
        <Modal opened={opened} onClose={onClose} title={title} size="lg" >
            <div className="space-y-6 max">
                <p className="text-sm text-(--text-secondary)">
                    {message}
                </p>

                <div className="flex gap-4">
                    <Button
                        onClick={onConfirm}
                        loading={loading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest text-xs font-bold"
                    >
                        Delete Permanently
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="uppercase tracking-widest text-xs font-bold"
                    >
                        Keep It
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
