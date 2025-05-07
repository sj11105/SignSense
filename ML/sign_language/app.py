from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from PIL import Image
import numpy as np
import tensorflow as tf

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# --- FLASK APP SETUP ---
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, origins=["http://localhost:3000"])

# --- ENSURE UPLOAD FOLDER EXISTS ---
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# --- HELPER FUNCTION ---
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- LOAD MODEL ---
model = tf.keras.models.load_model('sign_language_cnn_model.h5')

# --- CLASS LABEL MAPPING ---
index_to_label = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I',
    9: 'K', 10: 'L', 11: 'M', 12: 'N', 13: 'O', 14: 'P', 15: 'Q', 16: 'R',
    17: 'S', 18: 'T', 19: 'U', 20: 'V', 21: 'W', 22: 'X', 23: 'Y'
}

# --- PREDICTION ROUTE ---
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            # Preprocess image: convert to grayscale, resize to 28x28
            img = Image.open(filepath).convert('L')  # Grayscale
            img = img.resize((28, 28))
            img_array = np.array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=(0, -1))  # Shape: (1, 28, 28, 1)
            img_array = np.expand_dims(img_array, axis=0)
            
            # Predict
            prediction = model.predict(img_array)
            predicted_index = np.argmax(prediction)
            predicted_label = index_to_label.get(predicted_index, str(predicted_index))

            return jsonify({'result': predicted_label})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file type'}), 400

# --- START SERVER ---
if __name__ == '__main__':
    app.run(debug=True)
