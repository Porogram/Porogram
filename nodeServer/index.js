const app = require('express')()
const port = process.env.PORT || 5000
const summoner = require('./routes/summoner')
const match = require('./routes/match')
const matches = require('./routes/matches')

app.use('/api/summoner', summoner)
app.use('/api/match', match)
app.use('/api/matches', matches)
app.listen(port, () => console.log(`server running on port ${port}`))
