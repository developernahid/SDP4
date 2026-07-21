'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LoginIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !password) {
            setError('Email and password are required');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const { user } = await res.json();
                login(user);
                router.push('/');
                router.refresh();
            } else {
                const { message } = await res.json();
                setError(message || 'Login failed');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    
                    {/* Left Side - Graphics */}
                    <div className="hidden md:flex flex-col justify-center items-center">
                        <div className="relative w-full h-96">
                            {/* Gradient Circle Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-pink-600 rounded-3xl opacity-10 blur-3xl"></div>
                            
                            {/* Main Illustration */}
                            <div className="relative flex flex-col items-center justify-center h-full">
                                <div className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl p-8 shadow-2xl mb-6">
                                    <LoginIcon />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Welcome Back</h2>
                                <p className="text-slate-600 text-center max-w-xs">Sign in to access your account and manage your services</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div>
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">Login To HomeEase</h1>
                            <p className="text-slate-600 mb-8">Enter your credentials to access your account</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all bg-slate-50"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2">
                                        <span className="text-lg">⚠️</span>
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? '🔄 Logging in...' : '🚀 Login'}
                                </button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <p className="text-slate-600 text-center text-sm mb-4">Don't have an account? <Link href="/register" className="text-violet-600 font-semibold hover:text-pink-600">Sign up</Link></p>
                                <div className="flex gap-2 justify-center text-sm text-slate-600">
                                    <Link href="/providers" className="text-violet-600 hover:underline">Browse providers</Link>
                                    <span>•</span>
                                    <Link href="/provider/register" className="text-violet-600 hover:underline">Become a provider</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
