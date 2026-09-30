from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get(f"{settings.API_V1_STR}/health", tags=["health"])
def health_check():
    """
    Health check endpoint to ensure the backend API is up and running.
    """
    return {"status": "ok", "message": "Backend API is running"}

import os
import re
from fastapi import UploadFile, File, HTTPException, status

ALLOWED_MIME_TYPES = [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def secure_filename(filename: str) -> str:
    """Removes unsafe characters from a filename."""
    filename = re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)
    return filename.strip('_')

@app.post(f"{settings.API_V1_STR}/scan", tags=["scan"])
async def scan_document(file: UploadFile = File(...)):
    """
    Upload a document for scanning.
    Validates file type, size, and filename.
    """
    # Validate filename
    filename = secure_filename(file.filename or "unnamed_file")
    if not filename:
        raise HTTPException(status_code=400, detail="Invalid filename")

    # Validate file type
    if file.content_type not in ALLOWED_MIME_TYPES:
        if not filename.endswith('.docx'):
            raise HTTPException(
                status_code=415,
                detail="Unsupported file type. Allowed types: PNG, JPG, PDF, DOCX."
            )

    # Validate file size (read into memory to check size, then reset pointer)
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File too large. Maximum size is 10MB."
        )
    
    # In a real app we'd save this securely to a temp dir for processing.
    # For now, we return a successful mock response.
    
    return {
        "status": "success",
        "filename": filename,
        "size": len(file_bytes),
        "content_type": file.content_type,
        "message": "File uploaded and validated successfully. Ready for AI processing."
    }

# Mock Database for Scan History
from typing import Dict, Any
from datetime import datetime
import uuid

MOCK_HISTORY_DB: Dict[str, Any] = {
    "sample-id-1": {
        "id": "sample-id-1",
        "filename": "tax_return_2025.pdf",
        "date": datetime.utcnow().isoformat(),
        "risk": "HIGH",
        "detections": 14,
        "protected_status": True
    },
    "sample-id-2": {
        "id": "sample-id-2",
        "filename": "meeting_notes.docx",
        "date": datetime.utcnow().isoformat(),
        "risk": "LOW",
        "detections": 2,
        "protected_status": False
    }
}

@app.get(f"{settings.API_V1_STR}/history", tags=["history"])
def get_scan_history():
    """
    Retrieve all past scan history records.
    """
    # Return as a list sorted by date descending (mock logic)
    history_list = list(MOCK_HISTORY_DB.values())
    history_list.sort(key=lambda x: x["date"], reverse=True)
    return {"status": "success", "data": history_list}

@app.get(f"{settings.API_V1_STR}/scan/{{scan_id}}", tags=["history"])
def get_scan_details(scan_id: str):
    """
    Retrieve details for a specific scan.
    """
    record = MOCK_HISTORY_DB.get(scan_id)
    if not record:
        raise HTTPException(status_code=404, detail="Scan record not found")
    return {"status": "success", "data": record}

@app.delete(f"{settings.API_V1_STR}/history/{{scan_id}}", tags=["history"])
def delete_scan_history(scan_id: str):
    """
    Delete a specific scan record from history.
    """
    if scan_id not in MOCK_HISTORY_DB:
        raise HTTPException(status_code=404, detail="Scan record not found")
    
    del MOCK_HISTORY_DB[scan_id]
    return {"status": "success", "message": f"Scan {scan_id} deleted successfully."}

