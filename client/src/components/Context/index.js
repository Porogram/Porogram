import React, { Component, createContext } from 'react'

const Context = createContext()

export class Provider extends Component {
    state = { mobileOpen: false }
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    state: this.state,
                    handleDrawerToggle: this.handleDrawerToggle
                }}
            >
                {children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
