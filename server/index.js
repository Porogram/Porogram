const app = require('express')()
const mongoose = require('mongoose')
const summoner = require('./routes/summoner')
const match = require('./routes/match')
const matchlist = require('./routes/matchlist')
const find = require('./routes/find')
const deleteUser = require('./routes/deleteUser')
const deleteSummoner = require('./routes/deleteSummoner')
const signup = require('./routes/signup')
const login = require('./routes/login')
const staticData = require('./routes/staticData')

const port = process.env.PORT || 5000

mongoose.connect(
    'mongodb://jewonoh:porogram@ec2-18-191-173-27.us-east-2.compute.amazonaws.com/porogram',
    { auth: { authdb: 'admin' }, useNewUrlParser: true }
)
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('connected to database'))

app.use('/api/summoner', summoner)
app.use('/api/match', match)
app.use('/api/matchlist', matchlist)
app.use('/api/find', find)
app.use('/api/user/delete', deleteUser)
app.use('/api/summoner/delete', deleteSummoner)
app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/staticdata', staticData)
app.listen(port, () => console.log(`server running on port ${port}`))
