/* eslint-disable @next/next/no-img-element */
import React from 'react';

// SVG Icon Components
const MaskIcon = () => (
    <svg className="w-8 h-8 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-3.313 0-6 2.687-6 6v4h12V8c0-3.313-2.687-6-6-6zm-4 8H4v6h4v-6zm8 0h4v6h-4v-6zM8 14H4a2 2 0 00-2 2v2h6v-4zm8 0h4a2 2 0 012 2v2h-6v-4z" />
        <path d="M4 10c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v2H4v-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SupportIcon = () => (
    <svg className="w-8 h-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        <text x="50%" y="55%" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="8" fill="#8B5CF6" textAnchor="middle" dy=".3em">24/7</text>
    </svg>
);

const SanitiseIcon = () => (
    <svg className="w-8 h-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const GlovesIcon = () => (
    <svg className="w-8 h-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a16.5 16.5 0 00-5.84-2.56m0 0A16.5 16.5 0 019.75 2.63m-5.84 7.38h4.82m-4.82 0a6 6 0 016-6.37m-4.24 14.03a6 6 0 01-5.84-7.38m5.84 7.38L12 14.37m-2.41 5.03L12 14.37m0 0L9.75 12m2.25 2.37L12 9.75M12 14.37l2.41-5.04M12 9.75L14.25 12" />
    </svg>
);

const SafetyShieldIcon = () => (
    <svg className="w-4 h-4 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
    </svg>
);


// Reusable Feature Card Component
const FeatureCard = ({ icon, title, bgColor, iconComponent }) => {
    return (
        <div className="group bg-white/90 p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center text-center hover:shadow-xl hover:border-violet-300 transition-all duration-300 hover:scale-105">
            <div className={`${bgColor} p-4 rounded-full group-hover:scale-110 transition-transform duration-300`}>
                {iconComponent}
            </div>
            <h3 className="font-semibold text-slate-800 mt-4 text-lg group-hover:text-violet-700 transition-colors">{title}</h3>
        </div>
    );
};


// Main Component
const SafetyFeatures = () => {
    const features = [
        { title: "Ensuring Masks", bgColor: "bg-violet-100", icon: <MaskIcon /> },
        { title: "24/7 Support", bgColor: "bg-pink-100", icon: <SupportIcon /> },
        { title: "Sanitising Hands & Equipment", bgColor: "bg-violet-50", icon: <SanitiseIcon /> },
        { title: "Ensuring Gloves", bgColor: "bg-rose-50", icon: <GlovesIcon /> },
    ];

    return (
        <div className="bg-gradient-to-b from-white to-violet-50/30 min-h-screen py-12 md:py-20 font-sans">
            <div className="container mx-auto px-4 lg:px-8">
                <section className="rounded-3xl overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        {/* Header Text */}
                        <div className="mb-12 md:mb-16">
                            <p className="text-violet-600 font-semibold text-sm tracking-widest uppercase">WHY CHOOSE US</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">Because we care about your <span className="gradient-text">safety</span>.</h2>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* Left Side: Feature Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <FeatureCard
                                        key={index}
                                        title={feature.title}
                                        bgColor={feature.bgColor}
                                        iconComponent={feature.icon}
                                    />
                                ))}
                            </div>

                            {/* Right Side: Image */}
                            <div className="relative group">
                                <img
                                    src="/plumbing-services.jpg"
                                    alt="Team ensuring safety"
                                    className="rounded-2xl w-full h-auto object-cover shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-violet-600 via-violet-600 to-pink-500 rounded-b-2xl flex items-center justify-center shadow-lg">
                                    <SafetyShieldIcon />
                                    <span className="text-white font-bold text-sm tracking-widest">SAFETY ENSURED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SafetyFeatures;
