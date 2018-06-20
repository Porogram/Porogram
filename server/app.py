from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summonerName + "?api_key=RGAPI-0cbd8110-9d2c-49cd-80a5-8e13d909b76d"
    response = requests.get(url)

    url = "https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + str(response.json()['id']) + "?api_key=RGAPI-0cbd8110-9d2c-49cd-80a5-8e13d909b76d"
    response = requests.get(url)

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
