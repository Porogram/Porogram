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
    main: {
        marginLeft: 230,
        marginTop: 90,
    },
    paper: {
        margin: '30px 100px',
        padding: '25px 40px',
    },
    title: {
        textAlign: 'center',
    },
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

const Matches = props => {

    const { classes } = props;

    if (props.summonerData.matches == null || props.summonerData.summoner == null)
        return null;

    const matchData = (index, account) => {
        let summoner = props.summonerData.matches[index].participantIdentities.filter(part => {
            return part.player.accountId == account;
        });
        let champ = Object.values(props.champData).filter(champion => {
            return champion.key == props.summonerData.matches[index].participants[summoner[0].participantId -1].championId;
        });
        let results  = {
            champ: champ[0],
            summoner: props.summonerData.matches[index].participants[summoner[0].participantId -1]
        };
        return results;
    };

    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>Match History</Typography>

            <Paper className={classes.paper}>
            {props.summonerData.matches.map((object, i) =>
                <ExpansionPanel key={i}>
                    <ExpansionPanelSummary>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/champion/${matchData(i, props.summonerData.summoner.accountId).champ.id}.png`} alt="champion icon" className={classes.avatar}/>
                        <Typography variant="headline" className={classes.champName}>{matchData(i, props.summonerData.summoner.accountId).champ.name}</Typography>
                        <Typography variant="headline" className={classes.kda}>{matchData(i, props.summonerData.summoner.accountId).summoner.stats.kills}/{matchData(i, props.summonerData.summoner.accountId).summoner.stats.deaths}/{matchData(i, props.summonerData.summoner.accountId).summoner.stats.assists}</Typography>

                        <Paper className={classes.itemList}>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.summoner.accountId).summoner.stats.item0}.png`} className={classes.item}/>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.summoner.accountId).summoner.stats.item1}.png`} className={classes.item}/>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.summoner.accountId).summoner.stats.item2}.png`} className={classes.item}/>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.summoner.accountId).summoner.stats.item3}.png`} className={classes.item}/>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.summoner.accountId).summoner.stats.item4}.png`} className={classes.item}/>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.summoner.accountId).summoner.stats.item5}.png`} className={classes.item}/>
                        </Paper>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List className={classes.list}>
                            {props.summonerData.matches[i].participantIdentities.map((object, j) =>
                                <ListItem button key={j} className={classes.playerList}>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/champion/${matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).champ.id}.png`} alt="champion icon" className={classes.playerAvatar}/>
                                    {props.summonerData.matches[i].participantIdentities[j].player.summonerName}
                                    <Typography variant="body1" className={classes.kda}>{matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.kills}/{matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.deaths}/{matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.assists}</Typography>
                                    <Paper className={classes.playersItemList}>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.item0}.png`} className={classes.playerItem}/>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.item1}.png`} className={classes.playerItem}/>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.item2}.png`} className={classes.playerItem}/>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.item3}.png`} className={classes.playerItem}/>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.item4}.png`} className={classes.playerItem}/>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/item/${matchData(i, props.summonerData.matches[i].participantIdentities[j].player.accountId).summoner.stats.item5}.png`} className={classes.playerItem}/>
                                    </Paper>
                                </ListItem>
                            )}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
            </Paper>
        </div>
    );
}

Matches.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Matches);
