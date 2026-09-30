from typing import List, Dict, Any, Optional

class OCRResult:
    """
    Represents the result of an OCR extraction for a specific piece of text.
    """
    def __init__(self, text: str, page: int, bounding_box: Optional[Dict[str, float]] = None, confidence: Optional[float] = None):
        self.text = text
        self.page = page
        self.bounding_box = bounding_box
        self.confidence = confidence

    def to_dict(self) -> Dict[str, Any]:
        return {
            "text": self.text,
            "page": self.page,
            "bounding_box": self.bounding_box,
            "confidence": self.confidence
        }

class OCRProcessor:
    """
    Modular OCR Processor.
    Designed to be extensible for on-device processing (e.g. Snapdragon NPU or local Tesseract).
    """
    def __init__(self):
        # Initialize any models or configs here
        # This will be replaced/augmented with Qualcomm AI Hub models or other local implementations
        self.is_ready = True

    def process_image(self, image_bytes: bytes, page_num: int = 1) -> List[OCRResult]:
        """
        Extract text from a single image.
        Returns a list of OCRResult objects.
        """
        # TODO: Implement actual OCR logic here
        # For now, return a mock result
        
        # Example mock output
        mock_text = "This is a sample text containing a mock phone number: 555-0199 and an email: test@example.com."
        mock_bbox = {"x": 10.0, "y": 20.0, "width": 200.0, "height": 15.0}
        mock_confidence = 0.98
        
        result = OCRResult(
            text=mock_text,
            page=page_num,
            bounding_box=mock_bbox,
            confidence=mock_confidence
        )
        return [result]

    def process_document(self, document_bytes: bytes, filename: str) -> List[OCRResult]:
        """
        Process a document (which could be an image or a PDF).
        """
        # In a complete implementation, this would handle PDF parsing,
        # converting pages to images, and running process_image on each.
        return self.process_image(document_bytes)

def extract_text(file_bytes: bytes, filename: str) -> List[Dict[str, Any]]:
    """
    Entry point for the OCR pipeline.
    """
    processor = OCRProcessor()
    results = processor.process_document(file_bytes, filename)
    return [r.to_dict() for r in results]
