import os
import cv2
import pytesseract
import tempfile
import logging
from pdf2image import convert_from_path
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Set Tesseract path (Windows users only, remove for Linux/macOS)
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

# Set Poppler path (Windows users only, remove for Linux/macOS)
POPPLER_PATH = r"C:\\Users\\DELL\\Downloads\\Release-24.08.0-0\\poppler-24.08.0\\Library\\bin"

def ocr_extract(image):
    """Extracts text from an image using Tesseract OCR"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    return pytesseract.image_to_string(gray)

def process_pdf(pdf_path):
    """Converts a PDF to images and extracts text from each page"""
    try:
        images = convert_from_path(pdf_path, poppler_path=POPPLER_PATH)
        text_output = []

        for image in images:
            with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as temp_img:
                image.save(temp_img.name, "PNG")
                image_cv = cv2.imread(temp_img.name)
                extracted_text = ocr_extract(image_cv)
                text_output.append(extracted_text)
                os.remove(temp_img.name)

        return "\n".join(text_output)
    except Exception as e:
        logging.error(f"Error processing PDF: {str(e)}")
        return f"Error processing PDF: {str(e)}"

@app.route('/ocr', methods=['POST'])
def process_file():
    """Handles file upload (image or PDF) and returns extracted text"""
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filename = file.filename.lower()

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(file.read())
        temp_path = temp_file.name
    
    try:
        if filename.endswith(".pdf"):
            extracted_text = process_pdf(temp_path)
        elif filename.endswith(('.png', '.jpg', '.jpeg')):
            image = cv2.imread(temp_path)
            extracted_text = ocr_extract(image)
        else:
            return jsonify({"error": "Invalid file type"}), 400
    except Exception as e:
        logging.error(f"Error processing file: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        os.remove(temp_path)

    return jsonify({"text": extracted_text})

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
