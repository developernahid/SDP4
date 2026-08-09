'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const MenuIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const Header = ({ user }) => {
    const { logout, loading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openedRoute, setOpenedRoute] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOpenedRoute(window.location.pathname);
        }
    }, []);

    const isActive = (path) => openedRoute === path;

    const handleActiveChange = (path) => {
        setOpenedRoute(path);
    };

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between gap-8 py-4">
                    <Link href="/" className="text-2xl font-semibold tracking-tight text-slate-900">
                        <span className="gradient-text">HomeEase</span>
                    </Link>

                    <nav className="hidden items-center gap-7 lg:flex">
                        <Link href="/" onClick={() => handleActiveChange('/')} className={`text-sm font-medium transition-all ${isActive('/') ? 'rounded-full bg-violet-100 px-3 py-2 text-violet-700' : 'text-slate-600 hover:text-violet-600'}`}>Home</Link>
                            {!loading && user && (
                            <>
                                <Link href="/dashboard" onClick={() => handleActiveChange('/dashboard')} className={`text-sm font-medium transition-all ${isActive('/dashboard') ? 'rounded-full bg-violet-100 px-3 py-2 text-violet-700' : 'text-slate-600 hover:text-violet-600'}`}>Dashboard</Link>
                                {user.role === 'provider' && <Link href="/provider/dashboard" onClick={() => handleActiveChange('/provider/dashboard')} className={`text-sm font-medium transition-all ${isActive('/provider/dashboard') ? 'rounded-full bg-violet-100 px-3 py-2 text-violet-700' : 'text-slate-600 hover:text-violet-600'}`}>Provider</Link>}
                            </>
                        )}
                        <Link href="/services" onClick={() => handleActiveChange('/services')} className={`text-sm font-medium transition-all ${isActive('/services') ? 'rounded-full bg-violet-100 px-3 py-2 text-violet-700' : 'text-slate-600 hover:text-violet-600'}`}>Services</Link>
                        <Link href="/providers" onClick={() => handleActiveChange('/providers')} className={`text-sm font-medium transition-all ${isActive('/providers') ? 'rounded-full bg-violet-100 px-3 py-2 text-violet-700' : 'text-slate-600 hover:text-violet-600'}`}>Providers</Link>
                        <Link href="/about" onClick={() => handleActiveChange('/about')} className={`text-sm font-medium transition-all ${isActive('/about') ? 'rounded-full bg-violet-100 px-3 py-2 text-violet-700' : 'text-slate-600 hover:text-violet-600'}`}>About</Link>
                        <Link href="/contact" onClick={() => handleActiveChange('/contact')} className={`text-sm font-medium transition-all ${isActive('/contact') ? 'rounded-full bg-violet-100 px-3 py-2 text-violet-700' : 'text-slate-600 hover:text-violet-600'}`}>Contact</Link>
                    
                    </nav>

                    {!loading && (
                        user ? (
                            <div className="hidden items-center gap-3 sm:flex">
                                <Link href="/dashboard/profile" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700">{user?.username}</Link>
                                <button onClick={handleLogout} className="rounded-full bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]">Logout</button>
                            </div>
                        ) : (
                            <div className="hidden items-center gap-3 sm:flex">
                                <Link href="/login" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700">Sign In</Link>
                                <Link href="/register" className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]">Sign Up</Link>
                            </div>
                        )
                    )}

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden">
                        <MenuIcon />
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="pb-4 lg:hidden">
                        <nav className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
                            <Link href="/" className={`rounded-xl px-4 py-2 transition ${isActive('/') ? 'bg-violet-100 text-violet-700' : 'text-slate-700 hover:bg-slate-100'}`}>Home</Link>
                            <Link href="/services" className={`rounded-xl px-4 py-2 transition ${isActive('/services') ? 'bg-violet-100 text-violet-700' : 'text-slate-700 hover:bg-slate-100'}`}>Services</Link>
                            <Link href="/providers" className={`rounded-xl px-4 py-2 transition ${isActive('/providers') ? 'bg-violet-100 text-violet-700' : 'text-slate-700 hover:bg-slate-100'}`}>Providers</Link>
                            <Link href="/about" className={`rounded-xl px-4 py-2 transition ${isActive('/about') ? 'bg-violet-100 text-violet-700' : 'text-slate-700 hover:bg-slate-100'}`}>About</Link>
                            <Link href="/contact" className={`rounded-xl px-4 py-2 transition ${isActive('/contact') ? 'bg-violet-100 text-violet-700' : 'text-slate-700 hover:bg-slate-100'}`}>Contact</Link>
                            <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3">
                                {!loading && (
                                    user ? (
                                        <>
                                            <Link href={user.role === 'provider' ? '/provider/dashboard' : '/dashboard/profile'} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700">{user?.username}</Link>
                                            <button onClick={handleLogout} className="rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2 text-sm font-medium text-white">Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700">Sign In</Link>
                                            <Link href="/register" className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-center text-sm font-medium text-white">Sign Up</Link>
                                        </>
                                    )
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
