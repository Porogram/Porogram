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
    return jsonify(res)

@app.route('/api/match/<string:matchId>', methods=['GET'])
def match(matchId):
    return jsonify({ 'match': utils.getMatch(matchId) })

@app.route('/api/matches', methods=['POST'])
def matches():
    if (not request.json
        or 'accountId' not in request.json
        or 'beginIndex' not in request.json
        or 'endIndex' not in request.json):
        return jsonify({ 'status_code': 400, 'message': 'Bad request' })
    return jsonify({
        'matchlist': utils.getMatchlist(
            request.json['accountId'],
            request.json['beginIndex'],
            request.json['endIndex']
        )
    })

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
