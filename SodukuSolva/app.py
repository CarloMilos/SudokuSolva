from flask import Flask, render_template, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_image', methods=['POST'])
def upload_image():
    try:
        uploaded_image = request.files['image']
        if uploaded_image:
            uploaded_image.save('sudoku_image.jpg')
            return jsonify({'result': 'Image uploaded and replaced successfully.'})
        else:
            return jsonify({'result': 'No image uploaded.'})
    except Exception as e:
        return jsonify({'result': f'Error: {str(e)}'})

@app.route('/run_code')
def run_code():
    try:
        # Execute your code in main.py
        result = subprocess.check_output(['python', 'main.py'], text=True, stderr=subprocess.STDOUT)
        return jsonify({'result': result})
    except subprocess.CalledProcessError as e:
        return jsonify({'result': f'Error: {e.output}'})

if __name__ == '__main__':
    app.run(debug=True)
