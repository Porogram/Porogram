import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    List,
    ListItem,
    Avatar,
    Divider,
    Grid
} from '@material-ui/core'
import notFoundDoge from '../../images/not-found-doge.jpg'

const Image = ({ src, classes }) => {
    return (
        <Grid item>
            <img
                src={src}
                alt=""
                className={classes}
            />
        </Grid>
    )
}

export default withStyles(() => ({
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    champName: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    item: {
        height: 30,
        width: 30
    },
    items: {
        width: '13%'
    },
    img: {
        height: 30,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    playerList: {
        fontSize: 15,
        padding: '5px 10px'
    },
    playersItemList: {
        marginRight: 0
    },
    playerItem: {
        width: 30,
        height: 30,
        margin: 4
    },
    playerAvatar: {
        width: 40,
        height: 40,
        marginRight: 20
    },
    list: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%'
    },
    kda: {
        width: '15%',
        display: 'block',
        margin: 'auto 10px'
    },
    doubleIcon: {
        width: '5%'
    },
    secondary: {
        height: 26,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    trinket: {
        height: 30,
        display: 'block',
        marginTop: 'auto',
        marginBottom: 'auto'
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
        const {
            classes,
            match,
            match: { participants, participantIdentities, summonerIndex },
            summoner,
            staticData,
            staticData: { version, champions, summonerSpells, runes }
        } = this.props
        const { newSummoner, updatedMatch } = this.state
        const baseUrl = 'https://ddragon.leagueoflegends.com/'
        if (newSummoner.length)
            return <Redirect push to={`/summoner/${newSummoner}/matches`} />
        if (!updatedMatch) return null
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    {participants[summonerIndex].champion && (
                        <Fragment>
                            <Avatar
                                src={`${baseUrl}cdn/${version}/img/champion/${participants[summonerIndex].champion}.png`}
                                alt=""
                                className={classes.avatar}
                            />
                            <Typography variant="headline" className={classes.kda}>
                                {participants[summonerIndex].champion}
                            </Typography>
                        </Fragment>
                    )}
                    <Typography variant="headline" className={classes.kda}>
                        {participants[summonerIndex].stats.kills}/
                        {participants[summonerIndex].stats.deaths}/
                        {participants[summonerIndex].stats.assists}
                    </Typography>
                    <Grid
                        container direction="column"
                        className={classes.doubleIcon}
                        justify="center"
                    >
                        {participants[summonerIndex].rune1 ? (
                            <Image
                                src={`${baseUrl}cdn/img/${participants[summonerIndex].rune1}`}
                                classes={classes.img}
                            />
                        ) : (
                            <img
                                src={notFoundDoge}
                                alt=""
                                className={classes.img}
                            />
                        )}
                        {participants[summonerIndex].rune1 ? (
                            <Image
                                src={`${baseUrl}cdn/img/${participants[summonerIndex].rune2}`}
                                classes={classes.secondary}
                            />
                        ) : (
                            <img
                                src={notFoundDoge}
                                alt=""
                                className={classes.secondary}
                            />
                        )}
                    </Grid>
                    <Grid
                        container direction="column"
                        className={classes.doubleIcon}
                    >
                        {participants[summonerIndex].summonerSpell1 ? (
                            <Image
                                src={`${baseUrl}cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell1}.png`}
                                classes={classes.item}
                            />
                        ) : (
                            <img
                                src={notFoundDoge}
                                alt=""
                                className={classes.item}
                            />
                        )}
                        {participants[summonerIndex].summonerSpell2 ? (
                            <Image
                                src={`${baseUrl}cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell2}.png`}
                                classes={classes.item}
                            />
                        ) : (
                            <img
                                src={notFoundDoge}
                                alt=""
                                className={classes.item}
                            />
                        )}
                    </Grid>
                    <div className={classes.items}>
                        {[...Array(6).keys()].map(i => {
                            return participants[summonerIndex].stats[`item${i}`] === 0 ? (
                                <img
                                    src={notFoundDoge}
                                    alt=""
                                    className={classes.item}
                                    key={i}
                                />
                            ) : (
                                <img
                                    src={`${baseUrl}cdn/${version}/img/item/${participants[summonerIndex].stats[`item${i}`]}.png`}
                                    alt=""
                                    className={classes.item}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                    {participants[summonerIndex].stats[`item6`] === 0 ? (
                        <img
                            src={notFoundDoge}
                            alt=""
                            className={classes.trinket}
                        />
                    ) : (
                        <img
                            src={`${baseUrl}cdn/${version}/img/item/${participants[summonerIndex].stats[`item6`]}.png`}
                            alt=""
                            className={classes.trinket}
                        />
                    )}
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                    <List className={classes.list}>
                        {participants.map((participant, participantIndex) =>
                            <ListItem
                                button
                                key={participantIndex}
                                onClick={() =>
                                    this.getSummoner(participantIdentities[participantIndex])
                                }
                                className={classes.playerList}
                            >
                                {participant.champion && (
                                    <Avatar
                                        src={`${baseUrl}cdn/${version}/img/champion/${participant.champion}.png`}
                                        alt=""
                                        className={classes.playerAvatar}
                                    />
                                )}
                                {participantIdentities[participantIndex].player.summonerName && (
                                    <Typography
                                        variant="body2"
                                        className={classes.kda}
                                    >
                                        {participantIdentities[participantIndex].player.summonerName}
                                    </Typography>
                                )}
                                <Typography
                                    variant="body1"
                                    className={classes.kda}
                                >
                                    {participant.stats.kills}/
                                    {participant.stats.deaths}/
                                    {participant.stats.assists}
                                </Typography>
                                <Grid
                                    container
                                    direction="column"
                                    className={classes.doubleIcon}
                                    justify="center"
                                >
                                    {participant.rune1 ? (
                                        <Image
                                            src={`${baseUrl}cdn/img/${participant.rune1}`}
                                            classes={classes.img}
                                        />
                                    ) : (
                                        <img
                                            src={notFoundDoge}
                                            alt=""
                                            className={classes.img}
                                        />
                                    )}
                                    {participant.rune2 ? (
                                        <Image
                                            src={`${baseUrl}cdn/img/${participant.rune2}`}
                                            classes={classes.secondary}
                                        />
                                    ) : (
                                        <img
                                            src={notFoundDoge}
                                            alt=""
                                            className={classes.secondary}
                                        />
                                    )}
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    className={classes.doubleIcon}
                                >
                                    {participant.spell1Id === 0 ? (
                                        <img
                                            src={notFoundDoge}
                                            alt=""
                                            className={classes.item}
                                        />
                                    ) : (
                                        <Image
                                            src={`${baseUrl}cdn/${version}/img/spell/${participant.summonerSpell1}.png`}
                                            classes={classes.item}
                                        />
                                    )}
                                    {participant.spell2Id === 0 ? (
                                        <img
                                            src={notFoundDoge}
                                            alt=""
                                            className={classes.item}
                                        />
                                    ) : (
                                        <Image
                                            src={`${baseUrl}cdn/${version}/img/spell/${participant.summonerSpell2}.png`}
                                            classes={classes.item}
                                        />
                                    )}
                                </Grid>
                                <div className={classes.items}>
                                    {[...Array(6).keys()].map(i =>
                                        participant.stats[`item${i}`] === 0 ? (
                                            <img
                                                src={notFoundDoge}
                                                alt=""
                                                className={classes.item}
                                                key={i}
                                            />
                                        ) : (
                                            <img
                                                src={`${baseUrl}cdn/${version}/img/item/${participant.stats[`item${i}`]}.png`}
                                                alt=""
                                                className={classes.item}
                                                key={i}
                                            />
                                        )
                                    )}
                                </div>
                                {participant.stats[`item6`] === 0 ? (
                                    <img
                                        src={notFoundDoge}
                                        alt=""
                                        className={classes.trinket}
                                    />
                                ) : (
                                    <img
                                        src={`${baseUrl}cdn/${version}/img/item/${participant.stats[`item6`]}.png`}
                                        alt=""
                                        className={classes.trinket}
                                    />
                                )}
                            </ListItem>
                        )}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
})
