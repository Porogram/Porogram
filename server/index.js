const app = require('express')()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const summoner = require('./routes/summoner')
const match = require('./routes/match')
const matches = require('./routes/matches')

mongoose.connect('mongodb://localhost/porogram', { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('connected to database'))

app.use('/api/summoner', summoner)
app.use('/api/match', match)
app.use('/api/matches', matches)
app.listen(port, () => console.log(`server running on port ${port}`))
