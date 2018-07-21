import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Paper,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    List,
    ListItem,
    Avatar
} from '@material-ui/core'
import notFoundDoge from '../../images/not-found-doge.jpg'

const styles = theme => ({
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20,
    },
    champName: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    item: {
        width: 24,
        height: 24
    },
    playerList: {
        fontSize: 15,
        padding: '5px 10px',
    },
    playersItemList: {
        marginRight: 0,
    },
    playerItem: {
        width: 30,
        height: 30,
        margin: 4,
    },
    playerAvatar: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
    list: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
    },
    kda: {
    }
})

export default withStyles(styles)(props => {
    const { classes, match, version, summoner, champData, summonerSpells, runes } = props
    const { participants, participantIdentities } = match
    const summonerIndex = participantIdentities.findIndex(participant =>
        participant.player.accountId === summoner.accountId
    )
    participants.forEach(participant => {
        participant.champion = Object.values(champData).find(champion =>
            participant.championId === parseInt(champion.key, 10)).id
        participant.summonerSpell1 = Object.values(summonerSpells).find(summonerSpell =>
            participant.spell1Id === parseInt(summonerSpell.key, 10)).id
        participant.summonerSpell2 = Object.values(summonerSpells).find(summonerSpell =>
            participant.spell2Id === parseInt(summonerSpell.key, 10)).id
        participant.rune1 = runes.find(rune =>
            participant.stats.perkPrimaryStyle === rune.id).slots[0].runes.find(rune =>
            participant.stats.perk0 === rune.id).icon
        participant.rune2 = runes.find(rune =>
            participant.stats.perkSubStyle === rune.id).icon
    })
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <Avatar
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participants[summonerIndex].champion}.png`}
                    alt=""
                    className={classes.avatar}
                />
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell1}.png`}
                    alt=""
                    className={classes.item}
                />
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell2}.png`}
                    alt=""
                    className={classes.item}
                />
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/img/${participants[summonerIndex].rune1}`}
                    alt=""
                    className={classes.item}
                />
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/img/${participants[summonerIndex].rune2}`}
                    alt=""
                    className={classes.item}
                />
                <Typography variant="headline" className={classes.kda}>
                    {participants[summonerIndex].stats.kills}/
                    {participants[summonerIndex].stats.deaths}/
                    {participants[summonerIndex].stats.assists}
                </Typography>
                {[...Array(7).keys()].map(i =>
                    participants[summonerIndex].stats[`item${i}`] === 0 ?
                        <img src={notFoundDoge} alt="" className={classes.item} key={i} /> :
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participants[summonerIndex].stats[`item${i}`]}.png`} alt="" className={classes.item} key={i} />
                )}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List className={classes.list}>
                    {participants.map((participant, i) =>
                        <ListItem button key={i} className={classes.playerList}>
                            <Avatar src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participant.champion}.png`} alt="" className={classes.playerAvatar}/>
                            <img
                                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participant.summonerSpell1}.png`}
                                alt=""
                                className={classes.item}
                            />
                            <img
                                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participant.summonerSpell2}.png`}
                                alt=""
                                className={classes.item}
                            />
                            <img
                                src={`http://ddragon.leagueoflegends.com/cdn/img/${participant.rune1}`}
                                alt=""
                                className={classes.item}
                            />
                            <img
                                src={`http://ddragon.leagueoflegends.com/cdn/img/${participant.rune2}`}
                                alt=""
                                className={classes.item}
                            />
                            <Typography variant="body2" className={classes.kda}>
                                {participantIdentities[i].player.summonerName}
                            </Typography>
                            <Typography variant="body1" className={classes.kda}>
                                {participant.stats.kills}/
                                {participant.stats.deaths}/
                                {participant.stats.assists}
                            </Typography>
                            {[...Array(7).keys()].map(j =>
                                participant.stats[`item${j}`] === 0 ?
                                    <img src={notFoundDoge} alt="" className={classes.item} key={j} /> :
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.stats[`item${j}`]}.png`} alt="" className={classes.item} key={j} />
                            )}
                        </ListItem>
                    )}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
})
