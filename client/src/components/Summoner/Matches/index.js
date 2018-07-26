import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Match from './match'

export default withStyles(() => ({
    main: {
        marginLeft: 60,
        marginRight: 60
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
            {matches.map(match =>
                <Match
                    key={match.gameId}
                    match={match}
                    summoner={summoner}
                    staticData={staticData}
                />
            )}
        </div>
    )
})
