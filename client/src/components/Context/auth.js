import React, { Component, createContext } from 'react'

const Context = createContext()

class Provider extends Component {
    state = { isAuthenticated: false }
    login = () => {
        this.setState({ isAuthenticated: true })
    }
    logout = () => {
        this.setState({ isAuthenticated: false })
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    login: this.login,
                    logout: this.logout,
                    state: this.state
                 }}
            >
                {children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export default { Provider, Consumer }
