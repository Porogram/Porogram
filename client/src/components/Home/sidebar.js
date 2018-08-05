import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Drawer,
    Avatar,
    Typography,
    Hidden
} from '@material-ui/core'
import { SidebarContext, StaticDataContext } from '../Context'

export default withRouter(withStyles(theme => ({
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
        width: 240
    }
}))(({
    classes,
    positions: { tier, rank },
    summoner: { name, profileIconId },
    location: { pathname }
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
}))
