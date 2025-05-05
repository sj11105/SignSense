from flask import Flask, request, jsonify
from PIL import Image, ImageOps
import numpy as np
from keras.models import load_model

app = Flask(__name__)

model = load_model("keras_Model.h5", compile=False)

class_names = open("labels.txt", "r").readlines()

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    image = Image.open(image_file).convert("RGB")
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    data[0] = normalized_image_array
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    return jsonify({
        'class': class_name[2:], 
    })

if __name__ == '__main__':
    app.run(debug=True)
