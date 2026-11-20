"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Lock, Mail, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            setIsLoggedIn(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">

                {/* Logo Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Sparkles size={24} className="text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-black tracking-tight leading-none">
                                Resume<span className="text-purple-400">AI</span>
                            </h1>
                            <p className="text-[10px] font-bold tracking-[1.5px] text-indigo-400 mt-0.5">
                                ATS OPTIMIZER
                            </p>
                        </div>
                    </Link>

                    <h2 className="text-2xl font-bold mt-6 text-white">Welcome Back</h2>
                    <p className="text-sm text-slate-400 mt-1">Sign in to save and track your resume scores</p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                    {isLoggedIn ? (
                        <div className="text-center py-6 space-y-4">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Signed In Successfully</h3>
                            <p className="text-sm text-slate-400">Welcome, {email}!</p>
                            <Link
                                href="/analyze"
                                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                            >
                                <span>Go to Resume Analyzer</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full bg-[#080e20] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Password
                                    </label>
                                    <span className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer">
                                        Forgot?
                                    </span>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#080e20] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99] transition"
                            >
                                Sign In
                            </button>

                            <div className="relative my-6 text-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-800" />
                                </div>
                                <span className="relative bg-[#0c1325] px-3 text-xs text-slate-500 uppercase">
                                    or continue with
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setEmail("google-user@demo.com"); setIsLoggedIn(true); }}
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-700 bg-[#080e20] text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition"
                                >
                                    <span>Google</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setEmail("github-user@demo.com"); setIsLoggedIn(true); }}
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-700 bg-[#080e20] text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition"
                                >
                                    <span>GitHub</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <p className="text-center text-xs text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <span className="text-indigo-400 font-semibold cursor-pointer">
                        Sign up for free
                    </span>
                </p>
            </div>
        </div>
    );
}
