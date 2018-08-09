from flask import Flask, request, jsonify
import utils

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    res = {}
    res['summoner'] = utils.getSummoner(summonerName)
    if 'id' in res['summoner']:
        res['positions'] = utils.getPositions(res['summoner']['id'])
        res['championMasteries'] = utils.getChampionMasteries(res['summoner']['id'])
    if 'accountId' in res['summoner']:
        res['matchlist'] = utils.getMatchlist(res['summoner']['accountId'], 0, 10)
    if 'matchlist' in res and 'matches' in res['matchlist']:
        res['matches'] = utils.getMatches(res['matchlist']['matches'])
    return jsonify(res)

@app.route('/api/matches', methods=['POST'])
def matches():
    if not request.json or 'accountId' not in request.json or 'beginIndex' not in request.json or 'endIndex' not in request.json:
        return jsonify({ 'status_code': 400, 'message': 'Bad request' })
    res = {}
    res['matchlist'] = utils.getMatchlist(request.json['accountId'], request.json['beginIndex'], request.json['endIndex'])
    if 'matchlist' in res and 'matches' in res['matchlist']:
        res['matches'] = utils.getMatches(res['matchlist']['matches'])
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
