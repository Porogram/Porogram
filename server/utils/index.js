const querystring = require('querystring')
const API_KEY = require('../key').API_KEY

const URL = 'https://na1.api.riotgames.com'

module.exports = {
    createUrl(path, params = undefined, queryParams = {}) {
        url = `${URL}/lol${path}`
        if (params) url += `/${params}`
        queryParams.api_key = API_KEY
        url += `?${querystring.stringify(queryParams)}`
        return url
    }
}
