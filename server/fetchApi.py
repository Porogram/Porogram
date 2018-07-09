import requests
from urllib.parse import urlencode

API_KEY = 'RGAPI-8f7b6a5d-5aca-4120-a69f-859e6954e766'

API_PREFIX = 'lol/'
BASE_URL = 'https://na1.api.riotgames.com/' + API_PREFIX

def createUrl(apiPath, apiParams = None, apiQueryParams = None):
    if apiQueryParams is None:
        apiQueryParams = {}
    apiQueryParams['api_key'] = API_KEY
    url = BASE_URL + apiPath
    if apiParams:
        url += '/' + apiParams
    url += '?' + urlencode(apiQueryParams, doseq=True)
    return url

def getSummoner(summonerName):
    r = requests.get(createUrl('summoner/v3/summoners/by-name', summonerName))
    if r.status_code is 200:
        return r.json()

def getVersion():
    return requests.get('https://ddragon.leagueoflegends.com/api/versions.json').json()[0]

def getPositions(summonerId):
    return requests.get(createUrl('league/v3/positions/by-summoner', summonerId)).json()[0]

def getMatchlist(accountId):
    return requests.get(createUrl('match/v3/matchlists/by-account', accountId, { 'beginIndex': 0, 'endIndex': 5 })).json()

def getMatches(matches):
    return [requests.get(createUrl('match/v3/matches', str(match['gameId']))).json() for match in matches]
