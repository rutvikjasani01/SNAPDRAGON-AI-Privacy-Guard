"""
Test Data Generator for Snapdragon AI Privacy Guard
Requirements: pip install Pillow reportlab

Generates synthetic images and PDFs containing obvious fake PII
(Personally Identifiable Information) to safely test the redaction pipelines.
"""

import os
from PIL import Image, ImageDraw, ImageFont

try:
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False

# Ensure output directory exists
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "test_files")
os.makedirs(OUTPUT_DIR, exist_ok=True)

FAKE_DATA = [
    "CONFIDENTIAL EMPLOYEE RECORD",
    "Name: John Doe",
    "SSN: 000-00-0000",
    "Phone: 555-0199",
    "Credit Card: 4000 0000 0000 0000",
    "Email: john.doe@example.com",
    "Address: 123 Fake Street, Nowhere, XX 12345"
]

def generate_test_image():
    """Generates a PNG image containing fake PII."""
    width, height = 800, 600
    image = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(image)
    
    # Try to load a default font
    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except IOError:
        font = ImageFont.load_default()

    y_text = 50
    for line in FAKE_DATA:
        # draw.text bounding box logic simplified for default font
        draw.text((50, y_text), line, font=font, fill='black')
        y_text += 40

    out_path = os.path.join(OUTPUT_DIR, "test_pii_document.png")
    image.save(out_path)
    print(f"Generated test image: {out_path}")

def generate_test_pdf():
    """Generates a PDF document containing fake PII."""
    if not REPORTLAB_AVAILABLE:
        print("Skipping PDF generation: reportlab not installed.")
        return

    out_path = os.path.join(OUTPUT_DIR, "test_pii_document.pdf")
    c = canvas.Canvas(out_path, pagesize=letter)
    
    c.setFont("Helvetica", 14)
    y_text = 700
    
    for line in FAKE_DATA:
        c.drawString(50, y_text, line)
        y_text -= 30
        
    c.save()
    print(f"Generated test PDF: {out_path}")

if __name__ == "__main__":
    print("Generating synthetic test data...")
    generate_test_image()
    generate_test_pdf()
    print("Done.")
