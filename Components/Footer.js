import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 text-white py-12 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-violet-500/30 flex items-center gap-2">
                            <span className="text-pink-500">📍</span> Contact
                        </h3>
                        <p className="text-slate-300 text-sm">Address: BUBT</p>
                        <p className="text-slate-300 text-sm">Phone: +01234567811</p>
                        <p className="text-slate-300 text-sm">Email: <a href="mailto:support@krishop.com.bd" className="text-violet-400 hover:text-pink-400 transition-colors font-medium">homeesae@gmail.com</a></p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-violet-500/30 flex items-center gap-2">
                            <span className="text-violet-400">🔗</span> Quick Links
                        </h3>
                        <p><Link href="/home" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">Home</Link></p>
                        <p><Link href="/about" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">About</Link></p>
                        <p><Link href="/services" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">Services</Link></p>
                        <p><Link href="/contact" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">Contact</Link></p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-violet-500/30 flex items-center gap-2">
                            <span className="text-pink-500">👤</span> Account
                        </h3>
                        <p><Link href="/login" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">Login</Link></p>
                        <p><Link href="/register" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">Sign Up</Link></p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-violet-500/30 flex items-center gap-2">
                            <span className="text-pink-500">🌐</span> Connect
                        </h3>
                        <p><a href="https://www.facebook.com/" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">Facebook</a></p>
                        <p><a href="https://www.youtube.com/" className="text-slate-300 hover:text-violet-400 transition-colors text-sm">YouTube</a></p>
                    </div>
                </div>

                <div className="border-t border-violet-500/20 pt-6 text-center text-slate-400 text-sm">
                    <p>&copy; 2024 HomeEase. All rights reserved Team HomeEase.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;



