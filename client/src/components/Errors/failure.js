import React, { Fragment } from 'react'

export default ({ error }) => {
    return (
        <Fragment>
            <h1>ERROR</h1>
            {'status_code' in error && <h2>STATUS CODE: {error.status_code}</h2>}
            {'message' in error && <h2>MESSAGE: {error.message}</h2>}
        </Fragment>
    )
}
