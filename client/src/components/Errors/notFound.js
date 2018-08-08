import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import dogeImage from '../../images/not-found-doge.jpg'

export default withStyles(() => ({
    doge: {
        height: 300,
        width: 'auto'
    },
    error: {
        textAlign: 'center'
    },
    notFound: {
        margin: '10px auto'
    },
    sorry: {
        marginTop: 20,
        letterSpacing: .3,
        transform: 'scaleY(1.2)'
    }
}))(({ classes }) => (
    <div className={classes.error}>
        <Typography variant="display4" className={classes.sorry}>
            SORRY
        </Typography>
        <Typography variant="display1" className={classes.notFound}>
            we could not find that page
        </Typography>
        <img src={dogeImage} className={classes.doge} alt="" />
    </div>
))
