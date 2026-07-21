/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

// --- Mock data for HowItWorks ---
const steps = [
    {
        number: 1,
        title: "Select the Service",
        description: "Pick the service you are looking for- from the website or the app."
    },
    {
        number: 2,
        title: "Pick your schedule",
        description: "Pick your convenient date and time to avail the service. Pick the service provider based on their rating."
    },
    {
        number: 3,
        title: "Place Your Order & Relax",
        description: "Review and place the order. Now just sit back and relax. We'll assign the expert service provider's schedule for you."
    }
];

/**
 * HowItWorks Component
 * Renders the "Easiest way to get a service" section.
 */
export default function HowItWorks() {
    return (
        <section className="w-full bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                        Easiest way to get a <span className="gradient-text">service</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

                    {/* Left Column: Phone Image with Play Button */}
                    <div className="relative flex h-full min-h-[400px] w-full max-w-md justify-self-center rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 p-6 shadow-xl lg:min-h-[500px] group hover:shadow-2xl transition-shadow duration-300">
                        {/* Placeholder for the phone image */}
                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-200 overflow-hidden">
                            <img src="/customer-testimonial-video.jpg" className="w-full h-full object-cover" />
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                className="group/play flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-600 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
                                aria-label="Play video"
                            >
                                <svg
                                    className="ml-1 h-12 w-12 text-white transition-transform duration-300 ease-in-out group-hover/play:scale-110"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8 5.14v13.72L19.25 12 8 5.14z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Steps */}
                    <div className="flex flex-col space-y-8">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative flex group">
                                {/* Numbered Circle and Connecting Line */}
                                <div className="flex flex-col items-center">
                                    <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-600 text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {step.number}
                                    </div>
                                    {/* Connecting line, hidden for the last item */}
                                    {index < steps.length - 1 && (
                                        <div className="h-full w-1 flex-1 bg-gradient-to-b from-violet-400 to-pink-400" />
                                    )}
                                </div>

                                {/* Step Content */}
                                <div className="ml-8 flex-1 pb-8">
                                    <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-base text-slate-600 group-hover:text-slate-700 transition-colors">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
