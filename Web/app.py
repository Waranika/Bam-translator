import sys
import os

file_path=os.path.abspath(__file__)
script_folder = os.path.dirname(file_path)
sys.path.append(script_folder)

from flask import Flask, render_template, request, jsonify
from eng_bam_transformer import predict

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('Page.html')

@app.route('/translate', methods=['POST'])
def translate():
    try:
        text_to_translate = request.json['text']
        print(f"texte a traduire = {text_to_translate}")
        
        _, _, _, input_words, output_words = predict(text_to_translate)

        # Return the translated text
        translated_text = ' '.join(output_words[:-1])  # Exclude <end> token
        print(f"texte traduit = {translated_text}")
        return jsonify({"translation": translated_text})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
