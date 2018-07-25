import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Divider
} from '@material-ui/core'
import Summary from './summary'
import Details from './details'

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
    updateMatch = (match, { accountId }, { champions, summonerSpells, runes }) => {
        const { participants, participantIdentities } = match
        match.summonerIndex = participantIdentities.findIndex(participant =>
            participant.player.accountId === accountId
        )
        participants.forEach(participant => {
            participant.champion = Object.values(champions).find(champion =>
                participant.championId === parseInt(champion.key, 10)).id
            participant.summonerSpell1 = participant.spell1Id !== 0 && Object.values(summonerSpells)
                .find(summonerSpell =>
                    participant.spell1Id === parseInt(summonerSpell.key, 10)).id
            participant.summonerSpell2 = participant.spell2Id !== 0 && Object.values(summonerSpells)
                .find(summonerSpell =>
                    participant.spell2Id === parseInt(summonerSpell.key, 10)).id
            let rune1 = runes.find(rune =>
                participant.stats.perkPrimaryStyle === rune.id)
            participant.rune1 = rune1 && rune1.slots[0].runes.find(rune =>
                    participant.stats.perk0 === rune.id).icon
            let rune2 = runes.find(rune =>
                participant.stats.perkSubStyle === rune.id)
            participant.rune2 = rune2 && rune2.icon
        })
    }
    render() {
        const { classes, match, staticData } = this.props
        const { newSummoner, updatedMatch } = this.state
        if (newSummoner.length)
            return <Redirect push to={`/summoner/${newSummoner}/matches`} />
        if (!updatedMatch) return null
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Summary match={match} staticData={staticData} />
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                    <Details
                        match={match}
                        staticData={staticData}
                        getSummoner={this.getSummoner}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}
