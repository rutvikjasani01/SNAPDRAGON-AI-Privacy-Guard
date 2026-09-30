import pytest
from ai.entity_detector import DetectedEntity
from ai.risk_engine import RiskEngine

def test_high_risk_calculation():
    engine = RiskEngine()
    
    # Simulate high risk scenario: SSN + Credit Card
    entities = [
        DetectedEntity(entity_type="government_id", text="000-00-0000", confidence=0.99),
        DetectedEntity(entity_type="card_information", text="4000 0000 0000 0000", confidence=0.95),
        DetectedEntity(entity_type="PERSON", text="John Doe", confidence=0.88)
    ]
    
    assessment = engine.assess_document_risk(entities)
    
    assert assessment["overall_risk"] == "HIGH"
    assert assessment["total_detected"] == 3
    assert len(assessment["explanation"]) > 0
    assert assessment["high_count"] > 0

def test_low_risk_calculation():
    engine = RiskEngine()
    
    # Simulate low risk scenario: Just an email address
    entities = [
        DetectedEntity(entity_type="email", text="user@example.com", confidence=0.9)
    ]
    
    assessment = engine.assess_document_risk(entities)
    
    assert assessment["overall_risk"] == "LOW"
    assert assessment["total_detected"] == 1

def test_zero_risk_calculation():
    engine = RiskEngine()
    
    # Simulate safe document
    entities = []
    
    assessment = engine.assess_document_risk(entities)
    
    assert assessment["overall_risk"] == "NONE"
    assert assessment["total_detected"] == 0
