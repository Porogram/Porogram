from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'RGAPI-f19f07c9-18f4-411c-bd23-a7862f106af4'

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    # get summoner ids
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=' + API_KEY
    response = requests.get(url).json()

    # get profile icon
    id = response['id']
    profileIconId = response['profileIconId']
    url = 'https://na1.api.riotgames.com/lol/static-data/v3/realms?api_key=' + API_KEY
    profileIconVersion = requests.get(url).json()['n']['profileicon']

    # get summoner info
    url = 'https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/' + str(id) + '?api_key=' + API_KEY
    response = requests.get(url).json()[0]
    response['profileIconId'] = profileIconId
    response['profileIconVersion'] = profileIconVersion

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
