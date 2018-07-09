import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../css/sidebar.css';

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

});

const Sidebar = props => {
    const { classes } = props;
    if (props.positions == null || props.summoner == null || props.version == null)
        return null;
    return (
        <Drawer variant='permanent' classes={{paper: classes.Drawer}}>
        <div className="sidebar">
            <div className="profile">
                <h1>{props.positions.playerOrTeamName}</h1>
                <Avatar src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/profileicon/${props.summoner.profileIconId}.png`} alt="profile icon" className={classes.Avatar} />
                <h2><div className="tier">{props.positions.tier}</div> {props.positions.rank}</h2>
            </div>
            <Divider />
            <div className="options">
                <ul>
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
