import Link from "next/link";
import { Scale, ArrowRight, CheckCircle2, AlertCircle, FileText, Sparkles } from "lucide-react";

export const metadata = {
    title: "Terms of Service | ResumeAI ATS Optimizer",
    description: "Terms and conditions governing the use of the ResumeAI ATS Resume Analyzer platform.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#050816] text-white">
            {/* Header */}
            <div className="border-b border-white/10 bg-[#080e20] py-16 px-6 lg:px-10 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs font-semibold">
                        <Scale className="w-4 h-4" />
                        <span>Legal Agreements & Usage Guidelines</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        Terms of{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Service
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        Effective Date: November 2026. Please read these terms carefully before utilizing our ATS analysis tools.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
                {/* 1. Acceptance */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        By accessing or using ResumeAI (including all associated websites, APIs, and document diagnostics), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please discontinue using the service immediately.
                    </p>
                </section>

                {/* 2. Permitted Use */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        2. Permitted Use of ATS Analysis Tools
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        ResumeAI is provided exclusively for personal career advancement, resume preparation, and candidate skill alignment. You agree not to:
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 pl-4 list-disc list-inside">
                        <li>Upload malicious scripts, corrupted executables, or files larger than 5 MB.</li>
                        <li>Automate scraping or batch denial-of-service queries against our analysis endpoints.</li>
                        <li>Attempt to reverse-engineer our proprietary keyword tokenization dictionaries and scoring weights.</li>
                    </ul>
                </section>

                {/* 3. Disclaimers */}
                <section className="p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-amber-400" />
                        <h2 className="text-xl font-bold text-white">3. Informational & Diagnostic Disclaimer</h2>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        ResumeAI calculates ATS compatibility scores and skill gap predictions using modern heuristic models. While our suggestions are engineered to optimize your pass rates against corporate filters, ResumeAI makes <strong className="text-amber-400">no guarantee of job interviews, callbacks, or employment offers</strong>. Final hiring decisions rest entirely with prospective employers.
                    </p>
                </section>

                {/* 4. Intellectual Property */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        4. Intellectual Property
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        You retain full ownership and copyright of all resume documents and content you upload. All software, algorithms, designs, brand marks, and user interfaces of ResumeAI remain the exclusive property of ResumeAI.
                    </p>
                </section>

                {/* 5. Limitation of Liability */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Scale className="w-5 h-5 text-emerald-400" />
                        5. Limitation of Liability
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        To the maximum extent permitted by applicable law, ResumeAI and its contributors shall not be held liable for any indirect, incidental, consequential, or punitive damages resulting from the use of or inability to use this platform.
                    </p>
                </section>

                {/* Bottom CTA */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-400">
                        Have legal inquiries? Reach out to <span className="text-indigo-400">legal@resumeai.dev</span>
                    </p>
                    <Link
                        href="/analyze"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow hover:scale-105 transition"
                    >
                        <span>Start ATS Optimization</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
