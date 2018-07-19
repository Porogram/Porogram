import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper , Typography } from '@material-ui/core'
import Match from './match'

const styles = theme => ({
    main: {
        marginLeft: 60,
        marginRight: 60,
    },
    paper: {
        padding: '25px 30px',
        position: 'static',
    },
    title: {
        position: 'static',
        margin: '30px 0',
        textAlign: 'center',
    },
})

export default withStyles(styles)(props => {
    const { classes, summoner, matches, version, champData } = props
    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>Match History</Typography>
            <Paper className={classes.paper}>
                {matches.map((object, i) =>
                    <Match className={classes.match}
                        key={i}
                        match={matches[i]}
                        version={version}
                        summoner={summoner}
                        champData={champData}
                    />
                )}
            </Paper>
        </div>
    )
})
