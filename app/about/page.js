'use client';

import Link from 'next/link';
import Support from '@/Components/Support';

const AboutPage = () => {
    const values = [
        { icon: "💡", title: "Innovation", desc: "Cutting-edge solutions with purpose" },
        { icon: "🤝", title: "Teamwork", desc: "Collaboration and trust first" },
        { icon: "✅", title: "Quality", desc: "Excellence in every detail" },
        { icon: "🎯", title: "User-First", desc: "Design with you in mind" }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 flex items-center justify-center px-4 py-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white">
                            <div className="inline-block bg-violet-600/20 border border-violet-400/30 rounded-full px-4 py-2 mb-6">
                                <span className="text-sm font-semibold text-violet-300">About HomeEase</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story & <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Mission</span></h1>
                            <p className="text-xl text-violet-100 mb-8 leading-relaxed">We're building a platform that connects trusted service providers with customers who deserve the best. Our mission is to make home services accessible, affordable, and reliable for everyone.</p>

                            <div className="flex gap-4">
                                <Link href="/services" className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                                    Explore Services
                                </Link>
                                <Link href="/providers" className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                                    Browse Providers
                                </Link>
                            </div>
                        </div>

                        {/* Right Graphics */}
                        <div className="hidden md:flex justify-center">
                            <div className="relative w-full h-96">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-pink-600/20 rounded-3xl border border-white/10 backdrop-blur-xl"></div>
                                <div className="relative flex items-center justify-center h-full">
                                    <div className="text-center space-y-4">
                                        <div className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl p-8 w-32 h-32 flex items-center justify-center mx-auto">
                                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m6 2a8 8 0 11-16 0 8 8 0 0116 0zm-6 2h.01M12 9v2m0 4v2m0 4v2" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Expert Team</h3>
                                        <p className="text-violet-100">Passionate professionals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-violet-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Who We Are</h2>
                            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                                HomeEase is a revolutionary platform dedicated to transforming the home services industry. We connect verified service providers with customers seeking reliable, quality work.
                            </p>
                            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                                Our team consists of experienced developers, designers, and service industry experts who understand both sides of the marketplace. We're committed to building solutions that make life easier.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🌍</span>
                                    <span className="text-slate-700"><strong>Global Reach:</strong> Serving customers nationwide</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">👥</span>
                                    <span className="text-slate-700"><strong>Expert Team:</strong> 50+ professionals</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-slate-700"><strong>Customer Rating:</strong> 4.8/5 stars</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-96 bg-gradient-to-br from-violet-600 to-pink-600 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/50 to-pink-600/50"></div>
                            <div className="relative z-10 text-center">
                                <h3 className="text-6xl font-bold text-white mb-2">10K+</h3>
                                <p className="text-xl text-violet-100">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-slate-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">These principles guide every decision we make</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl border border-slate-100 transition-all hover:border-violet-300">
                                <div className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-4 text-2xl">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                                <p className="text-slate-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-violet-600 to-pink-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-violet-100 mb-8">Join thousands of satisfied customers finding trusted services</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all inline-block">
                            Create Your Account
                        </Link>
                        <Link href="/services" className="bg-white/20 border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all inline-block">
                            Browse Services
                        </Link>
                    </div>
                </div>
            </section>

            <Support />
        </>
    );
};

export default AboutPage;