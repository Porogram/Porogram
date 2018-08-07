import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Drawer,
    Avatar,
    Typography,
    Hidden
} from '@material-ui/core'
import { SidebarContext, StaticDataContext } from '../Context'

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
}))(({
    classes,
    positions: { tier, rank },
    summoner: { name, profileIconId }
}) => {
    const drawer = (
        <StaticDataContext.Consumer>
            {
                value => (
                    <Fragment>
                        <Hidden smDown>
                            <div className={classes.toolbar} />
                        </Hidden>
                        <div className={classes.sidebar}>
                            <div className={classes.profile}>
                                {name && <Typography variant='display1'>{name}</Typography>}
                                {profileIconId && (
                                    <Avatar
                                        src={`http://ddragon.leagueoflegends.com/cdn/${value.state.version}/img/profileicon/${profileIconId}.png`}
                                        alt=""
                                        className={classes.Avatar}
                                    />
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
        </StaticDataContext.Consumer>
    )
    return (
        <Fragment>
            <Hidden mdUp>
                <SidebarContext.Consumer>
                    {
                        value => (
                            <Drawer
                                variant="temporary"
                                open={value.state.mobileOpen}
                                onClose={value.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true
                                }}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                {drawer}
                            </Drawer>
                        )
                    }
                </SidebarContext.Consumer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </Fragment>
    )
})
