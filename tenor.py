from dotenv import load_dotenv
import json
import os
import requests
from urllib import parse
load_dotenv()
class Tenor(object):

    def __init__(self, api_key=os.getenv("TENOR_API_KEY"), limit=10):
        self.api_key = api_key
        self.limit = limit
        self.url_base = 'https://api.tenor.com/v1/'

    def search(self, **params):
        return self.make_request('search', params)


    def autocomplete(self, **params):
        return self.make_request('autocomplete', params)

    def make_request(self, route, params):
        params['key'] = self.api_key
        params['limit'] = self.limit
        url = f'{self.url_base}{route}?{parse.urlencode(params)}'
        res = requests.get(url)
        if res.status_code == 200:
            return json.loads(res.content)
        return res.status_code
