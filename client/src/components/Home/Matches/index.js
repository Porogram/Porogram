import React, { Component, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress } from '@material-ui/core'
import Match from './match'
import { Failure } from '../../Errors'
import { StaticData } from '../../Context'

export default withStyles(theme => ({
    title: {
        margin: '30px 0',
        textAlign: 'center'
    }
}))(class extends Component {
    constructor(props) {
        super(props)
        const { matchlist, matches } = props
        this.state = {
            matchlist,
            matches,
            moreItems: true,
            error: {}
        }
    }
    getMatches = () => {
        const { summoner: { accountId } } = this.props
        const { matchlist: { endIndex, totalGames }, matches } = this.state
        return axios.post('/api/matches', {
            accountId,
            beginIndex: endIndex,
            endIndex: endIndex + 10 > totalGames ? totalGames : endIndex + 10
        }).then(res => {
            const { matchlist } = res.data
            res.data.matches.forEach(match => matches.push(match))
            this.setState({
                matches,
                matchlist,
                moreItems: matchlist.endIndex < totalGames
            })
        }).catch(error => {
            this.setState({
                moreItems: false,
                error: { message: 'Failed to get more matches' }
            })
        })
    }
    render() {
        const { classes, summoner, staticData } = this.props
        const { matches, moreItems, error } = this.state
        const items = []
        matches.forEach(match => items.push((
            <StaticData.Consumer>
                {
                    value => (
                        <Match
                            key={match.gameId}
                            match={match}
                            summoner={summoner}
                            staticData={value.state}
                        />
                    )
                }
            </StaticData.Consumer>
        )))
        if ('message' in error) return <Failure error={error} />
        return (
            <Fragment>
                <Typography variant="display2" className={classes.title}>
                    Matches
                </Typography>
                <InfiniteScroll
                    loadMore={this.getMatches}
                    hasMore={moreItems}
                    initialLoad={false}
                    loader={<CircularProgress key={items.length} />}
                    threshold={100}
                >
                    {items}
                </InfiniteScroll>
            </Fragment>
        )
    }
})
