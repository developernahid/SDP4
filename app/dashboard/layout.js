"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (user === null) {
            window.location.href = '/login';
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const sidebarItems = [
        { name: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
        { name: 'Profile', href: '/dashboard/profile', icon: <AccountCircleIcon /> },
        { name: 'Booked Orders', href: '/dashboard/booked-orders', icon: <ShoppingCartIcon /> },
        { name: 'Update Profile', href: '/dashboard/update-profile', icon: <EngineeringIcon /> },
        { name: 'Provider Hub', href: '/provider/dashboard', icon: <EngineeringIcon />, providerOnly: true },
        { name: 'Admin', href: '/dashboard/admin', icon: <AdminPanelSettingsIcon />, adminOnly: true },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`bg-green-50 text-gray-900 w-64 p-6 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}
            >
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
                <nav>
                    <ul>
                        {sidebarItems.map((item) =>
                            ((!item.adminOnly || (user && user.role === 'admin')) && (!item.providerOnly || (user && user.role === 'provider'))) && (
                                <li key={item?.name} className="mb-4">
                                    <Link href={item?.href}>
                                        <p className="flex items-center p-3 gap-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 hover:text-white">
                                            {
                                                item.icon
                                            }
                                            <span className="font-medium">{item?.name}</span>
                                        </p>
                                    </Link>
                                </li>
                            )
                        )}
                        <li className="mb-4">
                            <button
                                onClick={logout}
                                className="flex items-center p-3 w-full rounded-lg hover:bg-gray-700 transition-colors duration-200 hover:text-white cursor-pointer"
                            >
                                <LogoutIcon className="w-6 h-6 mr-4" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Hamburger button */}
                <header className="p-4 bg-white shadow-md md:hidden">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </header>
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
