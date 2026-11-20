"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    Zap,
    Sparkles,
    Heart,
    ArrowUp,
    ArrowRight,
    CheckCircle2,
    Mail,
    Activity
} from "lucide-react";

export default function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [newsletterError, setNewsletterError] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!newsletterEmail || !newsletterEmail.includes("@")) {
            setNewsletterError("Please enter a valid email address.");
            return;
        }
        setNewsletterError("");
        setSubscribed(true);
        setNewsletterEmail("");
    };

    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Analyze Resume", href: "/analyze" },
        { name: "ATS Screening", href: "/analyze" },
        { name: "Member Login", href: "/login" },
    ];

    const tools = [
        { name: "ATS Score Checker", href: "/analyze" },
        { name: "Keyword Gap Detector", href: "/analyze" },
        { name: "Role Match Score", href: "/analyze" },
        { name: "AI Recommendations", href: "/analyze" },
        { name: "ATS System Guide", href: "/guide" },
    ];

    const transparency = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Security Standards", href: "/security" },
        { name: "ATS System Guide", href: "/guide" },
    ];

    return (
        <footer className="w-full bg-[#030617] text-white mt-auto border-t border-white/10">

            {/* Security & System Status Bar */}
            <div className="border-b border-white/10 bg-[#080e20]">
                <div className="max-w-[1530px] mx-auto px-6 lg:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">

                    <Link
                        href="/security"
                        className="flex items-center gap-3 text-slate-300 hover:text-white transition group"
                    >
                        <ShieldCheck
                            size={18}
                            className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform"
                        />
                        <span>
                            100% Confidential & Secure • No resumes stored permanently
                        </span>
                    </Link>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {/* Live Available Status Indicator */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>AI ATS Engines Available</span>
                        </div>

                        <Link
                            href="/features"
                            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
                        >
                            <Zap
                                size={18}
                                className="text-yellow-400 shrink-0"
                            />
                            <span>
                                Powered by Advanced AI & ATS Algorithms
                            </span>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-[1530px] mx-auto px-6 lg:px-10 pt-16 pb-10">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

                    {/* Brand Section & CTA Button */}
                    <div className="lg:col-span-2 space-y-6">

                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
                                <Sparkles size={25} className="text-white" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-extrabold tracking-tight leading-none">
                                    Resume<span className="text-purple-400">AI</span>
                                </h2>
                                <p className="text-[10px] font-bold tracking-[1.5px] text-indigo-400 mt-1">
                                    ATS OPTIMIZER
                                </p>
                            </div>
                        </Link>

                        <p className="text-slate-400 text-sm sm:text-base leading-7 max-w-[420px]">
                            Supercharge your career with AI-driven ATS resume
                            optimization. We decode corporate screening filters
                            so your talent gets the recognition it deserves.
                        </p>

                        {/* Available Action Button in Footer */}
                        <div className="pt-1">
                            <Link
                                href="/analyze"
                                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <Sparkles size={16} />
                                <span>Analyze Resume Free</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Social Links */}
                        <div>
                            <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
                                Connect With Us
                            </span>
                            <div className="flex items-center gap-3">

                                {/* GitHub */}
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Repository"
                                    className="w-10 h-10 rounded-xl bg-[#101a30] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="19"
                                        height="19"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0 0 12 .5Z" />
                                    </svg>
                                </a>

                                {/* Twitter / X */}
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter / X"
                                    className="w-10 h-10 rounded-xl bg-[#101a30] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300"
                                >
                                    <span className="text-lg font-bold">𝕏</span>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="w-10 h-10 rounded-xl bg-[#101a30] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300"
                                >
                                    <span className="text-base font-bold">in</span>
                                </a>

                            </div>
                        </div>

                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-5">
                            Navigation
                        </h3>

                        <ul className="space-y-3.5">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm block"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools & Insights Links */}
                    <div>
                        <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-5">
                            Tools & Insights
                        </h3>

                        <ul className="space-y-3.5">
                            {tools.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm block"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Transparency & Newsletter Column */}
                    <div>
                        <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-5">
                            Transparency
                        </h3>

                        <ul className="space-y-3.5 mb-8">
                            {transparency.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm block"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Interactive Newsletter / Tips Available Button */}
                        <div className="pt-2">
                            <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                                ATS Insights Newsletter
                            </span>

                            {subscribed ? (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                    <span>Subscribed! Check your inbox for updates.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="space-y-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                            <Mail size={14} />
                                        </div>
                                        <input
                                            type="email"
                                            value={newsletterEmail}
                                            onChange={(e) => {
                                                setNewsletterEmail(e.target.value);
                                                setNewsletterError("");
                                            }}
                                            placeholder="Enter your email..."
                                            className="w-full bg-[#080e20] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                                        />
                                    </div>

                                    {newsletterError && (
                                        <p className="text-[11px] text-rose-400">{newsletterError}</p>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition cursor-pointer"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>

                </div>

                {/* Bottom Bar With Working Back To Top Button */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">

                    <p>
                        © 2026 ResumeAI. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-center">
                        Designed for job seekers worldwide with
                        <Heart
                            size={16}
                            className="fill-pink-500 text-pink-500 shrink-0"
                        />
                    </p>

                    {/* Interactive Back to Top Button */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#101a30] border border-white/10 hover:border-purple-500/50 hover:bg-purple-600/20 hover:text-white text-slate-300 transition-all text-xs font-semibold group cursor-pointer"
                    >
                        <span>Back to top</span>
                        <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                </div>

            </div>
        </footer>
    );
}
