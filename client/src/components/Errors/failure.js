import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import dogeImage from '../../images/error-doge.jpg'

const styles = theme => ({
    error: {
        textAlign: 'center',
    },
    failure: {
        letterSpacing: .3,
        transform: 'scaleY(1.2)',
        marginTop: 20,
    },
    status: {
        color: '#0080ff',
        fontWeight: 400,
        letterSpacing: .5,
    },
    notFound: {
        margin: '10px auto',
    },
    doge: {
        height: 300,
        width: 'auto',
    }
})

export default withStyles(styles)(props => {
    const { classes, error } = props
    return (
        <div className={classes.error}>
            <Typography variant="display4" className={classes.failure}>ERROR</Typography>
            {'status_code' in error && <Typography variant="subheading" className={classes.status}>STATUS CODE: {error.status_code}</Typography>}
            {'message' in error && <Typography variant="subheading" className={classes.status}>MESSAGE: {error.message}</Typography>}
            <img src={dogeImage} className={classes.doge}/>
        </div>
    )
})
