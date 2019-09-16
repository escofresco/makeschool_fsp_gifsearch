from flask import (Flask,
                   render_template,
                   request,)
from tenor import Tenor

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    partial_search = request.args.get('partial_search')
    return Tenor().search(q=partial_search,
                          contentfilter='high')

if __name__ == '__main__':
    app.run(debug=True)
