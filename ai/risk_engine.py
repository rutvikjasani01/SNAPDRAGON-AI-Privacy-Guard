from enum import Enum
from typing import List, Dict, Any
from .entity_detector import DetectedEntity

class RiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class RiskEngine:
    """
    Evaluates the overall privacy risk of a document based on the types and combinations
    of sensitive information detected. 
    Uses transparent classification logic rather than arbitrary scores.
    """
    def __init__(self):
        # Base risk mappings for individual entity types
        self.base_risk_mapping = {
            "api_keys": RiskLevel.CRITICAL,
            "passwords": RiskLevel.CRITICAL,
            "card_information": RiskLevel.HIGH,
            "passport": RiskLevel.HIGH,
            "government_id": RiskLevel.HIGH,
            "bank_account": RiskLevel.HIGH,
            "date_of_birth": RiskLevel.MEDIUM,
            "email": RiskLevel.LOW,
            "phone": RiskLevel.LOW,
            "address": RiskLevel.LOW,
            "student_id": RiskLevel.LOW,
            "employee_id": RiskLevel.MEDIUM,
            "upi": RiskLevel.MEDIUM,
            "ifsc": RiskLevel.LOW
        }

    def assess_entity_risk(self, entity: DetectedEntity) -> RiskLevel:
        """
        Assess risk for a single detected entity.
        """
        return self.base_risk_mapping.get(entity.type, RiskLevel.LOW)

    def assess_document_risk(self, entities: List[DetectedEntity]) -> Dict[str, Any]:
        """
        Assess the aggregate risk for an entire document based on the collection of entities.
        """
        if not entities:
            return {
                "overall_risk": "NONE",
                "total_detected": 0,
                "critical_count": 0,
                "high_count": 0,
                "medium_count": 0,
                "low_count": 0,
                "explanation": "No sensitive entities detected."
            }

        counts = {
            RiskLevel.CRITICAL: 0,
            RiskLevel.HIGH: 0,
            RiskLevel.MEDIUM: 0,
            RiskLevel.LOW: 0
        }

        # Analyze base risks
        for entity in entities:
            risk = self.assess_entity_risk(entity)
            counts[risk] += 1

        # Determine overall document risk level based on the highest present severity
        overall_risk = RiskLevel.LOW
        if counts[RiskLevel.CRITICAL] > 0:
            overall_risk = RiskLevel.CRITICAL
        elif counts[RiskLevel.HIGH] > 0:
            overall_risk = RiskLevel.HIGH
        elif counts[RiskLevel.MEDIUM] > 0:
            overall_risk = RiskLevel.MEDIUM

        total_detected = len(entities)

        # Contextual Risk Escalation Logic (Transparent Rules)
        explanation = (
            f"Analysis identified {total_detected} sensitive element(s). "
            f"The highest individual risk severity is {overall_risk.value}."
        )
        
        if overall_risk == RiskLevel.LOW and (counts[RiskLevel.LOW] >= 3):
             overall_risk = RiskLevel.MEDIUM
             explanation = f"Analysis identified {total_detected} sensitive elements. Risk elevated to MEDIUM due to the presence of multiple combined personal identifiers, increasing exposure."
             
        elif overall_risk == RiskLevel.MEDIUM and counts[RiskLevel.MEDIUM] >= 2 and counts[RiskLevel.LOW] >= 2:
             overall_risk = RiskLevel.HIGH
             explanation = f"Analysis identified {total_detected} sensitive elements. Risk elevated to HIGH due to a rich combination of primary and secondary personal/financial data points, which can be correlated."

        return {
            "total_detected": total_detected,
            "overall_risk": overall_risk.value,
            "critical_count": counts[RiskLevel.CRITICAL],
            "high_count": counts[RiskLevel.HIGH],
            "medium_count": counts[RiskLevel.MEDIUM],
            "low_count": counts[RiskLevel.LOW],
            "explanation": explanation
        }

def analyze_document_risk(entities_dicts: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Entry point for the risk assessment.
    """
    engine = RiskEngine()
    # Reconstruct DetectedEntity instances for the engine (omitting irrelevant args for risk assessment)
    entities = [
        DetectedEntity(
            entity_type=e["type"], 
            text=e["text"], 
            confidence=e["confidence"], 
            location=e.get("location"), 
            page=e.get("page", 1)
        ) 
        for e in entities_dicts
    ]
    return engine.assess_document_risk(entities)
