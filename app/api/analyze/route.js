import { NextResponse } from "next/server";
import { extractTextFromBuffer, analyzeResumeATS } from "@/lib/atsAnalyzer";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get("resume");
    const jobDescription = formData.get("jobDescription");

    // 1. Validation
    if (!resumeFile || typeof resumeFile === "string") {
      return NextResponse.json(
        { success: false, error: "Please upload your resume file (PDF or DOCX)." },
        { status: 400 }
      );
    }

    if (!jobDescription || !jobDescription.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a target job description." },
        { status: 400 }
      );
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Resume file size exceeds the 5 MB limit." },
        { status: 400 }
      );
    }

    // 2. Extract text from file buffer
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let resumeText = "";
    try {
      resumeText = await extractTextFromBuffer(
        buffer,
        resumeFile.type,
        resumeFile.name
      );
    } catch (extractError) {
      console.error("Text extraction failed:", extractError);
      return NextResponse.json(
        {
          success: false,
          error:
            "Could not parse text from this resume file. Please ensure it is an uncorrupted PDF or DOCX file.",
        },
        { status: 422 }
      );
    }

    if (!resumeText || resumeText.length < 30) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The resume file appears empty or contains only scanned images without selectable text. Please upload a text-based PDF or DOCX.",
        },
        { status: 422 }
      );
    }

    // 3. Perform ATS analysis
    const analysis = analyzeResumeATS(resumeText, jobDescription);

    return NextResponse.json({
      success: true,
      data: {
        fileName: resumeFile.name,
        fileSizeMB: (resumeFile.size / (1024 * 1024)).toFixed(2),
        ...analysis,
      },
    });
  } catch (error) {
    console.error("Analysis API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "An unexpected error occurred while analyzing the resume. Please try again.",
      },
      { status: 500 }
    );
  }
}
