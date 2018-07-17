import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    Drawer: {
        position: 'static',
    },
    Avatar: {
        width: 100,
        height: 100,
        margin: '10px auto',
    },
    listText: {
        fontSize: 22,
        fontWeight: 300,
    },
    sidebar: {
        textAlign: 'center',
        fontFamily: 'Lato'
    },
    profile: {
        marginBottom: 25,
        marginTop: 15,
    },
})

export default withStyles(styles)(props => {
    const { classes } = props
    if (!props.positions || !props.summoner || !props.version)
        return null
    return (
        <Drawer variant='permanent' classes={{paper: classes.Drawer}}>
            <div className={classes.sidebar}>
                <div className={classes.profile}>
                    <Typography variant='display1'>{props.positions.playerOrTeamName}</Typography>
                    <Avatar src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/profileicon/${props.summoner.profileIconId}.png`} alt="profile icon" className={classes.Avatar} />
                    <Typography variant='subheading'>{props.positions.tier + ' ' + props.positions.rank}</Typography>
                </div>
                <Divider />
                <div>
                    <ListItem button>
                        <ListItemText primary="Match History" classes={{primary: classes.listText}}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Performance" classes={{primary: classes.listText}}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Champions" classes={{primary: classes.listText}}/>
                    </ListItem>
                </div>
            </div>
        </Drawer>
    )
})
