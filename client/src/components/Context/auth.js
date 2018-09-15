import React, { Component, createContext } from 'react'
import { setAuthorizationToken } from '../Utils'

const Context = createContext()

class Provider extends Component {
    state = { isAuthenticated: false }
    componentDidMount() {
        if (localStorage.jwtToken) {
            setAuthorizationToken(localStorage.jwtToken)
            // TODO: somehow call getSummonerData
            // this.setState({ isAuthenticated: true })
        }
    }
    login = () => {
        return this.setState({ isAuthenticated: true })
    }
    logout = () => {
        return this.setState({ isAuthenticated: false })
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
