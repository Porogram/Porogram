import requests
from urllib.parse import urlencode

API_KEY = 'RGAPI-99c779f6-0e31-4bfa-a218-8ef3dabc6749'

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

def makeRequest(url):
    r = requests.get(url)
    if r.status_code == 200:
        return r.json()
    else:
        status = {}
        status['status_code'] = r.status_code
        if r.status_code == 400:
            status['message'] = 'Bad Request'
        elif r.status_code == 401:
            status['message']: 'Unauthorized'
        elif r.status_code == 404:
            status['message'] = 'Forbidden'
        elif r.status_code == 415:
            status['message'] = 'Unsupported Media Type'
        elif r.status_code == 429:
            status['message'] = 'Rate Limit Exceeded'
        elif r.status_code == 500:
            status['message'] = 'Internal Server Error'
        elif r.status_code == 503:
            status['message'] = 'Service Unavailable'
        elif r.status_code >= 400 and r.status_code < 500:
            status['message'] = 'Invalid Request'
        elif r.status_code >= 500 and r.status_code < 600:
            status['message'] = 'Server Error'
        else:
            status['message'] = 'Unknown Error'
        return status

def getSummoner(summonerName):
    return makeRequest(createUrl('summoner/v3/summoners/by-name', summonerName))

def getVersion():
    return requests.get('https://ddragon.leagueoflegends.com/api/versions.json').json()[0]

def getPositions(summonerId):
    return requests.get(createUrl('league/v3/positions/by-summoner', summonerId)).json()[0]

def getMatchlist(accountId):
    return requests.get(createUrl('match/v3/matchlists/by-account', accountId, { 'beginIndex': 0, 'endIndex': 5 })).json()

def getMatches(matches):
    return [requests.get(createUrl('match/v3/matches', str(match['gameId']))).json() for match in matches]
