import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    img: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    }
});

const Navbar = props => {
    const { classes } = props;
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Link to="/"><img className={classes.img} src="./favicon.png" alt="logo" /></Link>
                <Typography variant="title" color="inherit">
                    LOL Stats
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
