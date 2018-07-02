import requests
from urllib.parse import urlencode

API_KEY = 'RGAPI-99c779f6-0e31-4bfa-a218-8ef3dabc6749'

API_PREFIX = 'lol/'
BASE_URL = 'https://na1.api.riotgames.com/' + API_PREFIX

class Summoner:
    def __init__(self, summonerName):
        self.summoner = {}
        self.summonerName = summonerName

    def createUrl(self, apiPath, apiParams = None, apiQueryParams = {}):
        url = BASE_URL + apiPath
        if apiParams:
            url += '/' + apiParams
        apiQueryParams['api_key'] = API_KEY
        url += '?' + urlencode(apiQueryParams, doseq=True)
        return url

    def makeRequest(self, url):
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

    def getSummoner(self):
        self.summoner['summoner'] = self.makeRequest(self.createUrl('summoner/v3/summoners/by-name', self.summonerName))

    def getVersion(self):
        r = self.makeRequest('https://ddragon.leagueoflegends.com/api/versions.json')
        if 'status_code' not in r:
            self.summoner['version'] = r[0]
        else:
            self.summoner['version'] = r

    def getPositions(self):
        if 'id' in self.summoner['summoner']:
            r = self.makeRequest(self.createUrl('league/v3/positions/by-summoner', str(self.summoner['summoner']['id'])))
            if 'status_code' not in r:
                self.summoner['positions'] = r[0]
            else:
                self.summoner['positions'] = r

    def getMatchlist(self):
        if 'accountId' in self.summoner['summoner']:
            self.summoner['matchlist'] = self.makeRequest(self.createUrl('match/v3/matchlists/by-account', str(self.summoner['summoner']['accountId']), { 'beginIndex': 0, 'endIndex': 5 }))

    def getMatches(self):
        if 'matchlist' in self.summoner and 'matches' in self.summoner['matchlist']:
            self.summoner['matches'] = [self.makeRequest(self.createUrl('match/v3/matches', str(match['gameId']))) for match in self.summoner['matchlist']['matches']]
