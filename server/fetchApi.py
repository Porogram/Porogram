import requests
from urllib.parse import urlencode

API_KEY = 'RGAPI-b74a613d-0881-4eaf-a3be-1a7c73d63ebf'

API_PREFIX = 'lol/'
BASE_URL = 'https://na1.api.riotgames.com/' + API_PREFIX

errors = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Data not found',
    405: 'Method not allowed',
    415: 'Unsupported media type',
    422: 'Player exists, but hasn\'t played since match history collection began',
    429: 'Rate limit exceeded',
    500: 'Internal server error',
    502: 'Bad gateway',
    503: 'Service unavailable',
    504: 'Gateway timeout'
}

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
    message = errors[r.status_code] if r.status_code in errors else 'Unknown error'
    return {
        'status_code': r.status_code,
        'message': message
    }

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
