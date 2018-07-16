import React, { Fragment } from 'react';
import Search from '../search';
import Failure from '../Errors/failure';

const showError = props => {
    if (props.location.state && 'error' in props.location.state) {
        return <Failure error={props.location.state.error} />;
    }
}

export default props => {
    return (
        <Fragment>
            <Search />
            {showError(props)}
        </Fragment>
    );
}
