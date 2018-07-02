import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
    main: {
        marginLeft: 230,
        marginTop: 40,
    },
    paper: {
        margin: '30px 100px',
        padding: '25px 40px',
    },
    title: {
        textAlign: 'center',
    }
});



const Matches = props => {
    const { classes } = props;

    if (Object.keys(props.summonerData).length === 0)
        return null;
    let summoner = (props.summonerData.matches[0].participantIdentities).filter(part => {
        return part.player.accountId == "202975356";
    });
    let partId = summoner[0].participantId;
    let champ = props.summonerData.matches[0].participants[partId].championId
    console.log(champ);

    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>Match History</Typography>

            <Paper className={classes.paper}>
            {props.summonerData.matches.map((object, i) =>
                <ExpansionPanel obj={object} key={i}>
                    <ExpansionPanelSummary>
                        <Avatar src="../../images/logo.png"/>
                        <Typography className={classes.heading}>Champion Id: {props.summonerData.matches[i].participants[i].championId}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <List>
                        {props.summonerData.matches[i].participantIdentities.map((object, j) =>
                            <ListItem button key={j}>
                                {props.summonerData.matches[i].participantIdentities[j].player.accountId}
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
