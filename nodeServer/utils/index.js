const querystring = require('querystring')
const URL = 'https://na1.api.riotgames.com'
const API_KEY = process.env.API_KEY

module.exports = {
    errors: {
        400: 'Bad request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Data not found',
        405: 'Method not allowed',
        415: 'Unsupported media type',
        422: 'Player exists, but hasn\'t played since match history collection began',
        429: 'Rate limit exceeded',
        500: 'Internal server error',
        502: 'Bad gateway',
        503: 'Service unavailable',
        504: 'Gateway timeout'
    },
    createUrl(path, params = undefined, queryParams = {}) {
        url = `${URL}/lol${path}`
        if (params) url += `/${params}`
        queryParams.api_key = API_KEY
        url += `?${querystring.stringify(queryParams)}`
        return url
    }
}
