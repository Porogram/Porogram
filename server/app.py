from flask import Flask, request, jsonify
import utils

app = Flask(__name__)

@app.route('/api/summoner/<string:summonerName>', methods=['GET'])
def summoner(summonerName):
    res = {}
    summoner = utils.getSummoner(summonerName)
    if 'message' in summoner:
        return jsonify({ 'error': summoner })
    res['summoner'] = summoner
    res['positions'] = utils.getPositions(res['summoner']['id'])
    res['championMasteries'] = utils.getChampionMasteries(res['summoner']['id'])
    res['matchlist'] = utils.getMatchlist(res['summoner']['accountId'], 0, 10)
    res['matches'] = utils.getMatches(res['matchlist']['matches'])
    return jsonify(res)

@app.route('/api/matches', methods=['POST'])
def matches():
    if (not request.json
        or 'accountId' not in request.json
        or 'beginIndex' not in request.json
        or 'endIndex' not in request.json):
        return jsonify({ 'status_code': 400, 'message': 'Bad request' })
    res = {}
    res['matchlist'] = utils.getMatchlist(
        request.json['accountId'],
        request.json['beginIndex'],
        request.json['endIndex']
    )
    res['matches'] = utils.getMatches(res['matchlist']['matches'])
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
