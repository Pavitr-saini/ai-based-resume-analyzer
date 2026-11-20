import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, Eye, Database, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | ResumeAI ATS Optimizer",
    description: "Learn how ResumeAI protects your privacy with zero permanent resume data storage and strict in-memory processing.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#050816] text-white">
            {/* Header */}
            <div className="border-b border-white/10 bg-[#080e20] py-16 px-6 lg:px-10 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Data Protection & Privacy Policy</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        Your Privacy is Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Highest Priority
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        Last Updated: November 2026. We believe your career data belongs strictly to you.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
                {/* 1. Core Commitment */}
                <section className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <Lock className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-xl font-bold text-white">Our 100% Confidentiality Guarantee</h2>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        ResumeAI does <strong className="text-emerald-400">not</strong> permanently store, sell, or archive your uploaded resumes. When you submit a resume for ATS analysis, your document is parsed directly in volatile server memory (RAM), analyzed against your target job description, and instantly released.
                    </p>
                </section>

                {/* 2. What Data We Process */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FileCheck className="w-5 h-5 text-indigo-400" />
                        1. Data We Process
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We only process information that you voluntarily provide to generate ATS diagnostic reports:
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 pl-4 list-disc list-inside">
                        <li><strong>Resume Documents:</strong> PDF, Word (.docx), or plain text files uploaded for parsing.</li>
                        <li><strong>Job Descriptions:</strong> Role requirements pasted for keyword overlap analysis.</li>
                        <li><strong>Account Details:</strong> Email addresses optionally submitted for sign-in or ATS insight newsletters.</li>
                    </ul>
                </section>

                {/* 3. Zero Model Training */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Eye className="w-5 h-5 text-blue-400" />
                        2. No Public AI Model Training
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Your resumes, contact details, work history, and job applications are <strong className="text-white">never</strong> used to train public language models or sold to third-party recruiters and data brokers.
                    </p>
                </section>

                {/* 4. Data Security */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Database className="w-5 h-5 text-purple-400" />
                        3. Transmission Security & Encryption
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        All data transmitted to and from ResumeAI is protected using industry-standard TLS 1.3 encryption in transit. Our backend endpoints enforce strict file-size constraints (5 MB max) and rigorous input sanitization to eliminate code injection risks.
                    </p>
                </section>

                {/* 5. User Rights */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        4. Your Rights (GDPR & CCPA Compliant)
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        You have the right to request deletion of your account and any associated preference data at any time. Because resumes are processed ephemerally, there is no persistent file archive to purge.
                    </p>
                </section>

                {/* Contact & CTA */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-400">
                        Questions about our privacy practices? Contact us at <span className="text-indigo-400">privacy@resumeai.dev</span>
                    </p>
                    <Link
                        href="/analyze"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow hover:scale-105 transition"
                    >
                        <span>Analyze Resume Safely</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
