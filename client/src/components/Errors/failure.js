import React from 'react';

const showStatusCode = error => {
    if ('status_code' in error)
        return <h2>STATUS CODE: {error.status_code}</h2>;
}

const showMessage = error => {
    if ('message' in error)
        return <h2>MESSAGE: {error.message}</h2>;
}

export default props => {
    return (
        <div>
            <h1>ERROR</h1>
            {showStatusCode(props.error)}
            {showMessage(props.error)}
        </div>
    );
}
