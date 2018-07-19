import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Drawer, Divider, Avatar, ListItem, ListItemText, Typography } from '@material-ui/core'

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
    const { positions, summoner, version } = props
    return (
        <Drawer variant='permanent' classes={{paper: classes.Drawer}}>
            <div className={classes.sidebar}>
                <div className={classes.profile}>
                    {'playerOrTeamName' in positions &&
                        <Typography variant='display1'>{positions.playerOrTeamName}</Typography>}
                    {'profileIconId' in summoner && version &&
                        <Avatar
                            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
                            alt="profile icon"
                            className={classes.Avatar}
                        />}
                    {'tier' in positions && 'rank' in positions &&
                        <Typography variant='subheading'>{positions.tier + ' ' + positions.rank}</Typography>}
                </div>
                <Divider />
                <div>
                    <ListItem button>
                        <ListItemText primary="Summary" classes={{primary: classes.listText}}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Matches" classes={{primary: classes.listText}}/>
                    </ListItem>
                </div>
            </div>
        </Drawer>
    )
})
