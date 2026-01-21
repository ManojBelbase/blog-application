import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../const/Path';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '@iconify/react';

export const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate(PATH.LOGIN);
    };

    return (
        <nav className="h-16 border-b border-(--border-color) bg-(--bg-primary) px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
            <Link to={PATH.HOME} className="text-lg font-bold tracking-tight">BLOGAPP</Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
                <Link to={PATH.HOME} className="text-xs font-bold uppercase transition-colors hover:text-(--accent)">Home</Link>

                {isAuthenticated ? (
                    <>
                        <Link to={PATH.DASHBOARD} className="text-xs font-bold uppercase transition-colors hover:text-(--accent)">Dashboard</Link>
                        <div className="h-4 w-px bg-(--border-color)" />
                        <span className="text-xs font-normal text-gray-400">@{user?.username}</span>
                        <button onClick={handleLogout} className="text-xs cursor-pointer font-bold uppercase text-red-500 hover:text-red-400" title='Logout'>
                            <Icon icon="lucide:log-out" className="w-4 h-4 mr-2" />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to={PATH.LOGIN} className="text-xs font-bold uppercase transition-colors hover:text-(--accent)" title=''>Login</Link>
                    </>
                )}

                <button title='Toggle Theme' onClick={toggleTheme} className="p-2 ml-2 cursor-pointer text-(--text-primary)">
                    <Icon icon={theme === 'light' ? 'lucide:moon' : 'lucide:sun'} className="w-4 h-4" />
                </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
                <button onClick={toggleTheme} className="p-2 text-(--text-primary)">
                    <Icon icon={theme === 'light' ? 'lucide:moon' : 'lucide:sun'} className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 text-(--text-primary)"
                >
                    <Icon icon={menuOpen ? "lucide:x" : "lucide:menu"} className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            {menuOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMenuOpen(false)} />

                    {/* Drawer */}
                    <div className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-(--bg-primary) border-l border-(--border-color) p-6 z-50 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-right duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold tracking-tight">MENU</span>
                            <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2 text-(--text-primary)">
                                <Icon icon="lucide:x" className="w-6 h-6" />
                            </button>
                        </div>

                        <Link to={PATH.HOME} onClick={() => setMenuOpen(false)} className="text-sm font-bold uppercase hover:text-(--accent) transition-colors">Home</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to={PATH.DASHBOARD} onClick={() => setMenuOpen(false)} className="text-sm font-bold uppercase hover:text-(--accent) transition-colors">Dashboard</Link>
                                <div className="border-t border-(--border-color) pt-6 flex flex-col gap-4">
                                    <span className="text-xs font-normal text-gray-400">Logged in as @{user?.username}</span>
                                    <button onClick={handleLogout} className="text-left cursor-pointer text-sm flex font-bold uppercase text-red-500 hover:text-red-400">
                                        <Icon icon="lucide:log-out" className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={PATH.LOGIN} onClick={() => setMenuOpen(false)} className="text-sm cursor-pointer font-bold uppercase hover:text-(--accent) transition-colors">
                                    <Icon icon="lucide:log-in" className="w-4 h-4 mr-2" />
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </>
            )}
        </nav>
    );
};
