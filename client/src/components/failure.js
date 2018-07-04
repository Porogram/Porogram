import React from 'react';

const Failure = props => {
    return (
        <div>
            <h1>ERROR</h1>
            <h2>STATUS CODE: {props.location.state.error.status_code}</h2>
            <h2>MESSAGE: {props.location.state.error.message}</h2>
        </div>
    );
}

export default Failure;
