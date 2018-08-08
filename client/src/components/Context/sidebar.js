import React, { Component, createContext } from 'react'

const Context = createContext()

class Provider extends Component {
    state = { mobileOpen: false, displayIcon: false }
    handleDisplayIconToggle = () => {
        console.log('handleDisplayIconToggle')
        this.setState(state => ({ displayIcon: !state.displayIcon }))
    }
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    state: this.state,
                    handleDisplayIconToggle: this.handleDisplayIconToggle,
                    handleDrawerToggle: this.handleDrawerToggle
                }}
            >
                {children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export default { Provider, Consumer }
