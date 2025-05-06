from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageOps
import numpy as np
from keras.models import load_model

app = Flask(__name__)
CORS(app)  # Allow requests from different origins

# Load model and labels
model = load_model("keras_Model.h5", compile=False)
class_names = [line.strip() for line in open("labels.txt", "r").readlines()]

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    image = Image.open(image_file).convert("RGB")

    # Preprocess
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    image_array = np.asarray(image).astype(np.float32)
    normalized_image_array = (image_array / 127.5) - 1

    # Model input shape
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    data[0] = normalized_image_array

    # Predict
    prediction = model.predict(data)
    index = int(np.argmax(prediction))
    class_name = class_names[index]
    confidence_score = float(prediction[0][index])

    return jsonify({
        'class': class_name,
        'confidence': round(confidence_score * 100, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
