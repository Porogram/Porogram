import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Drawer,
    Divider,
    Avatar,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core'

export default withStyles(() => ({
    Drawer: {
        position: 'static'
    },
    Avatar: {
        width: 100,
        height: 100,
        margin: '10px auto'
    },
    listText: {
        fontSize: 22,
        fontWeight: 300
    },
    sidebar: {
        textAlign: 'center',
        fontFamily: 'Lato'
    },
    profile: {
        marginBottom: 25,
        marginTop: 15
    }
}))(({
    classes,
    positions,
    positions: { tier, rank },
    summoner,
    summoner: { name, profileIconId },
    version
}) => {
    return (
        <Drawer variant='permanent' classes={{ paper: classes.Drawer }}>
            <div className={classes.sidebar}>
                <div className={classes.profile}>
                    {name && <Typography variant='display1'>{name}</Typography>}
                    {version && profileIconId && (
                        <Avatar
                            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
                            alt="profile icon"
                            className={classes.Avatar}
                        />
                    )}
                    {tier && rank && (
                        <Typography variant='subheading'>
                            {`${tier} ${rank}`}
                        </Typography>
                    )}
                </div>
                <Divider />
                <ListItem button>
                    <ListItemText
                        primary="Summary"
                        classes={{ primary: classes.listText }}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemText
                        primary="Matches"
                        classes={{ primary: classes.listText }}
                    />
                </ListItem>
            </div>
        </Drawer>
    )
})
