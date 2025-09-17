import base64, io
from flask import Flask, request, jsonify
import face_recognition

app = Flask(__name__)

def decode_image(data_url):
    header, encoded = data_url.split(",", 1)
    img_bytes = base64.b64decode(encoded)
    return face_recognition.load_image_file(io.BytesIO(img_bytes))

@app.route("/encode", methods=["POST"])
def encode():
    data = request.get_json()
    if not data or "image" not in data:
        return jsonify({"error": "No image supplied"}), 400

    image = decode_image(data["image"])
    encs = face_recognition.face_encodings(image)
    if not encs:
        return jsonify({"error": "No face detected"}), 400

    return jsonify({"encoding": encs[0].tolist()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
