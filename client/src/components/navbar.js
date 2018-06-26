import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './navbar.css';

const Navbar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/"><img src="./favicon.png" alt="logo" /></Link>
                    <Typography variant="title" color="inherit">
                        LOL Stats
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
