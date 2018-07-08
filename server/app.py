from flask import Flask, request, jsonify
import requests
import fetchApi

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    res = {}
    res['summoner'] = fetchApi.getSummoner(summonerName)
    res['version'] = fetchApi.getVersion()
    if 'id' in res['summoner']:
        res['positions'] = fetchApi.getPositions(res['summoner']['id'])
    if 'accountId' in res['summoner']:
        res['matchlist'] = fetchApi.getMatchlist(res['summoner']['accountId'])
    if 'matchlist' in res and 'matches' in res['matchlist']:
        res['matches'] = fetchApi.getMatches(res['matchlist']['matches'])
    return jsonify(res)

# TODO make a matches route that takes accountId, beginIndex, and endIndex to show additional matches

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
