from flask import (Flask,
                   jsonify,
                   render_template,
                   request,)

from tenor import Tenor

app = Flask(__name__, static_url_path='/static') # https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask


@app.route('/')
def index():
    return render_template('index.html',
                           test_results=Tenor().search(q='big',
                                                       contentfilter='high')['results'])

@app.route('/search', methods=['POST'])
def search():
    partial_search = request.args.get('search_input')
    return jsonify(Tenor().search(q=partial_search,
                                  contentfilter='high')['results'])

if __name__ == '__main__':
    app.run(debug=True)
