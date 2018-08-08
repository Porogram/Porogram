import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Drawer, Hidden, Typography } from '@material-ui/core'
import {
    SidebarContext,
    StaticDataContext,
    SummonerDataContext
} from '../../Context'
import SidebarDrawer from './drawer'

export default withStyles(theme => ({
    Avatar: {
        width: theme.spacing.unit * 12,
        height: theme.spacing.unit * 12,
        margin: `${theme.spacing.unit}px auto`
    },
    drawerPaper: {
        width: theme.spacing.unit * 30
    },
    profile: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3
    },
    sidebar: {
        textAlign: 'center'
    },
    toolbar: theme.mixins.toolbar
}))(({ classes }) => {
    const drawer = (
        <SummonerDataContext.Consumer>
            {
                ({
                    state: { positions: { tier, rank },
                    summoner: { name, profileIconId } }
                }) => (
                    <Fragment>
                        <Hidden smDown>
                            <div className={classes.toolbar} />
                        </Hidden>
                        <div className={classes.sidebar}>
                            <div className={classes.profile}>
                                {name && <Typography variant='display1'>{name}</Typography>}
                                {profileIconId && (
                                    <StaticDataContext.Consumer>
                                        {({ state: { version } }) => (
                                            <Avatar
                                                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
                                                alt=""
                                                className={classes.Avatar}
                                            />
                                        )}
                                    </StaticDataContext.Consumer>
                                )}
                                {tier && rank && (
                                    <Typography variant='subheading'>
                                        {`${tier} ${rank}`}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </SummonerDataContext.Consumer>
    )
    return (
        <Fragment>
            <Hidden mdUp>
                <SidebarContext.Consumer>
                    {({ state: { mobileOpen }, handleDrawerToggle }) => (
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{ keepMounted: true }}
                            classes={{ paper: classes.drawerPaper }}
                        >
                            <SidebarDrawer />
                        </Drawer>
                    )}
                </SidebarContext.Consumer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    variant="permanent"
                    open
                    classes={{ paper: classes.drawerPaper }}
                >
                    <SidebarDrawer />
                </Drawer>
            </Hidden>
        </Fragment>
    )
})
