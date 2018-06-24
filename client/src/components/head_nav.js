import React from 'react';
import { Link } from 'react-router-dom';
import './head_nav.css';

const HeadNav = () => {
    return (
        <nav className="navbar navbar-light">
        <Link to="/"><img src="./favicon.png" alt="logo" />LOL Stats</Link>
        </nav>
    );
}

export default HeadNav;
