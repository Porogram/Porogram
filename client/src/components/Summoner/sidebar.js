import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
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
    version,
    location: { pathname }
}) => {
    const drawer = (
        <Fragment>
            <Hidden smDown>
                <div className={classes.toolbar} />
            </Hidden>
            <div className={classes.sidebar}>
                <div className={classes.profile}>
                    {name && <Typography variant='display1'>{name}</Typography>}
                    {version && profileIconId && (
                        <Avatar
                            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
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
                <Divider />
                <ListItem button component={Link} to={`/summoner/${name}/summary`}>
                    <ListItemText
                        primary="Summary"
                        classes={{ primary: classes.listText }}
                    />
                </ListItem>
                <ListItem button component={Link} to={`/summoner/${name}/matches`}>
                    <ListItemText
                        primary="Matches"
                        classes={{ primary: classes.listText }}
                    />
                </ListItem>
            </div>
        </Fragment>
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
                                ModalProps={{
                                    keepMounted: true
                                }}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                {drawer}
                            </Drawer>
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
            }
        </Subscribe>
    )
}))
