import json
import random
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from flask import Flask, request, jsonify

app = Flask(__name__, static_folder='.', template_folder='.')

# Load words from JSON
def load_words():
    with open('words.json', 'r', encoding='utf-8') as f:
        return json.load(f)


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:filename>')
def static_pages(filename):
    return app.send_static_file(filename)

@app.route('/api/translate', methods=['GET'])
def api_translate():
    text = request.args.get('q', '').strip()
    target = request.args.get('target', 'hi').strip()
    source = request.args.get('source', 'en').strip()

    if not text:
        return jsonify({'error': 'Missing text query parameter'}), 400

    langpair = f"{source}|{target}"
    query = urlencode({'q': text, 'langpair': langpair})
    url = f'https://api.mymemory.translated.net/get?{query}'
    request_obj = Request(url, headers={'User-Agent': 'LokVaani/1.0'})

    try:
        with urlopen(request_obj, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
    except Exception as e:
        return jsonify({'error': 'Translation service failure', 'details': str(e)}), 502

    return jsonify(result)

@app.route('/api/get-question', methods=['GET'])
def get_question():
    mode = request.args.get('mode', '1') # '1' for Game Mode 1, '2' for Game Mode 2
    words = load_words()
    
    if not words:
        return jsonify({"error": "No words available"}), 500

    question_word = random.choice(words)
    
    if mode == '1':
        # Game Mode 1: Guess the translation
        # Get 3 other random incorrect options
        other_words = random.sample([w for w in words if w['id'] != question_word['id']], min(3, len(words) - 1))
        options = [question_word['local']] + [w['local'] for w in other_words]
        random.shuffle(options)
        
        return jsonify({
            "id": question_word['id'],
            "question": question_word['english'],
            "options": options,
            "mode": mode
        })
    else:
        # Game Mode 2: Word Quiz
        return jsonify({
            "id": question_word['id'],
            "question": question_word['local'],
            "mode": mode
        })

@app.route('/api/check-answer', methods=['POST'])
def check_answer():
    data = request.json
    question_id = data.get('id')
    user_answer = data.get('answer', '').strip().lower()
    mode = data.get('mode', '1')
    
    words = load_words()
    word_obj = next((w for w in words if w['id'] == question_id), None)
    
    if not word_obj:
        return jsonify({"error": "Question not found"}), 404
        
    is_correct = False
    correct_answer = ""
    
    if mode == '1':
        correct_answer = word_obj['local']
        if user_answer == correct_answer.lower():
            is_correct = True
    else:
        correct_answer = word_obj['english']
        if user_answer == correct_answer.lower():
            is_correct = True
            
    return jsonify({
        "correct": is_correct,
        "correct_answer": correct_answer
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)