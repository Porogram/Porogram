import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


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
});

const Match = props => {

        const { classes } = props;

        if (props.champData == null || props.match == null || props.version == null || props.summoner == null)
            return null;

        const matchData = (account) => {
            let summoner = props.match.participantIdentities.filter(part => {
                return part.player.accountId === account;
            });
            let champ = Object.values(props.champData).filter(champion => {
                return champion.key == props.match.participants[summoner[0].participantId -1].championId;
            });
            let results  = {
                champ: champ[0],
                summoner: props.match.participants[summoner[0].participantId -1]
            };
            return results;
        };

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${matchData(props.summoner.accountId).champ.id}.png`} alt="champion icon" className={classes.avatar}/>
                    <Typography variant="headline" className={classes.champName}>{matchData(props.summoner.accountId).champ.name}</Typography>
                    <Typography variant="headline" className={classes.kda}>{matchData(props.summoner.accountId).summoner.stats.kills}/{matchData(props.summoner.accountId).summoner.stats.deaths}/{matchData(props.summoner.accountId).summoner.stats.assists}</Typography>

                    <Paper className={classes.itemList}>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.summoner.accountId).summoner.stats.item0}.png`} alt="" className={classes.item}/>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.summoner.accountId).summoner.stats.item1}.png`} alt="" className={classes.item}/>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.summoner.accountId).summoner.stats.item2}.png`} alt="" className={classes.item}/>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.summoner.accountId).summoner.stats.item3}.png`} alt="" className={classes.item}/>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.summoner.accountId).summoner.stats.item4}.png`} alt="" className={classes.item}/>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.summoner.accountId).summoner.stats.item5}.png`} alt="" className={classes.item}/>
                    </Paper>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List className={classes.list}>
                        {props.match.participantIdentities.map((object, j) =>
                            <ListItem button key={j} className={classes.playerList}>
                                <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${matchData(props.match.participantIdentities[j].player.accountId).champ.id}.png`} alt="champion icon" className={classes.playerAvatar}/>
                                {props.match.participantIdentities[j].player.summonerName}
                                <Typography variant="body1" className={classes.kda}>{matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.kills}/{matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.deaths}/{matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.assists}</Typography>
                                <Paper className={classes.playersItemList}>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.item0}.png`} alt="" className={classes.playerItem}/>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.item1}.png`} alt="" className={classes.playerItem}/>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.item2}.png`} alt="" className={classes.playerItem}/>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.item3}.png`} alt="" className={classes.playerItem}/>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.item4}.png`} alt="" className={classes.playerItem}/>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${matchData(props.match.participantIdentities[j].player.accountId).summoner.stats.item5}.png`} alt="" className={classes.playerItem}/>
                                </Paper>
                            </ListItem>
                        )}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );

}

Match.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Match);
