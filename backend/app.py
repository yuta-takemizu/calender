
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # CORSを有効にする
    
UPLOAD_FOLDER = 'backend/upload/saved_files/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    date = request.form['date']  # フロントエンドから送信された日付を受け取る

    if file.filename == '':
        return 'No selected file', 400

    date_folder = os.path.join(UPLOAD_FOLDER, date)
    os.makedirs(date_folder, exist_ok=True)
    file.save(os.path.join(date_folder, file.filename))

    return jsonify({'message': 'File uploaded successfully'}), 200

@app.route('/uploads/<date>/<filename>')
def uploaded_file(date, filename):
    return send_from_directory(os.path.join(UPLOAD_FOLDER, date), filename)

if __name__ == '__main__':
    app.run()
