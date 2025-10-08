# ai-service/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

# Ruta absoluta de ollama.exe en tu máquina
OLLAMA_PATH = r"C:\Users\Brian\AppData\Local\Programs\Ollama\ollama.exe"
MODEL_NAME = "phi3"

app = Flask(__name__)
CORS(app)  # Permitir conexiones desde cualquier origen

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()

    if not prompt:
        return jsonify({"response": "⚠️ No se proporcionó prompt"}), 400

    try:
        # Ejecutar ollama y pasar el prompt directamente como argumento
        result = subprocess.run(
            [OLLAMA_PATH, "run", MODEL_NAME, prompt],
            capture_output=True,
            text=True,
            check=True
        )

        # Retornar stdout como respuesta
        response_text = result.stdout.strip()
        return jsonify({"response": response_text})

    except subprocess.CalledProcessError as e:
        return jsonify({"response": f"⚠️ Error al generar respuesta: {e.stderr or e}"}), 500
    except FileNotFoundError:
        return jsonify({"response": f"⚠️ No se encontró ollama.exe en {OLLAMA_PATH}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
