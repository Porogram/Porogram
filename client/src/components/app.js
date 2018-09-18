import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Provider } from './context'
import { setAuthorizationToken } from './Utils'
import PrivateRoute from './privateRoute'
import Layout from './Layout'
import Home from './Home'
import Signup from './Signup'
import Summoner from './Summoner'
import { NotFound } from './Errors'

const baseUrl = 'https://ddragon.leagueoflegends.com'
const queues = {
    0: 'Custom',
    72: '1v1 Snowdown Showdown',
    73: '2v2 Snowdown Showdown',
    75: '6v6 Hexakill',
    76: 'URF',
    78: 'One for All',
    83: 'Co-op vs AI URF',
    98: '6v6 Hexakill',
    100: '5v5 ARAM',
    310: 'Nemesis',
    313: 'Black Market Brawlers',
    317: 'Definitely Not Dominion',
    325: 'All Random',
    400: '5v5 Draft',
    420: '5v5 Ranked Solo',
    430: '5v5 Blind',
    440: '5v5 Ranked Flex',
    450: '5v5 ARAM',
    460: '3v3 Blind',
    470: '3v3 Ranked Flex',
    600: 'Blood Hunt',
    610: 'Dark Star',
    700: 'Clash',
    800: 'Co-op vs. AI',
    810: 'Co-op vs. AI',
    820: 'Co-op vs. AI',
    830: 'Co-op vs. AI',
    840: 'Co-op vs. AI',
    850: 'Co-op vs. AI',
    900: 'ARURF',
    910: 'Ascension',
    920: 'Legend of the Poro King',
    940: 'Nexus Siege',
    950: 'Doom Bots',
    960: 'Doom Bots',
    980: 'Star Guardian Invasion',
    990: 'Star Guardian Invasion',
    1000: 'Overcharge',
    1010: 'Snow ARURF',
    1020: 'One for All',
    1030: 'Odyssey: Extraction Intro',
    1040: 'Odyssey: Extraction Cadet',
    1050: 'Odyssey: Extraction Crewmember',
    1060: 'Odyssey: Extraction Captain',
    1070: 'Odyssey: Extraction Onslaught',
    1200: 'Nexus Blitz'
}

export default class extends Component {
    state = {
        champions: {},
        championMasteries: [],
        error: {},
        fetchedData: false,
        isAuthenticated: false,
        items: {},
        matches: [],
        matchlist: {},
        moreMatches: true,
        positions: [],
        runes: {},
        summoner: {},
        summonerSpells: {},
        version: ''
    }
    componentDidMount() {
        if (localStorage.jwtToken) {
            this.setAuthorizationToken(localStorage.jwtToken)
            const user = jwt.decode(localStorage.jwtToken)
            Promise.all([
                this.setState({ isAuthenticated: true }),
                this.getSummonerData(user.summoner.name),
                this.getStaticData()
            ])
        } else this.getStaticData()
    }
    getStaticData = () => {
        return axios.get('/api/static-data')
            .then(({
                data: { champions, items, runes, summonerSpells, version }
            }) =>
                this.setState({
                    champions,
                    items,
                    runes,
                    summonerSpells,
                    version
                }))
            .catch(error => console.log(error))
    }
    getSummonerData = summonerName => {
        return axios.get(`/api/summoner/${summonerName}`)
            .then(({ data }) =>
                data.error
                ? this.setState({ error: data.error, fetchedData: true })
                : this.setState({
                    championMasteries: data.championMasteries,
                    fetchedData: true,
                    matches: data.matchlist.matches,
                    matchlist: data.matchlist,
                    moreItems: (
                        data.matchlist.endIndex < data.matchlist.totalGames
                    ),
                    positions: data.positions,
                    summoner: data.summoner
                })
            ).catch(error =>
                this.setState({
                    error: { message: 'Failed to get summoner data' },
                    fetchedData: true
                })
            )
    }
    getMatch = matchId => {
        return axios.get(`/api/match/${matchId}`)
            .then(({ data: { match } }) => Promise.resolve(match))
            .catch(error =>
                this.setState({ error: { message: 'Failed to get match' } })
            )
    }
    getMatches = (accountId, beginIndex, endIndex) => {
        return axios.post('/api/matchlist', { accountId, beginIndex, endIndex })
            .then(({ data: { matchlist } }) =>
                this.setState(prevState => ({
                    matchlist,
                    matches: [...prevState.matches, ...matchlist.matches],
                    moreItems: matchlist.endIndex < prevState.matchlist.totalGames
                }))
            ).catch(error =>
                this.setState({
                    error: { message: 'Failed to get more matches' },
                    moreItems: false
                })
            )
    }
    login = (username, password) => {
        return axios.post(
            '/api/login',
            { password, username: username.toLowerCase() }
        ).then(({ data }) => {
            if (data.error) return Promise.resolve({ error: data.error })
            else {
                const token = data.token
                localStorage.setItem('jwtToken', token)
                this.setAuthorizationToken(token)
                return Promise.all([
                    jwt.decode(token),
                    this.setState({ isAuthenticated: true })
                ])
            }
        }).catch(error => Promise.reject(error))
    }
    logout = () => { return this.setState({ isAuthenticated: false }) }
    setAuthorizationToken = token => {
        if (token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        else delete axios.defaults.headers.common['Authorization']
    }
    render() {
        return (
            <BrowserRouter>
                <Provider
                    value={{
                        baseUrl,
                        queues,
                        getMatch: this.getMatch,
                        getMatches: this.getMatches,
                        getSummonerData: this.getSummonerData,
                        login: this.login,
                        logout: this.logout,
                        state: this.state
                    }}
                >
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/signup" component={Signup} />
                            <PrivateRoute
                                path="/:summonerName"
                                component={Summoner}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Layout>
                </Provider>
            </BrowserRouter>
        )
    }
}
