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
        const { matchlist: { beginIndex, endIndex }, matches } = props
        this.state = {
            beginIndex,
            endIndex,
            matches,
            moreItems: true
        }
    }
    getMatches = () => {
        const { summoner: { accountId }, matchlist: { endIndex } } = this.props
        return axios.get('/api/matches/', {
            accountId,
            beginIndex: endIndex,
            endIndex: endIndex + 10
        }).then(res => this.setState({
            beginIndex: res.data.matchlist.beginIndex,
            endIndex: res.data.matchlist.endIndex,
            matches: res.data.matches
        }))
    }
    render() {
        const { classes, summoner, staticData } = this.props
        const { matches } = this.state
        const items = []
        items.push(matches.map(match => (
            <Match
                key={match.gameId}
                match={match}
                summoner={summoner}
                staticData={staticData}
            />
        )))
        return (
            <div className={classes.main}>
                <Typography variant="display2" className={classes.title}>
                    Matches
                </Typography>
                <InfiniteScroll
                    loadMore={() => console.log('load more!')}
                    loader={<CircularProgress />}
                >
                    {items}
                </InfiniteScroll>
            </div>
        )
    }
})
