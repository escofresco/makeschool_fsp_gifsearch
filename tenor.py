import json
import requests
from urllib import parse

class Tenor(object):

    def __init__(self, api_key='QA245EMO57HT', limit=10):
        self.api_key = api_key
        self.limit = limit
        self.url_base = 'https://api.tenor.com/v1/'

    def search(self, **params):
        params['key'] = self.api_key
        params['limit'] = self.limit
        url = self.url_base+'search?'+parse.urlencode(params)
        res = requests.get(url)
        if res.status_code == 200:
            return json.loads(res.content)
        return res.status_code
