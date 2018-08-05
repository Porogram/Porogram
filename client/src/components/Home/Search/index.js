import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from './searchBar'

export default withStyles(theme => ({
    main: {
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        [theme.breakpoints.up('md')]: {
            width: 600
        },
        [theme.breakpoints.down('sm')]: {
            width: 300
        }
    }
}))(({ classes, getSummonerData }) => {
    return (
        <div className={classes.main}>
            <div className={classes.search}>
                <SearchBar getSummonerData={getSummonerData} />
            </div>
        </div>
    )
})
