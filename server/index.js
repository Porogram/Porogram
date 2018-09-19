const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const summoner = require('./routes/summoner')
const match = require('./routes/match')
const matchlist = require('./routes/matchlist')
const staticData = require('./routes/staticData')
const signup = require('./routes/signup')
const login = require('./routes/login')
const find = require('./routes/find')
const deleteUser = require('./routes/deleteUser')
const deleteSummoner = require('./routes/deleteSummoner')

const port = process.env.PORT || 5000

mongoose.connect(
    'mongodb://jewonoh:porogram@ec2-18-191-173-27.us-east-2.compute.amazonaws.com/porogram',
    { auth: { authdb: 'admin' }, useNewUrlParser: true }
)
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('connected to database'))

if (process.env.NODE_ENV === 'production')
    app.use(express.static(path.join(__dirname, '../client/build')))
// RIOT API
app.use('/api/summoner', summoner)
app.use('/api/match', match)
app.use('/api/matchlist', matchlist)
// DDRAGON API
app.use('/api/static-data', staticData)
// DATABASE
app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/find', find)
app.use('/api/user/delete', deleteUser)
app.use('/api/summoner/delete', deleteSummoner)

app.listen(port, () => console.log(`server running on port ${port}`))
