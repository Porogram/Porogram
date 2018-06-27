from flask import Flask, request, jsonify
import requests
import fetchApi

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    summoner = {}
    # get summoner ids
    summoner['summoner'] = fetchApi.getSummoner(summonerName)
    # get profile icon (change to realms if rate limit exceeded)
    summoner['version'] = fetchApi.getVersion()
    # get summoner info
    summoner['positions'] = fetchApi.getPositions(str(summoner['summoner']['id']))
    # get match list
    summoner['matchlist'] = fetchApi.getMatchlist(str(summoner['summoner']['accountId']))

    return jsonify(summoner)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
