import subprocess
import json

def generate_ai_response(prompt: str, model: str = "phi3") -> str:
    """
    Ejecuta Ollama localmente para generar una respuesta.
    """
    try:
        result = subprocess.run(
            ["ollama", "run", model],
            input=prompt.encode("utf-8"),
            capture_output=True,
            text=True,
            timeout=60
        )
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        return "⏳ La generación de respuesta tomó demasiado tiempo."
    except Exception as e:
        return f"⚠️ Error al generar respuesta: {e}"
