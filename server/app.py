from flask import Flask, request, jsonify
import requests
import jsonParser

app = Flask(__name__)

@app.route('/api/search/<string:summonerName>', methods=['GET'])
def search(summonerName):
    # get summoner ids
    response = jsonParser.getSummoner('summoner/v3/summoners/by-name', summonerName)

    # get profile icon
    id = response['id']
    profileIconId = response['profileIconId']

    profileIconVersion = jsonParser.getVersion('static-data/v3/versions')

    # get summoner info
    response = jsonParser.getPositions('league/v3/positions/by-summoner/' + str(id))
    response['profileIconId'] = profileIconId
    response['profileIconVersion'] = profileIconVersion

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
