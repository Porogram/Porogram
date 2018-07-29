import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
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
}))(({ classes, summoner, matches, staticData }) => {
    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>
                Matches
            </Typography>
            <InfiniteScroll
                loadMore={() => console.log('load more!')}
            >
                {matches.map(match =>
                    <Match
                        key={match.gameId}
                        match={match}
                        summoner={summoner}
                        staticData={staticData}
                    />
                )}
            </InfiniteScroll>
        </div>
    )
})
