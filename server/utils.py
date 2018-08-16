import requests
import os
from urllib.parse import urlencode

API_KEY = os.environ['API_KEY']
RIOT_GAMES_URL = 'https://na1.api.riotgames.com'
DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com'
ERRORS = {
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
VERSIONS = requests.get(DATA_DRAGON_URL + '/api/versions.json').json()
CHAMPIONS = requests.get(
    DATA_DRAGON_URL + '/cdn/' + VERSIONS[0] + '/data/en_US/champion.json'
).json()
SUMMONER_SPELLS = requests.get(
    DATA_DRAGON_URL + '/cdn/' + VERSIONS[0] + '/data/en_US/summoner.json'
).json()
RUNES = requests.get(
    DATA_DRAGON_URL + '/cdn/' + VERSIONS[0] + '/data/en_US/runesReforged.json'
).json()
ITEMS = requests.get(
    DATA_DRAGON_URL + '/cdn/' + VERSIONS[0] + '/data/en_US/item.json'
).json()
CHAMPION_TABLE = {
    data['key']: data for champion, data in CHAMPIONS['data'].items()
}
SUMMONER_SPELL_TABLE = {
    data['key']: data for summonerSpell, data in SUMMONER_SPELLS['data'].items()
}
RUNE_TABLE = {
    data['id']: {
        'icon': data['icon'],
        'id': data['id'],
        'key': data['key'],
        'name': data['name']
    } for data in RUNES
}
RUNE_TABLE.update({
    rune['id']: rune for data in RUNES for slot in data['slots'] for rune in slot['runes']
})
ITEM_TABLE = {
    key: data for key, data in ITEMS['data'].items()
}

def createUrl(apiPath, apiParams = None, apiQueryParams = {}):
    url = RIOT_GAMES_URL + '/lol' + apiPath
    if apiParams:
        url += '/' + apiParams
    apiQueryParams['api_key'] = API_KEY
    url += '?' + urlencode(apiQueryParams, doseq=True)
    return url

def makeRequest(url):
    r = requests.get(url)
    if r.status_code == 200:
        return r.json()
    message = (
        ERRORS[r.status_code] if r.status_code in ERRORS else 'Unknown error'
    )
    return {
        'status_code': r.status_code,
        'message': message
    }

def getSummoner(summonerName):
    return makeRequest(
        createUrl('/summoner/v3/summoners/by-name', summonerName)
    )

def getPositions(summonerId):
    return makeRequest(
        createUrl('/league/v3/positions/by-summoner', str(summonerId))
    )

def getChampionMasteries(summonerId):
    return makeRequest(
        createUrl(
            '/champion-mastery/v3/champion-masteries/by-summoner',
            str(summonerId)
        )
    )

def getMatchlist(accountId, beginIndex = 0, endIndex = 10):
    return makeRequest(
        createUrl(
            '/match/v3/matchlists/by-account',
            str(accountId),
            { 'beginIndex': beginIndex, 'endIndex': endIndex }
        )
    )

def getMatches(matches):
    return [
        makeRequest(
            createUrl(
                '/match/v3/matches',str(match['gameId'])
            )
        ) for match in matches
    ]
