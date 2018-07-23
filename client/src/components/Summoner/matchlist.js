import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Match from './match'

const styles = {
    main: {
        marginLeft: 60,
        marginRight: 60,
    },
    title: {
        position: 'static',
        margin: '30px 0',
        textAlign: 'center',
    }
}

export default withStyles(styles)(
    ({ classes, summoner, matches, staticData }) => {
        return (
            <div className={classes.main}>
                <Typography variant="display2" className={classes.title}>
                    Match History
                </Typography>
                {matches.map(match =>
                    <Match
                        key={match.id}
                        match={match}
                        summoner={summoner}
                        staticData={staticData}
                    />
                )}
            </div>
        )
    }
)
