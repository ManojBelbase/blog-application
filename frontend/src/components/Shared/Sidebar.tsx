import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../const/Path';
import { Icon } from '@iconify/react';
import { useAuth } from '../../hooks/useAuth';
import { sidebarItems } from '../../const/SidebarItem';
import type { SidebarProps } from '../../types';
import { useTheme } from '../../hooks/useTheme';

const Sidebar: React.FC<SidebarProps> = ({ currentPath, isOpen, onClose }) => {
    const { logout, user } = useAuth();
    const { toggleTheme } = useTheme()
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-(--bg-primary) border-r border-(--border-color) transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 px-6 border-b border-(--border-color)">
                    <Link to={PATH.HOME} className="text-lg font-bold">
                        BLOGAPP
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 md:hidden text-(--text-secondary)"
                    >
                        <Icon icon="lucide:x" className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-2 ${currentPath === item.path
                                ? 'bg-(--accent) text-(--bg-primary) font-bold'
                                : 'text-(--text-secondary)'
                                }`}
                        >
                            <Icon icon={item.icon} className="text-lg" />
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-(--border-color)">
                    <div className="mb-4">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Account</p>
                        <p className="text-sm font-bold truncate">{user?.username || 'Guest'}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full  py-2 text-red-500 text-xs font-bold"
                    >
                        <Icon icon="lucide:log-out" className="text-lg" />
                        <span>Logout</span>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 w-full  py-2 text-xs font-bold"
                    >
                        <Icon icon="lucide:moon" className="text-lg" />
                        <span>Toggle Theme</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
