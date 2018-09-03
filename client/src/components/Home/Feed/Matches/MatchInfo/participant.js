import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Avatar,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core'
import { StaticDataContext } from '../../../../Context'

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
}))(({ classes, participant, participantIdentity }) => (
    <StaticDataContext.Consumer>
        {({ baseUrl, state: { champions, items, version } }) => (
            <ListItem button>
                <Grid
                    alignItems="center"
                    container
                >
                    <Grid item xs={2}>
                        <Avatar
                            className={classes.champion}
                            src={`${baseUrl}/cdn/${version}/img/champion/${champions[participant.championId].image.full}`}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Link
                            className={classes.name}
                            to={`/${participantIdentity.player.summonerName}`}
                        >
                            <Typography noWrap>
                                {participantIdentity.player.summonerName}
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid container item xs={6}>
                        {[...Array(7).keys()].map(j => (
                            <Grid item key={j}>
                                {items[participant.stats[`item${j}`]]
                                && (
                                    <img
                                        alt=""
                                        className={classes.item}
                                        src={`${baseUrl}/cdn/${version}/img/item/${items[participant.stats[`item${j}`]].image.full}`}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </ListItem>
        )}
    </StaticDataContext.Consumer>
))
