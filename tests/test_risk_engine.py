import pytest
from ai.entity_detector import DetectedEntity
from ai.risk_engine import PrivacyRiskEngine

def test_high_risk_calculation():
    engine = PrivacyRiskEngine()
    
    # Simulate high risk scenario: SSN + Credit Card
    entities = [
        DetectedEntity(entity_type="SSN", text="000-00-0000", start_char=0, end_char=11, confidence=0.99),
        DetectedEntity(entity_type="CREDIT_CARD", text="4000 0000 0000 0000", start_char=20, end_char=39, confidence=0.95),
        DetectedEntity(entity_type="PERSON", text="John Doe", start_char=50, end_char=58, confidence=0.88)
    ]
    
    assessment = engine.assess_risk(entities)
    
    assert assessment.risk_level == "HIGH"
    assert assessment.total_entities == 3
    assert len(assessment.actionable_advice) > 0
    assert "SSN" in assessment.summary_counts

def test_low_risk_calculation():
    engine = PrivacyRiskEngine()
    
    # Simulate low risk scenario: Just an email address
    entities = [
        DetectedEntity(entity_type="EMAIL", text="user@example.com", start_char=0, end_char=16, confidence=0.9)
    ]
    
    assessment = engine.assess_risk(entities)
    
    assert assessment.risk_level == "LOW"
    assert assessment.total_entities == 1

def test_zero_risk_calculation():
    engine = PrivacyRiskEngine()
    
    # Simulate safe document
    entities = []
    
    assessment = engine.assess_risk(entities)
    
    assert assessment.risk_level == "LOW"
    assert assessment.total_entities == 0
    assert assessment.risk_score == 0
