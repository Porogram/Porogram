const app = require('express')()
const mongoose = require('mongoose')
const summoner = require('./routes/summoner')
const match = require('./routes/match')
const matches = require('./routes/matches')
const create = require('./routes/create')
const find = require('./routes/find')
const remove = require('./routes/delete')

const port = process.env.PORT || 5000

mongoose.connect(
    'mongodb://jewonoh:porogram@ec2-18-191-173-27.us-east-2.compute.amazonaws.com/porogram',
    { auth: { authdb: 'admin' }, useNewUrlParser: true }
)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('connected to database'))

app.use('/api/summoner', summoner)
app.use('/api/match', match)
app.use('/api/matches', matches)
app.use('/api/create', create)
app.use('/api/find', find)
app.use('/api/delete', remove)
app.listen(port, () => console.log(`server running on port ${port}`))
