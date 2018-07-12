import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    Drawer: {
        width: 240,
        marginTop: 75,
    },
    Avatar: {
        width: 100,
        height: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 10,
    },
    listText: {
        fontFamily: 'Lato',
        fontSize: 25,
        fontWeight: 300,
    },
    sidebar: {
        textAlign: 'center',
        fontFamily: 'Lato'
    },
    h1: {
        fontFamily: 'Lato',
        fontWeight: 400
    },
    h2: {
        fontSize: 20,
        fontWeight: 400
    },
    li: {
        listStyle: 'none'
    },
    ul: {
        padding: 0
    },
    profile: {
        marginBottom: 25
    },
    tier: {
        display: 'inline-block',
        textTransform: 'uppercase'
    }
});

const Sidebar = props => {
    const { classes } = props;
    if (!props.positions || !props.summoner || !props.version)
        return null;
    return (
        <Drawer variant='permanent' classes={{paper: classes.Drawer}}>
        <div className={classes.sidebar}>
            <div className={classes.profile}>
                <h1 className={classes.h1}>{props.positions.playerOrTeamName}</h1>
                <Avatar src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/profileicon/${props.summoner.profileIconId}.png`} alt="profile icon" className={classes.Avatar} />
                <h2 className={classes.h2}><div className={classes.tier}>{props.positions.tier}</div> {props.positions.rank}</h2>
            </div>
            <Divider />
            <div className="options">
                <ul className={classes.ul}>
                    <ListItem button>
                        <ListItemText primary="Match History" classes={{primary: classes.listText}}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Performance" classes={{primary: classes.listText}}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Champions" classes={{primary: classes.listText}}/>
                    </ListItem>
                </ul>
            </div>
        </div>
        </Drawer>
    );
}
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
