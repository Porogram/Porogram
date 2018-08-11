import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Drawer, Hidden } from '@material-ui/core'
import { SidebarContext } from '../../Context'
import SidebarDrawer from './drawer'

export default withStyles(theme => ({
    drawerPaper: {
        width: theme.spacing.unit * 30
    }
}))(({ classes }) => (
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
))
