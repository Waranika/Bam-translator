import sys
import os

file_path=os.path.abspath(__file__)
script_folder = os.path.dirname(file_path)
sys.path.append(script_folder)

from flask import Flask, request, jsonify
from eng_bam_transformer import predict

app = Flask(__name__)

@app.route('/translate', methods=['POST'])
def translate():
    try:
        # Get the input text from the request
        data = request.get_json()
        test_sequence = data.get('text')

        # Perform translation
        _, _, _, input_words, output_words = predict(test_sequence)

        # Return the translated text
        translated_text = ' '.join(output_words[:-1])  # Exclude <end> token
        return jsonify({"translated_text": translated_text})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
