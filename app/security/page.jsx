import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, Server, Cpu, CheckCircle2, Zap } from "lucide-react";

export const metadata = {
    title: "Security Standards | ResumeAI ATS Optimizer",
    description: "Learn how ResumeAI safeguards your resume data with in-memory analysis, encryption in transit, and automatic memory purging.",
};

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-[#050816] text-white">
            {/* Header */}
            <div className="border-b border-white/10 bg-[#080e20] py-16 px-6 lg:px-10 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Enterprise-Grade Security Architecture</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        Security Standards &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            Data Protection
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        Built from the ground up with zero-retention principles to safeguard sensitive candidate credentials.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
                {/* 4 Security Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-7 rounded-2xl border border-white/10 bg-[#0c1325] space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Server className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Volatile In-Memory Processing</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Uploaded resume documents (.pdf, .docx) are converted into memory buffers directly on server request and immediately cleared after ATS tokenization. Zero files are ever written to hard drives or object buckets.
                        </p>
                    </div>

                    <div className="p-7 rounded-2xl border border-white/10 bg-[#0c1325] space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white">End-to-End Transport Encryption</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            All communications and file uploads are secured using TLS 1.3 / SSL encryption with modern cipher suites. Man-in-the-middle inspection or eavesdropping is mathematically infeasible.
                        </p>
                    </div>

                    <div className="p-7 rounded-2xl border border-white/10 bg-[#0c1325] space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Isolated Execution Sandboxes</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Parsing libraries (`pdf-parse` & `mammoth`) execute in sandboxed route handlers with strict execution timeouts, preventing arbitrary code execution and malicious document exploitation.
                        </p>
                    </div>

                    <div className="p-7 rounded-2xl border border-white/10 bg-[#0c1325] space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Strict Zero-Training Covenant</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Your resume contents, phone numbers, emails, and job experiences are never fed to OpenAI, Google, Anthropic, or any foundational model training pipelines. Your data remains strictly yours.
                        </p>
                    </div>
                </div>

                {/* Security Verification Checklist */}
                <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        Security Verification Checklist
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>No persistent resume file storage</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>Strict 5 MB document upload threshold</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>Sanitized JSON response sanitization</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>Cross-Site Scripting (XSS) protections</span>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-400">
                        Report a security vulnerability: <span className="text-emerald-400">security@resumeai.dev</span>
                    </p>
                    <Link
                        href="/analyze"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow hover:scale-105 transition"
                    >
                        <span>Analyze Resume With Security</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
