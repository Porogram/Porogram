import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    List,
    ListItem,
    Avatar,
    Divider
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
        height: 30
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
    console.log(participants)
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
                {[...Array(7).keys()].map(itemIndex => {
                    console.log(`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participants[summonerIndex].stats[`item${itemIndex}`]}.png`)
                    return participants[summonerIndex].stats[`item${itemIndex}`] === 0 ?
                        <img src={notFoundDoge} alt="" className={classes.item} key={itemIndex} /> :
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participants[summonerIndex].stats[`item${itemIndex}`]}.png`} alt="" className={classes.item} key={itemIndex} />
                })}
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails>
                <List className={classes.list}>
                    {participants.map((participant, participantIndex) =>
                        <ListItem button key={participantIndex} className={classes.playerList}>
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
                                {participantIdentities[participantIndex].player.summonerName}
                            </Typography>
                            <Typography variant="body1" className={classes.kda}>
                                {participant.stats.kills}/
                                {participant.stats.deaths}/
                                {participant.stats.assists}
                            </Typography>
                            {[...Array(7).keys()].map(itemIndex =>
                                participant.stats[`item${itemIndex}`] === 0 ?
                                    <img src={notFoundDoge} alt="" className={classes.item} key={itemIndex} /> :
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.stats[`item${itemIndex}`]}.png`} alt="" className={classes.item} key={itemIndex} />
                            )}
                        </ListItem>
                    )}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
})
