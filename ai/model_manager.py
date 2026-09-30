import time
from typing import Any, Dict, Optional

class ModelRuntime(str):
    # Represents the execution backend
    CPU = "CPU"
    GPU = "GPU"
    NPU = "NPU (Pending Verification)"
    MOCK = "MOCK_RUNTIME"

class AIModel:
    """
    Abstract representation of an AI Model loaded into memory.
    """
    def __init__(self, model_id: str, runtime: ModelRuntime):
        self.model_id = model_id
        self.runtime = runtime
        self.is_loaded = False

    def load(self):
        """Simulates loading the model into the specified runtime."""
        # TODO: Implement actual model loading (e.g., QNN or TFLite loading)
        self.is_loaded = True
        return self

    def infer(self, input_data: Any) -> Any:
        """Simulates an inference pass."""
        if not self.is_loaded:
            raise RuntimeError(f"Model {self.model_id} is not loaded.")
        # Mock inference return
        return {"result": "mock_prediction", "confidence": 0.95}

class ModelManager:
    """
    Modular Model Manager.
    Architecture: Application -> Model Manager -> AI Model -> Runtime.
    
    Provides a standardized integration layer capable of supporting 
    Qualcomm AI Hub optimized models in the future, while currently defaulting 
    to standard CPU/Mock logic without falsely claiming NPU execution.
    """
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelManager, cls).__new__(cls)
            cls._instance._models = {}
        return cls._instance

    def __init__(self):
        # Prevent re-initialization if already created
        pass

    def register_model(self, model_id: str, runtime: ModelRuntime = ModelRuntime.MOCK) -> AIModel:
        """
        Registers and loads a model targeting a specific runtime.
        """
        model = AIModel(model_id, runtime)
        model.load()
        self._models[model_id] = model
        return model

    def get_model(self, model_id: str) -> Optional[AIModel]:
        """
        Retrieves a previously registered model.
        """
        return self._models.get(model_id)

    def execute_inference(self, model_id: str, input_data: Any) -> Dict[str, Any]:
        """
        Main entry point for the Application layer to request AI processing.
        Handles routing to the appropriate model and runtime, and tracks basic telemetry.
        """
        model = self.get_model(model_id)
        if not model:
            # Fallback for now if model isn't pre-loaded
            model = self.register_model(model_id)
            
        start_time = time.time()
        
        try:
            # Simulate Qualcomm AI Hub Model / Standard Runtime Execution
            output = model.infer(input_data)
        except Exception as e:
            output = {"error": str(e)}
            
        latency_ms = (time.time() - start_time) * 1000
        
        return {
            "model_id": model_id,
            "runtime_used": model.runtime,
            "latency_ms": latency_ms,
            "output": output
        }
