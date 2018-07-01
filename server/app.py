from flask import Flask, request, jsonify
import requests
import fetchApi

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    summoner = {}
    # get summoner ids
    summoner['summoner'] = fetchApi.getSummoner(summonerName)
    # get profile icon
    summoner['version'] = fetchApi.getVersion()
    # get summoner info
    if 'id' in summoner['summoner']:
        summoner['positions'] = fetchApi.getPositions(str(summoner['summoner']['id']))
    # get match list
    if 'id' in summoner['summoner']:
        summoner['matchlist'] = fetchApi.getMatchlist(str(summoner['summoner']['accountId']))
    # get match info
    if 'matchlist' in summoner and 'matches' in summoner['matchlist']:
        summoner['matches'] = fetchApi.getMatches(summoner['matchlist']['matches'])

    return jsonify(summoner)

@app.route('/test', methods=['GET'])
def test():
    r = requests.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/jewaffle?api_key=RGAPI-998d246c-0d79-4b7e-a142-3e4038e40bbb')
    if r.status_code == 200:
        return 'success!'
    else:
        return 'failure!'

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
