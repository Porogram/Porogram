import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Grid, ListItem, Typography } from '@material-ui/core'
import { Consumer } from '../../../../context'
import { notFoundDoge } from '../../../../../images/error'

export default withStyles(theme => ({
    champion: {
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing.unit * 4,
            width: theme.spacing.unit * 4
        },
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing.unit * 5,
            width: theme.spacing.unit * 5
        },
        marginRight: theme.spacing.unit * 0.5
    },
    item: {
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing.unit * 2,
            width: theme.spacing.unit * 2
        },
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing.unit * 3,
            width: theme.spacing.unit * 3
        }
    },
    name: {
        textDecoration: 'none'
    }
}))(({
    classes,
    participant: { championId, stats },
    participantIdentity: { player: { summonerName } }
}) => (
    <Consumer>
        {({ baseUrl, state: { champions, items, version } }) => (
            <ListItem button>
                <Grid alignItems="center" container>
                    <Grid item xs={2}>
                        <Avatar
                            className={classes.champion}
                            src={`${baseUrl}/cdn/${version}/img/champion/${champions[championId].image.full}`}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Link className={classes.name} to={`/${summonerName}`}>
                            <Typography noWrap>{summonerName}</Typography>
                        </Link>
                    </Grid>
                    <Grid container item xs={6}>
                        {[...Array(7).keys()].map(j => (
                            <Grid item key={j}>
                                <img
                                    alt=""
                                    className={classes.item}
                                    src={items[stats[`item${j}`]]
                                    ? `${baseUrl}/cdn/${version}/img/item/${items[stats[`item${j}`]].image.full}`
                                    : notFoundDoge}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </ListItem>
        )}
    </Consumer>
))
