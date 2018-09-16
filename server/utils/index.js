const querystring = require('querystring')
const apiKey = require('../keys').apiKey

const baseUrl = 'https://na1.api.riotgames.com'

module.exports = {
    createUrl(path, params = undefined, queryParams = {}) {
        url = `${baseUrl}/lol${path}`
        if (params) url += `/${params}`
        queryParams.api_key = apiKey
        url += `?${querystring.stringify(queryParams)}`
        return url
    }
}
