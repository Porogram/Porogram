from flask import Flask, request, jsonify
import requests
import fetchApi

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    summoner = {}
    # get summoner ids
    summoner['summoner'] = fetchApi.getSummoner('summoner/v3/summoners/by-name', summonerName)
    # get profile icon (change to realms if rate limit exceeded)
    summoner['version'] = fetchApi.getVersion('static-data/v3/versions')
    # get summoner info
    summoner['positions'] = fetchApi.getPositions('league/v3/positions/by-summoner/' + str(summoner['summoner']['id']))
    return jsonify(summoner)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
