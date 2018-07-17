import React, { Component, Fragment } from 'react'
import Search from './search'
import { Failure } from '../Errors'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = { error: false }
    }
    componentDidUpdate() {
        if (!this.state.error && 'error' in this.props.location.state) {
            this.setState({ error: true })
        }
    }
    render() {
        const { error } = this.state
        const { location: { state }} = this.props
        return (
            <Fragment>
                <Search />
                {error && <Failure error={state.error} />}
            </Fragment>
        )
    }
}
