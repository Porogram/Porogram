import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    Typography
} from '@material-ui/core'
import { StaticDataContext } from '../../../Context'
import Content from './content'

export default withStyles((theme) => ({
    header: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    media: {
        height: theme.spacing.unit * 30
    }
}))(class extends Component {
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
            match: { participants, summonerIndex },
            summoner: { name, profileIconId, summonerLevel },
            classes
        } = this.props
        const { newSummoner, updatedMatch } = this.state
        if (newSummoner.length)
            return <Redirect push to={`/${newSummoner}`} />
        if (!updatedMatch) return null
        return (
            <StaticDataContext.Consumer>
                {({ baseUrl, state: { championTable, version } }) => (
                    <Card
                        style={participants[summonerIndex].stats.win
                            ? {
                                'backgroundColor': '#0A7FD9',
                                'marginBottom': '50px'
                            } : {
                                'backgroundColor': '#B63015',
                                'marginBottom': '50px'
                            }
                        }
                    >
                        <CardHeader
                            avatar={(
                                <Avatar
                                    src={`${baseUrl}/cdn/${version}/img/profileicon/${profileIconId}.png`}
                                    alt=""
                                />
                            )}
                            className={classes.header}
                            subheader={`Level ${summonerLevel}`}
                            title={(
                                <Typography variant="headline">
                                    {name}
                                </Typography>
                            )}
                        />
                        <CardMedia
                            className={classes.media}
                            image={`${baseUrl}/cdn/img/champion/splash/${championTable[participants[summonerIndex].championId].id}_0.jpg`}
                        />
                        <Content
                            participants={participants}
                            summonerIndex={summonerIndex}
                            version={version}
                        />
                    </Card>
                )}
            </StaticDataContext.Consumer>
        )
    }
})
