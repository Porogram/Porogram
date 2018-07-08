import React from 'react';
import Search from './search';
import Failure from './failure';

const showError = props => {
    if (props.location.state && 'error' in props.location.state) {
        return <Failure error={props.location.state.error}/>;
    }
}

const Home = props => {
    return (
        <div className="Home">
            <Search />
            {showError(props)}
        </div>
    );
}

export default Home;
