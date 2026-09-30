import re
from typing import List, Dict, Any

class DetectedEntity:
    def __init__(self, entity_type: str, text: str, confidence: float, location: Dict[str, float] = None, page: int = 1):
        self.type = entity_type
        self.text = text
        self.confidence = confidence
        self.location = location or {}
        self.page = page

    def to_dict(self) -> Dict[str, Any]:
        return {
            "type": self.type,
            "text": self.text,
            "confidence": self.confidence,
            "location": self.location,
            "page": self.page
        }

    def to_safe_log_dict(self) -> Dict[str, Any]:
        """
        Returns a dict suitable for logging without exposing the raw sensitive text.
        """
        return {
            "type": self.type,
            "confidence": self.confidence,
            "location": self.location,
            "page": self.page,
            # Mask the text, keeping only length or partial info if necessary.
            "masked_value_length": len(self.text) if self.text else 0
        }
        
    def __str__(self):
        return f"DetectedEntity(type='{self.type}', confidence={self.confidence:.2f}, page={self.page})"

class EntityDetector:
    """
    Detects sensitive personal, financial, and security information.
    Uses a combination of deterministic validation (regex) and NLP (mocked for now).
    """
    
    def __init__(self):
        # Deterministic Patterns
        self.patterns = {
            "Personal": {
                "email": r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
                "phone": r'(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}',
                "date_of_birth": r'\b(0[1-9]|1[0-2])[./-](0[1-9]|[12][0-9]|3[01])[./-](19|20)\d\d\b', # MM/DD/YYYY
            },
            "Identification": {
                "passport": r'\b[A-Z]{1}[0-9]{7}\b', # basic example
                "government_id": r'\b\d{3}-\d{2}-\d{4}\b', # SSN example
            },
            "Financial": {
                "card_information": r'\b(?:\d[ -]*?){13,16}\b',
                "upi": r'[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}',
                "ifsc": r'^[A-Z]{4}0[A-Z0-9]{6}$'
            },
            "Security": {
                "api_keys": r'(?i)(api[_-]?key|secret|token)[\s:=]+[\'"]?([a-zA-Z0-9\-_]{16,})[\'"]?',
            }
        }
        
    def detect_entities(self, text: str, page: int = 1, bounding_box: Dict[str, float] = None) -> List[DetectedEntity]:
        entities = []
        
        # 1. Deterministic Detection (Regex)
        for category, rules in self.patterns.items():
            for entity_type, pattern in rules.items():
                for match in re.finditer(pattern, text):
                    matched_text = match.group(0)
                    if entity_type == "api_keys" and len(match.groups()) > 1:
                        matched_text = match.group(2) # extract the actual key part
                        
                    entities.append(DetectedEntity(
                        entity_type=entity_type,
                        text=matched_text,
                        confidence=0.95, # High confidence for deterministic matches
                        location=bounding_box, # Inherited from OCR text block
                        page=page
                    ))

        # 2. NLP/AI Detection (Mocked for advanced context-based entities)
        # In the future, this integrates with Qualcomm AI Hub models or Spacy/Transformers
        # to detect entities like names, addresses, or contextual IDs that regex misses.
        mock_nlp_results = self._run_nlp_inference(text, page, bounding_box)
        entities.extend(mock_nlp_results)
        
        return entities

    def _run_nlp_inference(self, text: str, page: int, bounding_box: Dict[str, float] = None) -> List[DetectedEntity]:
        """
        Placeholder for on-device AI NLP inference.
        """
        results = []
        if "Main Street" in text or "Avenue" in text:
            results.append(DetectedEntity(
                entity_type="address",
                text="123 Main Street", # simplified mock
                confidence=0.85,
                location=bounding_box,
                page=page
            ))
        return results

def analyze_text(text: str, page: int = 1, bounding_box: Dict[str, float] = None) -> List[Dict[str, Any]]:
    detector = EntityDetector()
    entities = detector.detect_entities(text, page, bounding_box)
    return [e.to_dict() for e in entities]
