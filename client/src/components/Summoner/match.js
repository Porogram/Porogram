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

// const matchData = (accountId, match, champData) => {
//     let summoner = match.participantIdentities.filter(part => {
//         return part.player.accountId === accountId
//     })
//     let champ = Object.values(champData).filter(champion => {
//         return parseInt(champion.key, 10) === match.participants[summoner[0].participantId -1].championId
//     })
//     let results  = {
//         champ: champ[0],
//         summoner: match.participants[summoner[0].participantId -1]
//     }
//     return results
// }

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
    })
    console.log(match)
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

                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
})

// {participantIdentities.map((object, j) =>
//     <ListItem button key={j} className={classes.playerList}>
//         <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${matchData(match.participantIdentities[j].player.accountId, match, champData).champ.id}.png`} alt="champion icon" className={classes.playerAvatar}/>
//         {participantIdentities[j].player.summonerName}
//         <Typography variant="body1" className={classes.kda}>{matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.kills}/{matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.deaths}/{matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.assists}</Typography>
//         <Paper className={classes.playersItemList}>
//             <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item0}.png`} alt="" className={classes.playerItem}/>
//             <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item1}.png`} alt="" className={classes.playerItem}/>
//             <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item2}.png`} alt="" className={classes.playerItem}/>
//             <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item3}.png`} alt="" className={classes.playerItem}/>
//             <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item4}.png`} alt="" className={classes.playerItem}/>
//             <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item5}.png`} alt="" className={classes.playerItem}/>
//         </Paper>
//     </ListItem>
// )}
