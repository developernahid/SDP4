'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const SignUpIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            const user = { username, email, password };
            await axios.post('/api/register', user);
            setSuccess('✅ Registration successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                                    <SignUpIcon />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Join HomeEase</h2>
                                <p className="text-slate-600 text-center max-w-xs">Create your account and start booking trusted services today</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div>
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">Register Now</h1>
                            <p className="text-slate-600 mb-8">Create your account in just a few steps</p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        placeholder="Choose your username"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all bg-slate-50"
                                    />
                                </div>

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
                                        minLength="6"
                                        required
                                        placeholder="At least 6 characters"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Re-enter your password"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all bg-slate-50"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2">
                                        <span className="text-lg">⚠️</span>
                                        <p>{error}</p>
                                    </div>
                                )}

                                {success && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-start gap-2">
                                        <span className="text-lg">✅</span>
                                        <p>{success}</p>
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? '🔄 Creating account...' : '✨ Create Account'}
                                </button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <p className="text-slate-600 text-center text-sm mb-4">Already have an account? <Link href="/login" className="text-violet-600 font-semibold hover:text-pink-600">Sign in</Link></p>
                                <p className="text-slate-600 text-center text-sm"><Link href="/provider/register" className="text-violet-600 hover:underline font-semibold">Register as a provider instead</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
