from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'RGAPI-a410df34-8b0a-476e-8fc1-5e1a78e1858e'

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=' + API_KEY
    response = requests.get(url)

    url = 'https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/' + str(response.json()['id']) + '?api_key=' + API_KEY
    response = requests.get(url)

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
