from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/search/<string:summonerId>', methods=['GET'])
def search(summonerId):
    url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summonerId + "?api_key=RGAPI-0cbd8110-9d2c-49cd-80a5-8e13d909b76d"
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
