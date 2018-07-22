import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import dogeImage from '../../images/not-found-doge.jpg'

const styles = theme => ({
    error: {
        textAlign: 'center',
    },
    sorry: {
        marginTop: 20,
        letterSpacing: .3,
        transform: 'scaleY(1.2)',
    },
    notFound: {
        margin: '10px auto',
    },
    doge: {
        height: 300,
        width: 'auto',
    }
})

export default withStyles(styles) (props => {
    const {classes} = props
    return (
        <div className={classes.error}>
            <Typography variant="display4" className={classes.sorry}>SORRY</Typography>
            <Typography variant="display1" className={classes.notFound}>we could not find that page</Typography>
            <img src={dogeImage} className={classes.doge} alt="" />
        </div>
    )
})
