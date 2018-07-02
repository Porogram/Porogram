from flask import Flask, request, jsonify
import requests
import fetchApi

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    summoner = fetchApi.Summoner(summonerName)
    # get summoner ids
    summoner.getSummoner()
    # get profile icon
    summoner.getVersion()
    # get summoner info
    summoner.getPositions()
    # get match list
    summoner.getMatchlist()
    # get match info
    summoner.getMatches()
    return jsonify(summoner.summoner)

@app.route('/test', methods=['GET'])
def test():
    r = requests.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/jewaffle?api_key=RGAPI-998d246c-0d79-4b7e-a142-3e4038e40bbb')
    if r.status_code == 200:
        return 'success!'
    else:
        return 'failure!'

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
