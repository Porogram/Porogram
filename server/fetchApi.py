import requests
from urllib.parse import urlencode

API_KEY = 'RGAPI-d3d4ea87-0b47-403c-ab7e-c2e25e0d0a86'

API_PREFIX = 'lol/'
BASE_URL = 'https://na1.api.riotgames.com/' + API_PREFIX

def createUrl(apiPath, apiParams = None, apiQueryParams = {}):
    url = BASE_URL + apiPath
    if apiParams:
        url += '/' + apiParams
    apiQueryParams['api_key'] = API_KEY
    url += '?' + urlencode(apiQueryParams, doseq=True)
    return url

def makeRequest(url):
    r = requests.get(url)
    if r.status_code == 200:
        return r.json()
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
    r = makeRequest('https://ddragon.leagueoflegends.com/api/versions.json')
    if 'status_code' not in r:
        return r[0]
    return r

def getPositions(summonerId):
    r = makeRequest(createUrl('league/v3/positions/by-summoner', str(summonerId)))
    if 'status_code' not in r:
        return r[0]
    return r

def getMatchlist(accountId):
    return makeRequest(createUrl('match/v3/matchlists/by-account', str(accountId), { 'beginIndex': 0, 'endIndex': 5 }))

def getMatches(matches):
    return [makeRequest(createUrl('match/v3/matches', str(match['gameId']))) for match in matches]
