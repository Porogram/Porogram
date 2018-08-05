import React, { Component, createContext } from 'react'

const Context = createContext()

class Provider extends Component {
    state = { mobileOpen: false, display: false }
    handleDisplayToggle = () => {
        console.log('display', this.state.display)
        this.setState(state => ({ display: !state.display }))
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
                    handleDisplayToggle: this.handleDisplayToggle,
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
