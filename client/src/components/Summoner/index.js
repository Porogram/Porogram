import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import Summary from './Summary'
import { Failure } from '../Errors'
import { SummonerDataContext } from '../Context'

// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             fetchedData: false,
//             summoner: {},
//             positions: {},
//             championMasteries: {},
//             matchlist: {},
//             matches: [],
//             version: '',
//             champions: {},
//             summonerSpells: {},
//             runes: {},
//             items: {},
//             error: {}
//         }
//     }
//     componentDidMount() {
//         Promise.all([this.getSummonerData(), this.getStaticData()])
//             .then(() => this.setState({ fetchedData: true }))
//     }
//     getSummonerData = () => {
//         return axios.get(`/api/search/${this.props.match.params.summonerName}`)
//             .then(res =>
//                 this.setState({
//                     summoner: 'summoner' in res.data && res.data.summoner,
//                     positions:
//                         'positions' in res.data &&
//                         res.data.positions.length &&
//                         res.data.positions[0],
//                     championMasteries:
//                         'championMasteries' in res.data &&
//                         res.data.championMasteries,
//                     matchlist: 'matchlist' in res.data && res.data.matchlist,
//                     matches: 'matches' in res.data && res.data.matches
//                 })
//             ).catch(error =>
//                 this.setState({
//                     error: { message: 'Failed to get summoner data' }
//                 })
//             )
//     }
//     getStaticData = () => {
//         const baseUrl = 'https://ddragon.leagueoflegends.com/'
//         return axios.get(`${baseUrl}api/versions.json`)
//             .then(({ data }) =>
//                 Promise.all([
//                     data[0],
//                     axios.get(`${baseUrl}cdn/${data[0]}/data/en_US/champion.json`),
//                     axios.get(`${baseUrl}cdn/${data[0]}/data/en_US/summoner.json`),
//                     axios.get(`${baseUrl}cdn/${data[0]}/data/en_US/runesReforged.json`),
//                     axios.get(`${baseUrl}cdn/${data[0]}/data/en_US/item.json`)
//                 ])
//             ).then(([version, champions, summonerSpells, runes, items]) =>
//                 this.setState({
//                     version,
//                     champions: champions.data.data,
//                     summonerSpells: summonerSpells.data.data,
//                     runes: runes.data,
//                     items: items.data.data
//                 })
//             ).catch(error =>
//                 this.setState({
//                     error: { message: 'Failed to get static data' }
//                 })
//             )
//     }
//     render() {
//         const {
//             fetchedData,
//             summoner,
//             positions,
//             championMasteries,
//             matchlist,
//             matches,
//             version,
//             champions,
//             summonerSpells,
//             runes,
//             items,
//             error
//         } = this.state
//         const staticData = { version, champions, summonerSpells, runes, items }
//         if (!fetchedData) return <CircularProgress />
//         if ('message' in error) return <Failure error={error} />
//         else if ('message' in summoner) return <Failure error={summoner} />
//         return (
//             <Summary
//                 summoner={summoner}
//                 positions={positions}
//                 championMasteries={championMasteries}
//                 matchlist={matchlist}
//                 matches={matches}
//                 staticData={staticData}
//             />
//         )
//     }
// }

export default ({ match: { params: { summonerName } } }) => (
    <SummonerDataContext.Consumer>
        {({ getSummonerData }) => (
            <Summary
                summonerName={summonerName} 
                getSummonerData={getSummonerData} />
        )}
    </SummonerDataContext.Consumer>
)
