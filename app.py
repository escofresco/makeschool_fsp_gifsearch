from flask import (Flask,
                   jsonify,
                   render_template,
                   request,
                   url_for,)
import json
from random import choice
from tenor import Tenor

app = Flask(__name__, static_url_path='/static') # https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask

with open('static/quotes.json') as quotes:
    random_quotes_json = json.load(quotes)
    random_quotes_authors = list(random_quotes_json.keys())

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/random_quote', methods=['POST'])
def random_quote():
    if request.method == 'POST':
        random_author = choice(random_quotes_authors)
        return jsonify({
            'author': random_author,
            'quote': random_quotes_json[random_author]
        })

@app.route('/autocomplete', methods=['POST'])
def autocomplete():
    if request.method == 'POST':
        partial_search = request.json['partial_search']
        return jsonify(Tenor().autocomplete(q=partial_search)['results'])
    return render_template(url_for('index'))

@app.route('/search', methods=['POST'])
def search():
    if request.method == 'POST':
        partial_search = request.json['partial_search']
        return jsonify(Tenor().search(q=partial_search,
                                      contentfilter='high')['results'])
    return render_template(url_for('index'))

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
