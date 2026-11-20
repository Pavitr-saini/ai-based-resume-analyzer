"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Analyze Resume", href: "/analyze" },
    ];

    return (
        <nav className="w-full bg-[#050816] border-b border-white/10 text-white sticky top-0 z-50 backdrop-blur-lg bg-[#050816]/90">

            <div className="max-w-[1530px] mx-auto px-6 lg:px-10">

                <div className="h-[90px] sm:h-[100px] flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">

                        <div className="w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                            <Sparkles size={26} className="text-white" />
                        </div>

                        <div>
                            <h1 className="text-[24px] sm:text-[27px] font-extrabold tracking-tight leading-none">
                                Resume<span className="text-purple-400">AI</span>
                            </h1>

                            <p className="text-[10px] sm:text-[11px] font-bold tracking-[1.5px] text-indigo-400 mt-1">
                                ATS OPTIMIZER
                            </p>
                        </div>

                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 p-2 rounded-full bg-[#0c1325] border border-white/10 shadow-inner">

                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-5 py-2.5 sm:py-3 rounded-full text-[15px] sm:text-[16px] font-semibold transition-all duration-300 ${
                                        isActive
                                            ? "bg-indigo-950 text-indigo-300 border border-indigo-700/80 shadow-md shadow-indigo-950/50"
                                            : "text-slate-300 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                    </div>

                    {/* Login Button */}
                    <Link
                        href="/login"
                        className={`hidden md:flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-bold text-[15px] sm:text-[16px] transition-all duration-300 hover:scale-105 ${
                            pathname === "/login"
                                ? "bg-indigo-700 text-white shadow-lg shadow-indigo-600/40 ring-2 ring-indigo-400"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-600/20"
                        }`}
                    >
                        Login
                        <ArrowRight size={18} />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>

                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="md:hidden pb-6 flex flex-col gap-2 pt-2 border-t border-white/5 animate-[fadeIn_0.2s_ease-in-out]">

                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-5 py-3 rounded-xl transition-all ${
                                        isActive
                                            ? "bg-indigo-950 text-indigo-300 border border-indigo-700/80 font-semibold"
                                            : "text-slate-300 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white shadow-lg"
                        >
                            Login
                            <ArrowRight size={18} />
                        </Link>

                    </div>
                )}

            </div>
        </nav>
    );
}
