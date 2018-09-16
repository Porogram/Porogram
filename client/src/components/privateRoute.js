import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Consumer } from './context'

export default ({ component: Component, ...rest }) => (
    <Consumer>
        {({ state: { isAuthenticated } }) => (
            <Route {...rest} render={props => (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )
            )} />
        )}
    </Consumer>
)
