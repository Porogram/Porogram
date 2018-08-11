import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, List, ListItem, Avatar, Grid } from '@material-ui/core'
import Empty from './empty'

export default withStyles(() => ({
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    doubleIcon: {
        width: '5%'
    },
    img: {
        height: 30,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    item: {
        height: 30,
        width: 30
    },
    items: {
        width: '13%'
    },
    kda: {
        width: '15%',
        display: 'block',
        margin: 'auto 10px'
    },
    list: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%'
    },
    playerAvatar: {
        width: 40,
        height: 40,
        marginRight: 20
    },
    victory: {
        fontSize: 15,
        padding: '5px 10px',
        backgroundColor: '#374785',
        borderTop: '2px solid #232d55',
        borderBottom: '2px solid #232d55',
        borderLeft: '4px solid #232d55',
        borderRight: '4px solid #232d55',
        '&:hover': {
            backgroundColor: '#232d55'
        }
    },
    defeat: {
        fontSize: 15,
        padding: '5px 10px',
        backgroundColor: '#F76C6C',
        borderTop: '2px solid #f32c2c',
        borderBottom: '2px solid #f32c2c',
        borderLeft: '4px solid #f32c2c',
        borderRight: '4px solid #f32c2c',
        '&:hover': {
            backgroundColor: '#f32c2c'
        }
    },
    secondary: {
        height: 26,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    trinket: {
        height: 30,
        display: 'block',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
}))(({ participants, participantIdentities, version, getSummoner, classes }) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    return (
        <List className={classes.list}>
            {participants.map((participant, participantIndex) => (
                <Fragment key={participantIndex}>
                    {participantIndex === 0 || participantIndex === 5 ? (
                        <Typography variant="display2">
                            {participants[participantIndex].stats.win ? 'Victory' : 'Defeat'}
                        </Typography>
                    ): ""}
                    <ListItem
                        button
                        onClick={() =>
                            getSummoner(participantIdentities[participantIndex])
                        }
                        className={participants[participantIndex].stats.win ? classes.victory : classes.defeat}
                    >
                        {participant.champion && (
                            <Avatar
                                src={`${baseUrl}cdn/${version}/img/champion/${participant.champion}.png`}
                                alt=""
                                className={classes.playerAvatar}
                            />
                        )}
                        {participantIdentities[participantIndex].player.summonerName && (
                            <Typography
                                variant="body2"
                                className={classes.kda}
                            >
                                {participantIdentities[participantIndex].player.summonerName}
                            </Typography>
                        )}
                        <Typography
                            variant="body1"
                            className={classes.kda}
                        >
                            {participant.stats.kills}/
                            {participant.stats.deaths}/
                            {participant.stats.assists}
                        </Typography>
                        <Grid
                            container
                            direction="column"
                            className={classes.doubleIcon}
                            justify="center"
                        >
                            {[...Array(2).keys()].map(i => (
                                <Grid item key={i} >
                                    {participant[`rune${i + 1}`] ? (
                                        <img
                                            src={`${baseUrl}cdn/img/${participant[`rune${i + 1}`]}`}
                                            alt=""
                                            className={classes.img}
                                        />
                                    ) : <Empty classes={classes.img} />}
                                </Grid>
                            ))}
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            className={classes.doubleIcon}
                        >
                            {[...Array(2).keys()].map(i => (
                                <Grid item key={i} >
                                    {participant[`summonerSpell${i + 1}`] ? (
                                        <img
                                            src={`${baseUrl}cdn/${version}/img/spell/${participant[`summonerSpell${i + 1}`]}.png`}
                                            alt=""
                                            className={classes.img}
                                        />
                                    ) : <Empty classes={classes.img} />}
                                </Grid>
                            ))}
                        </Grid>
                        <div className={classes.items}>
                            {[...Array(6).keys()].map(i =>
                                participant.stats[`item${i}`] !== 0 ? (
                                    <img
                                        src={`${baseUrl}cdn/${version}/img/item/${participant.stats[`item${i}`]}.png`}
                                        alt=""
                                        className={classes.item}
                                        key={i}
                                    />
                                ) : <Empty key={i} classes={classes.item} />
                            )}
                        </div>
                        {participant.stats[`item6`] !== 0 ? (
                            <img
                                src={`${baseUrl}cdn/${version}/img/item/${participant.stats[`item6`]}.png`}
                                alt=""
                                className={classes.trinket}
                            />
                        ) : <Empty classes={classes.item} />}
                    </ListItem>
                </Fragment>
            ))}
        </List>
    )
})
