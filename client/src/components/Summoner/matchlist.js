import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Match from './match'

export default withStyles(() => ({
    main: {
        marginLeft: 60,
        marginRight: 60,
    },
    title: {
        position: 'static',
        margin: '30px 0',
        textAlign: 'center',
    }
}))(({ classes, summoner, matches, staticData }) => {
    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>
                Match History
            </Typography>
            {matches.map((match, i) =>
                <Match
                    key={i}
                    match={match}
                    summoner={summoner}
                    staticData={staticData}
                />
            )}
        </div>
    )
})
