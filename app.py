"""
ResumeAI - ATS Resume Analyzer & Optimizer Python Backend
Serves /api/analyze and /api/subscribe for the Next.js frontend.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from ats_analyzer import analyze_resume_ats, extract_text_from_file

app = Flask(__name__)
# Enable CORS for Next.js frontend running on port 3000
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# 5 MB max content length
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'resumeai-ats-secret-key-2026')


@app.route('/')
def home():
    """Health / API status endpoint."""
    return jsonify({
        "status": "online",
        "service": "ResumeAI Python ATS Backend Engine",
        "endpoints": {
            "analyze": "/api/analyze [POST]",
            "subscribe": "/api/subscribe [POST]"
        }
    })


@app.route('/health')
def health():
    return jsonify({"status": "healthy"}), 200


@app.route('/api/analyze', methods=['POST'])
def api_analyze():
    """
    POST /api/analyze
    Accepts multipart/form-data:
      - resume: File (PDF, DOCX, TXT)
      - jobDescription: text string
    Returns structured JSON with full ATS analysis.
    """
    try:
        # 1. Validation
        if 'resume' not in request.files:
            return jsonify({
                "success": False,
                "error": "Please upload your resume file (PDF or DOCX)."
            }), 400

        resume_file = request.files['resume']
        if resume_file.filename == '':
            return jsonify({
                "success": False,
                "error": "Please select a resume file to upload."
            }), 400

        job_description = request.form.get('jobDescription', '').strip()
        if not job_description:
            return jsonify({
                "success": False,
                "error": "Please enter a target job description."
            }), 400

        # Read file buffer in memory
        file_bytes = resume_file.read()
        file_size = len(file_bytes)

        if file_size > 5 * 1024 * 1024:
            return jsonify({
                "success": False,
                "error": "Resume file size exceeds the 5 MB limit."
            }), 400

        # 2. Extract text from file buffer
        try:
            resume_text = extract_text_from_file(
                file_bytes=file_bytes,
                filename=resume_file.filename,
                content_type=resume_file.content_type or ""
            )
        except Exception as extract_err:
            print("Text extraction error:", extract_err)
            return jsonify({
                "success": False,
                "error": "Could not parse text from this resume file. Please ensure it is an uncorrupted PDF or DOCX file."
            }), 422

        if not resume_text or len(resume_text.strip()) < 30:
            return jsonify({
                "success": False,
                "error": "The resume file appears empty or contains only scanned images without selectable text. Please upload a text-based PDF or DOCX."
            }), 422

        # 3. Perform ATS analysis
        analysis = analyze_resume_ats(resume_text, job_description)

        file_size_mb = f"{file_size / (1024 * 1024):.2f}"

        return jsonify({
            "success": True,
            "data": {
                "fileName": resume_file.filename,
                "fileSizeMB": file_size_mb,
                **analysis
            }
        })

    except Exception as err:
        print("Analysis API Error:", err)
        return jsonify({
            "success": False,
            "error": str(err) or "An unexpected error occurred while analyzing the resume. Please try again."
        }), 500


@app.route('/api/subscribe', methods=['POST'])
def api_subscribe():
    """Newsletter subscription endpoint."""
    data = request.get_json(silent=True) or request.form
    email = data.get('email', '').strip()
    if not email or '@' not in email:
        return jsonify({
            "success": False,
            "error": "Please enter a valid email address."
        }), 400

    return jsonify({
        "success": True,
        "message": "Subscribed! Check your inbox for updates."
    })


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file exceeding max content length."""
    return jsonify({
        "success": False,
        "error": "File too large (413): The resume file exceeds the 5 MB server payload limit."
    }), 413


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    print(f"🚀 ResumeAI Python Backend running on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=debug)
