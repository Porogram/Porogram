import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Match from './match'

const styles = theme => ({
    main: {
        marginLeft: 60,
        marginRight: 60,
    },
    title: {
        position: 'static',
        margin: '30px 0',
        textAlign: 'center',
    }
})

export default withStyles(styles)(props => {
    const { classes, summoner, matches, version, champData } = props
    console.log(champData)
    console.log(summoner)
    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>Match History</Typography>
            {matches.map((match, i) =>
                <Match
                    key={i}
                    match={match}
                    version={version}
                    summoner={summoner}
                    champData={champData}
                />
            )}
        </div>
    )
})
