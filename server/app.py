from flask import Flask, request, jsonify
import fetchApi

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    res = {}
    res['summoner'] = fetchApi.getSummoner(summonerName)
    if 'id' in res['summoner']:
        res['positions'] = fetchApi.getPositions(res['summoner']['id'])
        res['championMasteries'] = fetchApi.getChampionMasteries(res['summoner']['id'])
        res['scores'] = fetchApi.getScores(res['summoner']['id'])
    if 'accountId' in res['summoner']:
        res['matchlist'] = fetchApi.getMatchlist(res['summoner']['accountId'], 0, 10)
    if 'matchlist' in res and 'matches' in res['matchlist']:
        res['matches'] = fetchApi.getMatches(res['matchlist']['matches'])
    return jsonify(res)

@app.route('/api/matches', methods=['POST'])
def matches():
    if not request.json or 'accountId' not in request.json or 'beginIndex' not in request.json or 'endIndex' not in request.json:
        return jsonify({ 'status_code': 400, 'message': 'Bad request' })
    res = {}
    res['matchlist'] = fetchApi.getMatchlist(request.json['accountId'], request.json['beginIndex'], request.json['endIndex'])
    if 'matchlist' in res and 'matches' in res['matchlist']:
        res['matches'] = fetchApi.getMatches(res['matchlist']['matches'])
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
