from flask import Flask, request, jsonify
import utils

app = Flask(__name__)

@app.route('/api/summoner/<string:summonerName>', methods=['GET'])
def summoner(summonerName):
    res = {}
    res['summoner'] = utils.getSummoner(summonerName)
    res['positions'] = utils.getPositions(res['summoner']['id']) if 'id' in res['summoner'] else []
    res['championMasteries'] = utils.getChampionMasteries(res['summoner']['id']) if 'id' in res['summoner'] else []
    res['matchlist'] = utils.getMatchlist(res['summoner']['accountId'], 0, 10) if 'accountId' in res['summoner'] else {}
    res['matches'] = utils.getMatches(res['matchlist']['matches']) if 'matchlist' in res and 'matches' in res['matchlist'] else []
    return jsonify(res)

@app.route('/api/matches', methods=['POST'])
def matches():
    if not request.json or 'accountId' not in request.json or 'beginIndex' not in request.json or 'endIndex' not in request.json:
        return jsonify({ 'status_code': 400, 'message': 'Bad request' })
    res = {}
    res['matchlist'] = utils.getMatchlist(request.json['accountId'], request.json['beginIndex'], request.json['endIndex'])
    res['matches'] = utils.getMatches(res['matchlist']['matches']) if 'matchlist' in res and 'matches' in res['matchlist'] else []
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
