import React, { Component, Fragment } from 'react'
import { Subscribe } from 'unstated'
import { withStyles } from '@material-ui/core/styles'
import {
    Drawer,
    Divider,
    Avatar,
    ListItem,
    ListItemText,
    Typography,
    Hidden
} from '@material-ui/core'
import Container from '../Container'

const drawerWidth = 200

export default withStyles(theme => ({
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
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative'
        }
    },
}))(({
    classes,
    positions: { tier, rank },
    summoner: { name, profileIconId },
    version,
}) => {
    const drawer = (
        <div>
            <Hidden smDown>
                <div className={classes.toolbar} />
            </Hidden>
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
        </div>
    )
    return (
        <Subscribe to={[Container]}>
            {
                sidebar => (
                    <Fragment>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                open={sidebar.state.mobileOpen}
                                onClose={sidebar.handleDrawerToggle}
                                classes={{
                                  paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                  keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                variant="permanent"
                                open
                                classes={{
                                  paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </Fragment>
                )
            }
        </Subscribe>
    )
})
