import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Details from './details'

export default withStyles(() => ({
    main: {
        marginLeft: 60,
        marginRight: 60
    },

}))(({ classes, summoner, staticData, version, matchlist, positions }) => {
    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>
                Summary Details
            </Typography>
            <Details
                summoner={summoner}
                staticData={staticData}
                version={version}
                matchlist={matchlist}
                positions={positions}

            />
        </div>
    )
})
