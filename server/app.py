from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'RGAPI-b862f98f-95c0-4cca-a1a9-529da484b6fa'

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=' + API_KEY
    response = requests.get(url)

    url = 'https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/' + str(response.json()['id']) + '?api_key=' + API_KEY
    response = requests.get(url)

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
