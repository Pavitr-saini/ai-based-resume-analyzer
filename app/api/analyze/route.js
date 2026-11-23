import { NextResponse } from "next/server";

export const config = { api: { bodyParser: false } };

export async function POST(request) {
    try {
        const formData = await request.formData();
        const resumeFile = formData.get("resume");
        const jobDescription = formData.get("jobDescription");

        if (!resumeFile) {
            return NextResponse.json(
                { success: false, error: "Please upload your resume file (PDF or DOCX)." },
                { status: 400 }
            );
        }

        if (!jobDescription || !jobDescription.toString().trim()) {
            return NextResponse.json(
                { success: false, error: "Please enter a target job description." },
                { status: 400 }
            );
        }

        // Forward to Python backend at http://127.0.0.1:5000/api/analyze
        const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || "http://127.0.0.1:5000/api/analyze";

        const pythonFormData = new FormData();
        pythonFormData.append("resume", resumeFile);
        pythonFormData.append("jobDescription", jobDescription);

        let pythonRes;
        try {
            pythonRes = await fetch(pythonBackendUrl, {
                method: "POST",
                body: pythonFormData,
            });
        } catch (connErr) {
            console.error("Failed to connect to Python backend:", connErr);
            return NextResponse.json(
                {
                    success: false,
                    error: "Unable to reach the Python ATS backend on http://127.0.0.1:5000. Please ensure the Python server is running (run 'python app.py')."
                },
                { status: 503 }
            );
        }

        const data = await pythonRes.json();
        return NextResponse.json(data, { status: pythonRes.status });
    } catch (err) {
        console.error("Next.js /api/analyze error:", err);
        return NextResponse.json(
            { success: false, error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
