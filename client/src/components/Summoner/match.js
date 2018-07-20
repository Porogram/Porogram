import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper,
        ExpansionPanel,
        ExpansionPanelSummary,
        ExpansionPanelDetails,
        Typography,
        List,
        ListItem } from '@material-ui/core'

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
        width: 40,
        height: 40,
        margin: '10px 3px'
    },
    itemList: {
        marginRight: 0,
        paddingLeft: 32,
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
        marginRight: 30,
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
})

const matchData = (account, match, champData) => {
    let summoner = match.participantIdentities.filter(part => {
        return part.player.accountId === account
    })
    let champ = Object.values(champData).filter(champion => {
        return champion.key == match.participants[summoner[0].participantId -1].championId
    })
    let results  = {
        champ: champ[0],
        summoner: match.participants[summoner[0].participantId -1]
    }
    return results
}

export default withStyles(styles)(props => {
    const { classes, key, match, version, summoner, champData } = props
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${matchData(summoner.accountId, match, champData).champ.id}.png`} alt="champion icon" className={classes.avatar}/>
                <Typography variant="headline" className={classes.champName}>{matchData(summoner.accountId, match, champData).champ.name}</Typography>
                <Typography variant="headline" className={classes.kda}>{matchData(summoner.accountId, match, champData).summoner.stats.kills}/{matchData(summoner.accountId, match, champData).summoner.stats.deaths}/{matchData(summoner.accountId, match, champData).summoner.stats.assists}</Typography>

                <Paper className={classes.itemList}>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(summoner.accountId, match, champData).summoner.stats.item0}.png`} alt="" className={classes.item}/>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(summoner.accountId, match, champData).summoner.stats.item1}.png`} alt="" className={classes.item}/>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(summoner.accountId, match, champData).summoner.stats.item2}.png`} alt="" className={classes.item}/>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(summoner.accountId, match, champData).summoner.stats.item3}.png`} alt="" className={classes.item}/>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(summoner.accountId, match, champData).summoner.stats.item4}.png`} alt="" className={classes.item}/>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(summoner.accountId, match, champData).summoner.stats.item5}.png`} alt="" className={classes.item}/>
                </Paper>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List className={classes.list}>
                    {match.participantIdentities.map((object, j) =>
                        <ListItem button key={j} className={classes.playerList}>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${matchData(match.participantIdentities[j].player.accountId, match, champData).champ.id}.png`} alt="champion icon" className={classes.playerAvatar}/>
                            {match.participantIdentities[j].player.summonerName}
                            <Typography variant="body1" className={classes.kda}>{matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.kills}/{matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.deaths}/{matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.assists}</Typography>
                            <Paper className={classes.playersItemList}>
                                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item0}.png`} alt="" className={classes.playerItem}/>
                                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item1}.png`} alt="" className={classes.playerItem}/>
                                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item2}.png`} alt="" className={classes.playerItem}/>
                                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item3}.png`} alt="" className={classes.playerItem}/>
                                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item4}.png`} alt="" className={classes.playerItem}/>
                                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${matchData(match.participantIdentities[j].player.accountId, match, champData).summoner.stats.item5}.png`} alt="" className={classes.playerItem}/>
                            </Paper>
                        </ListItem>
                    )}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
})
