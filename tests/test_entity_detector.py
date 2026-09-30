import pytest
from ai.entity_detector import EntityDetector

def test_fake_ssn_detection():
    detector = EntityDetector()
    text = "The user John Doe has a social security number of 000-00-0000 and lives in nowhere."
    
    entities = detector.detect_entities(text)
    
    # We expect one SSN and potentially one PERSON depending on the NLP mock
    ssn_entities = [e for e in entities if e.type == "government_id"]
    
    assert len(ssn_entities) == 1
    assert ssn_entities[0].text == "000-00-0000"
    assert ssn_entities[0].confidence >= 0.9

def test_fake_credit_card_detection():
    detector = EntityDetector()
    text = "Please charge my card 4000 0000 0000 0000 for the transaction."
    
    entities = detector.detect_entities(text)
    cc_entities = [e for e in entities if e.type == "card_information"]
    
    assert len(cc_entities) == 1
    assert cc_entities[0].text == "4000 0000 0000 0000"

def test_no_pii_detection():
    detector = EntityDetector()
    text = "This is a completely safe and public document about cloud architecture."
    
    entities = detector.detect_entities(text)
    # The regex shouldn't catch anything, mock NLP might be empty
    assert len(entities) == 0
