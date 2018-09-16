const querystring = require('querystring')
const rp = require('request-promise')
const apiKey = require('../keys').apiKey

const baseUrl = 'https://na1.api.riotgames.com'

module.exports = {
    createUrl(path, params = undefined, queryParams = {}) {
        url = `${baseUrl}/lol${path}`
        if (params) url += `/${params}`
        queryParams.api_key = apiKey
        url += `?${querystring.stringify(queryParams)}`
        return url
    },
    request(uri) {
        return rp({ uri, json: true })
    }
}
