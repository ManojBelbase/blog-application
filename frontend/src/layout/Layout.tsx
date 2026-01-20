import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { PATH } from "../const/Path";
import Sidebar from "../components/Shared/Sidebar";
import { Navbar } from "../components/Shared/Navbar";
import { Icon } from '@iconify/react';
import { useTheme } from '../hooks/useTheme';

const Layout: React.FC = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith(PATH.DASHBOARD);
    const { theme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-(--bg-primary) flex">
            {isDashboard && (
                <>
                    <Sidebar
                        currentPath={location.pathname}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                    {/* Overlay for mobile */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}
                </>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                {!isDashboard ? (
                    <Navbar />
                ) : (
                    <header className="h-16 border-b border-(--border-color) px-6 flex items-center md:hidden sticky top-0 bg-(--bg-primary) z-30">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 -ml-2 text-(--text-primary)"
                        >
                            <Icon icon="lucide:menu" className="w-6 h-6" />
                        </button>
                        <span className="ml-4 font-bold tracking-tight">DASHBOARD</span>
                    </header>
                )}

                <main className={`flex-1 ${isDashboard ? 'p-6 md:p-4' : 'px-0 sm:px-6 max-w-7xl mx-auto w-full'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;