import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Divider,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions
} from '@material-ui/core'
import Summary from './summary'
import Details from './details'
import Header from './header'
import Media from './media'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = { newSummoner: '', updatedMatch: false }
    }
    componentDidMount() {
        const { match, summoner, staticData } = this.props
        this.updateMatch(match, summoner, staticData)
        this.setState({ updatedMatch: true })
    }
    getSummoner = participantIdentity => {
        'summonerId' in participantIdentity.player &&
        this.setState({ newSummoner: participantIdentity.player.summonerName })
    }
    updateMatch = (match, { accountId }, { champions, summonerSpells, runes, items }) => {
        const { participants, participantIdentities } = match
        match.summonerIndex = participantIdentities.findIndex(participant =>
            participant.player.accountId === accountId
        )
        participants.forEach(participant => {
            participant.champion = Object.values(champions).find(champion =>
                participant.championId === parseInt(champion.key, 10)).id
            participant.summonerSpell1 = participant.spell1Id !== 0 &&
                Object.values(summonerSpells).find(summonerSpell =>
                    participant.spell1Id === parseInt(summonerSpell.key, 10)).id
            participant.summonerSpell2 = participant.spell2Id !== 0 &&
                Object.values(summonerSpells).find(summonerSpell =>
                    participant.spell2Id === parseInt(summonerSpell.key, 10)).id
            let rune = runes.find(rune =>
                participant.stats.perkPrimaryStyle === rune.id)
            let rune1 = rune && rune.slots[0].runes.find(rune =>
                    participant.stats.perk0 === rune.id)
            participant.rune1 = rune1 && rune1.icon
            let rune2 = runes.find(rune =>
                participant.stats.perkSubStyle === rune.id)
            participant.rune2 = rune2 && rune2.icon;
            [...Array(7).keys()].forEach(i => {
                if (!(participant.stats[`item${i}`].toString() in items))
                    participant.stats[`item${i}`] = 0
            })
        })
    }
    render() {
        const {
            match: { participants, participantIdentities, summonerIndex },
            staticData: { version, champions },
            summoner,
            positions,
            matchlist
        } = this.props
        const { newSummoner, updatedMatch } = this.state
        const baseUrl = 'https://ddragon.leagueoflegends.com/'
        if (newSummoner.length)
            return <Redirect push to={`/summoner/${newSummoner}/summary`} />
        if (!updatedMatch) return null
        return (
            <Card
                style={participants[summonerIndex].stats.win ?
                    {'backgroundColor': '#0A7FD9', 'marginBottom': '50px'}:
                    {'backgroundColor': '#B63015', 'marginBottom': '50px'}}
            >
                <Header
                    version={version}
                    summoner={summoner}
                    positions={positions}
                />
                <Divider />
                <Media
                    version={version}
                    champions={champions}
                    matchlist={matchlist}
                    summonerIndex={summonerIndex}
                    participants={participants}

                />
            </Card>
        )
    }
}
// <Summary
//     participants={participants}
//     summonerIndex={summonerIndex}
//     version={version}
//     summoner={summoner}
// />

// <ExpansionPanelDetails>
//     <Details
//         participants={participants}
//         participantIdentities={participantIdentities}
//         version={version}
//         getSummoner={this.getSummoner}
//     />
// </ExpansionPanelDetails>
