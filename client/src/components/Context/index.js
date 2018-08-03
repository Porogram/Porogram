import React, { Component, createContext } from 'react'

const { Provider, Consumer } = createContext()

export class Provider extends Component {
    state = { mobileOpen: false }
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
    render() {
        const { children } = this.props
        return (
            <Provider value={this.handleDrawerToggle}>
                {children}
            </Provider>
        )
    }
}

export const Consumer
