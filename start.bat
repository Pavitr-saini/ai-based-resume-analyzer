@echo off
title ResumeAI - Starting Next.js + Python ATS Optimizer
echo ===============================================================
echo   Starting ResumeAI - Next.js + Tailwind CSS + Python Backend
echo ===============================================================
echo.
echo 1. Launching Python ATS Intelligence Backend on port 5000...
start "Python ATS Backend (Port 5000)" cmd /k "python app.py"

echo 2. Launching Next.js Frontend on port 3000...
echo.
echo Frontend will be available at: http://localhost:3000
echo Python Backend is available at: http://localhost:5000
echo.
npm run dev
