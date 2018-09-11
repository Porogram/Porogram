const querystring = require('querystring')
const rp = require('request-promise')

const URL = 'https://na1.api.riotgames.com'
const API_KEY = require('../key').API_KEY
const OPTIONS = { json: true }

module.exports = {
    createUrl(path, params = undefined, queryParams = {}) {
        url = `${URL}/lol${path}`
        if (params) url += `/${params}`
        queryParams.api_key = API_KEY
        url += `?${querystring.stringify(queryParams)}`
        return url
    },
    request(url) {
        OPTIONS.uri = url
        return rp(OPTIONS)
    }
}
