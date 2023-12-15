import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import requests
import numpy as np
import keras
from keras import backend as K
from keras.preprocessing import image
import cv2
import cvlib as cv
from dotenv import load_dotenv

# Load variabel lingkungan dari file .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Config Server
INPUT_FOLDER = "inputs"
app.config["INPUT_FOLDER"] = INPUT_FOLDER

OUTPUT_FOLDER = "outputs"
app.config["OUTPUT_FOLDER"] = OUTPUT_FOLDER

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


# validation file image
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# unique name file
def get_unique_filename(filename):
    # Generate a unique filename if the file already exists
    original_name, extension = os.path.splitext(filename)
    counter = 1
    while os.path.exists(os.path.join(app.config["INPUT_FOLDER"], filename)):
        filename = f"{original_name}_{counter}{extension}"
        counter += 1
    return filename


def coeff_determination(y_true, y_pred):
    SS_res = K.sum(K.square(y_true - y_pred))
    SS_tot = K.sum(K.square(y_true - K.mean(y_true)))
    return 1 - SS_res / (SS_tot + K.epsilon())


# Running model
def run_model():
    print("======Running Model=====\n")
    input_shape = (224, 224, 3)

    base_model = keras.applications.ResNet152(
        include_top=False, weights="imagenet", input_shape=input_shape, pooling="avg"
    )

    base_model.trainable = False

    test_datagen = image.ImageDataGenerator(
        samplewise_center=True,
    )

    dependencies = {"coeff_determination": coeff_determination}

    model = keras.models.load_model("./Model_BMI.h5", custom_objects=dependencies)

    return base_model, test_datagen, model


def predict_BMI(input_path, output_path, base_model, test_datagen, model):
    input_shape = (224, 224, 3)

    raw_input_image = cv2.imread(input_path)
    raw_input_image = cv2.cvtColor(raw_input_image, cv2.COLOR_BGR2RGB)
    raw_input_image = cv2.resize(raw_input_image, (input_shape[0], input_shape[1]))

    preprocessed_input_image = image.load_img(output_path, target_size=input_shape)
    preprocessed_input_image = image.img_to_array(preprocessed_input_image)

    preprocessed_input_image[preprocessed_input_image[:, :, 0] > 0] = 1
    preprocessed_input_image[preprocessed_input_image[:, :, 1] > 0] = 1
    preprocessed_input_image[preprocessed_input_image[:, :, 2] > 0] = 1

    final_input_image = raw_input_image * preprocessed_input_image

    generator = test_datagen.flow(
        np.expand_dims(final_input_image, axis=0), batch_size=1
    )

    features_batch = base_model.predict(generator)
    # features_batch = model.predict(generator)

    preds = model.predict(features_batch)
    bmi_pred = preds[0][0]
    print(f"BMI: {bmi_pred:.2f}")
    if bmi_pred < 18.5:
        print("Underweight")
        return bmi_pred, "underwight"
    elif 18.5 <= bmi_pred <= 24.9:
        print("Normal")
        return bmi_pred, "normal"
    elif 25 <= bmi_pred <= 29.9:
        print("Overweight")
        return bmi_pred, "overwight"
    elif 30 <= bmi_pred:
        print("obesity")
        return bmi_pred, "obesity"


def rmbgn(input_path, output_path):
    print("======Proses Filtered=====\n")
    response = requests.post(
        "https://api.remove.bg/v1.0/removebg",
        files={"image_file": open(input_path, "rb")},
        data={"size": "auto"},
        headers={"X-Api-Key": os.getenv("API_KEY")},
    )
    if response.status_code == requests.codes.ok:
        with open(output_path, "wb") as out:
            out.write(response.content)
    else:
        print("Error:", response.status_code, response.text)


def detection_human(image_path):
    print("======Proses deteksi gambar=====")
    # Load image
    img = cv2.imread(image_path)

    # Perform human detection
    faces, confidences = cv.detect_face(img)

    # If at least one face is detected, consider it as containing humans
    if len(faces) > 0:
        print("Gambar ini berisi manusia.\n")
        return True
    else:
        print("Gambar ini tidak berisi manusia.\n")
        return False


base_model, test_datagen, model = run_model()


@app.route("/predict", methods=["POST"])
def handlePredict():
    global base_model, test_datagen, model
    file = request.files.get("image")

    if file is None:
        return jsonify({"error": "No selected file"})

    if file and allowed_file(file.filename):
        # Generate a unique filename to avoid overwriting existing files
        filename = get_unique_filename(secure_filename(file.filename))
        file_input_path = os.path.join(app.config["INPUT_FOLDER"], filename)

        # Save the uploaded file to the server
        file.save(file_input_path)

        if not detection_human(file_input_path):
            return jsonify({"error": "Bukan foto manusia"}), 500

        file_output_path = os.path.join(app.config["OUTPUT_FOLDER"], filename)

        try:
            rmbgn(input_path=file_input_path, output_path=file_output_path)
        except requests.exceptions.RequestException as e:
            return jsonify({"error": e}), 500

        print("======Proses Prediksi=====\n")
        result = predict_BMI(
            input_path=file_input_path,
            output_path=file_output_path,
            base_model=base_model,
            test_datagen=test_datagen,
            model=model,
        )
        print(f"Prediksi: {result[1]}, BMI: {result[0]:.2f}")
        return jsonify(
            {
                "message": "File successfully uploaded",
                "filename": filename,
                "prediction": result[1],
                "bmi": f"{result[0]:.2f}",
            }
        )
    print("======Done=====")

    return jsonify({"error": "Invalid file format"})


@app.route("/")
def welcome():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(debug=True, port=5000)


# @app.route("/predict", methods=["GET"])
# def predict():
#     result = predict_BMI("foto.jpg")

#     # Menggunakan jsonify untuk merespon data dalam format JSON
#     return jsonify({"data": result})
