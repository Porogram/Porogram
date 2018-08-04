import React, { Component, createContext } from 'react'

const Context = createContext()

class Provider extends Component {
    state = { mobileOpen: false }
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider value={{
                state: this.state,
                handleDrawerToggle: this.handleDrawerToggle
            }}>
                {children}
            </Context.Provider>
        )
    }
}

const { Consumer } = Context

export { Provider, Consumer }
