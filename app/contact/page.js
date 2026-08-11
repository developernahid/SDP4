'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const ContactIcon = () => (
    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email || !subject || !message) {
            setError('All fields are required');
            return;
        }

        setIsLoading(true);

        try {
            const data = { name, email, subject, message };
            await axios.post('/api/contact', data);
            setSuccess('✅ Your message has been sent successfully!');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (err) {
            setError('❌ Failed to send message. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const contactInfo = [
        { icon: '📧', title: 'Email', detail: 'homeease@gmail.com', href: 'mailto:homeease@gmail.com' },
        { icon: '📱', title: 'Phone', detail: '+882345677', href: 'tel:+8801868260224' },
        { icon: '📍', title: 'Address', detail: 'Dhaka, Bangladesh', href: '#' },
        { icon: '⏰', title: 'Hours', detail: '24/7 Support', href: '#' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 py-20 px-4">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="text-center mb-16">
                    <div className="inline-block bg-violet-600/10 border border-violet-400/30 rounded-full px-4 py-2 mb-6">
                        <span className="text-sm font-semibold text-violet-700">Get in Touch</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                        We'd Love to <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Hear From You</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Have a question or feedback? Our friendly team is always ready to help. Reach out to us and let's start a conversation.
                    </p>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <a key={index} href={info.href} className="group">
                            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-violet-300 transition-all">
                                <div className="text-4xl mb-3">{info.icon}</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{info.title}</h3>
                                <p className="text-slate-600 group-hover:text-violet-600 transition-colors">{info.detail}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Side Graphics */}
                    <div className="hidden md:flex flex-col justify-center items-center">
                        <div className="relative w-full h-96">
                            {/* Gradient Circle Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-pink-600 rounded-3xl opacity-10 blur-3xl"></div>
                            
                            {/* Main Illustration */}
                            <div className="relative flex flex-col items-center justify-center h-full">
                                <div className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl p-8 shadow-2xl mb-6">
                                    <ContactIcon />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Drop us a Line</h2>
                                <p className="text-slate-600 text-center max-w-xs">We respond to all inquiries within 24 hours</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div>
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">Send a Message</h2>
                            <p className="text-slate-600 mb-8">We're here to help and answer any question you might have.</p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Your name"
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
                                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                        placeholder="What is this about?"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows="5"
                                        required
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all bg-slate-50"
                                    ></textarea>
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
                                    {isLoading ? '🔄 Sending...' : '✉️ Send Message'}
                                </button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                                <p className="text-slate-600 text-sm">
                                    <Link href="/" className="text-violet-600 font-semibold hover:text-pink-600">Return to Home</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
