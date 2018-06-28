import requests

API_KEY = 'RGAPI-55ecdbfb-9bf9-4e8f-b60b-9a5fd54f56d2'
API_PREFIX = 'lol/'
BASE_URL = 'https://na1.api.riotgames.com/' + API_PREFIX

def createUrl(apiPath, apiParams = None, apiQueryParams = None):
    if apiQueryParams is None:
        apiQueryParams = {}
    apiQueryParams['api_key'] = API_KEY
    url = BASE_URL + apiPath
    if apiParams:
        url += '/' + apiParams
    url += '?'
    for query, value in apiQueryParams.items():
        url += query + '=' + value
    return url

def getSummoner(apiPath, summonerName):
    return requests.get(createUrl(apiPath, summonerName)).json()

def getVersion(apiPath):
    # return requests.get(createUrl(, apiPath)).json()[0]
    return requests.get('https://ddragon.leagueoflegends.com/api/versions.json').json()[0]

def getPositions(apiPath):
    return requests.get(createUrl(apiPath)).json()[0]
