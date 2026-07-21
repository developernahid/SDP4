/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

/**
 * TestimonialSection Component
 * Renders the "Real Happy Customers" section
 */
const TestimonialSection = () => {
    return (
        <section className="w-full bg-gradient-to-b from-slate-50 to-violet-50 py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12">
                    <span className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        SOME HAPPY FACES
                    </span>
                    <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
                        Real Happy Customers, Real <span className="gradient-text">Stories</span>
                    </h2>
                </div>

                {/* Testimonial Content */}
                <div className="relative flex flex-col items-center gap-12 lg:flex-row">



                    {/* Testimonial Card */}
                    <div className="relative w-full lg:w-1/2 bg-white/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
                        <span
                            className="absolute -top-8 -left-4 text-9xl font-bold text-violet-200 opacity-30"
                            style={{ lineHeight: 1 }}
                            aria-hidden="true"
                        >
                            “
                        </span>
                        <blockquote className="relative z-10 border-l-4 border-violet-600 pl-6 lg:pl-8">
                            <p className="text-lg md:text-xl font-medium text-slate-700">
                                Such service platforms are available in other countries. I&apos;ve personally used those when I was abroad. I&apos;m very pleased that such a portal is available here in Bangladesh as well. Thank you HomeEase.
                            </p>
                        </blockquote>
                        <div className="mt-6 pl-6 lg:pl-8">
                            <cite className="not-italic">
                                <span className="block text-lg font-bold text-slate-900">Zabeen Yusuf Nur</span>
                                <span className="block text-base text-violet-600">IT Consultant, Australia</span>
                            </cite>
                        </div>
                    </div>

                    {/* Video Placeholder */}
                    <div className="relative w-full max-w-lg lg:w-1/2">
                        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-200 shadow-xl hover:shadow-2xl transition-shadow">

                            <img
                                src="/customer-testimonial-video.jpg"
                                alt="Testimonial video placeholder"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                className="group flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-600 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
                                aria-label="Play testimonial video"
                            >
                                <svg
                                    className="ml-1 h-12 w-12 text-white group-hover:scale-110 transition-transform"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8 5.14v13.72L19.25 12 8 5.14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * SupportSection Component
 * Renders the 24/7 support banner
 */
const SupportSection = () => {
    return (
        <section className="w-full bg-white py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-violet-600 via-violet-600 to-pink-600 p-8 md:flex-row md:p-12 shadow-xl hover:shadow-2xl transition-shadow">
                    {/* Text and Buttons */}
                    <div className="mb-0 text-center md:text-left flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                            Can&apos;t find your desired service? Let us know 24/7
                        </h3>

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row">

                            {/* Request a service → Go to service page */}
                            <a
                                href="/services"
                                className="rounded-xl bg-white px-6 py-3 text-base font-semibold text-violet-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none text-center"
                            >
                                Request a service
                            </a>

                            {/* Call button → tel:16516 */}
                            <a
                                href="tel:16516"
                                className="flex items-center justify-center rounded-xl border-2 border-white bg-transparent px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 focus:outline-none"
                            >
                                <svg
                                    className="mr-2 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                16516
                            </a>

                        </div>
                    </div>


                    {/* Support Agent Image Placeholder */}
                    <div className="w-full max-w-xs md:w-1/3">
                        <img
                            src="/customer-support-representative.jpg"
                            alt="Support agent"
                            className="h-auto w-full rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * Main Support Component
 * Wraps the Testimonial and Support sections.
 */
export default function Support() {
    return (
        <div className="flex w-full flex-col items-center">
            <TestimonialSection />
            <SupportSection />
        </div>
    );
}
