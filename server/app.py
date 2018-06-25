from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'RGAPI-bff227e1-ecfa-4c93-97d9-a4670f19d316'
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

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    # get summoner ids
    url = createUrl('summoner/v3/summoners/by-name', summonerName)
    response = requests.get(url).json()

    # get profile icon
    id = response['id']
    profileIconId = response['profileIconId']

    url = createUrl('static-data/v3/versions')
    profileIconVersion = requests.get(url).json()[0]

    # get summoner info
    url = createUrl('league/v3/positions/by-summoner/' + str(id))
    response = requests.get(url).json()[0]
    response['profileIconId'] = profileIconId
    response['profileIconVersion'] = profileIconVersion

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
