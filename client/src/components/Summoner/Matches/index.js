import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress } from '@material-ui/core'
import Match from './match'

export default withStyles(theme => ({
    main: {
        marginRight: 60,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 60
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 300
        },
        toolbar: theme.mixins.toolbar
    },
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
            moreItems: true
        }
    }
    getMatches = () => {
        console.log('getMatches')
        const { summoner: { accountId } } = this.props
        const { matchlist: { beginIndex, endIndex } } = this.state
        if (endIndex - beginIndex < 10)
            return this.setState({ moreItems: false })
        return axios.post('/api/matches', {
            accountId,
            beginIndex: endIndex,
            endIndex: endIndex + 10
        }).then(res => {
            console.log(res.data)
            const matches = this.state.matches
            res.data.matches.forEach(match => matches.push(match))
            this.setState(prevState => {
                return {
                    matches,
                    matchlist: res.data.matchlist
                }
            })
        }).catch(error => {
            console.log(error)
            this.setState({ moreItems: false })
        })
    }
    render() {
        const { classes, summoner, staticData } = this.props
        const { matches, moreItems } = this.state
        const items = []
        // console.log('matchlist', matchlist)
        console.log('matches', matches)
        // console.log('moreItems', moreItems)
        matches.forEach(match =>
            items.push(
                <Match
                    key={match.gameId}
                    match={match}
                    summoner={summoner}
                    staticData={staticData}
                />
            ))
        return (
            <div className={classes.main}>
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
            </div>
        )
    }
})
