import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './Context'

export default ({ component: Component, ...rest }) => (
    <AuthContext.Consumer>
        {({ state: { isAuthenticated } }) => (
            <Route {...rest} render={props => (
                isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            )} />
        )}
    </AuthContext.Consumer>
)
