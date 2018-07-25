import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    ExpansionPanelSummary,
    Typography,
    List,
    ListItem,
    Avatar,
    Divider,
    Grid
} from '@material-ui/core'
import Empty from './empty'

const Image = ({ src, classes }) => {
    return (
        <Grid item>
            <img
                src={src}
                alt=""
                className={classes}
            />
        </Grid>
    )
}

export default withStyles(() => ({
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    champName: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    item: {
        height: 30,
        width: 30
    },
    items: {
        width: '13%'
    },
    img: {
        height: 30,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    playerList: {
        fontSize: 15,
        padding: '5px 10px'
    },
    playersItemList: {
        marginRight: 0
    },
    playerItem: {
        width: 30,
        height: 30,
        margin: 4
    },
    playerAvatar: {
        width: 40,
        height: 40,
        marginRight: 20
    },
    list: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%'
    },
    kda: {
        width: '15%',
        display: 'block',
        margin: 'auto 10px'
    },
    doubleIcon: {
        width: '5%'
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
            {participants.map((participant, participantIndex) =>
                <ListItem
                    button
                    key={participantIndex}
                    onClick={() =>
                        getSummoner(participantIdentities[participantIndex])
                    }
                    className={classes.playerList}
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
                        {participant.rune1 ? (
                            <Image
                                src={`${baseUrl}cdn/img/${participant.rune1}`}
                                classes={classes.img}
                            />
                        ) : <Empty cn={classes.img} />}
                        {participant.rune2 ? (
                            <Image
                                src={`${baseUrl}cdn/img/${participant.rune2}`}
                                classes={classes.secondary}
                            />
                        ) : <Empty cn={classes.secondary} />}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        className={classes.doubleIcon}
                    >
                        {participant.spell1Id === 0 ?
                            <Empty cn={classes.item} /> : (
                            <Image
                                src={`${baseUrl}cdn/${version}/img/spell/${participant.summonerSpell1}.png`}
                                classes={classes.item}
                            />
                        )}
                        {participant.spell2Id === 0 ?
                            <Empty cn={classes.item} /> : (
                            <Image
                                src={`${baseUrl}cdn/${version}/img/spell/${participant.summonerSpell2}.png`}
                                classes={classes.item}
                            />
                        )}
                    </Grid>
                    <div className={classes.items}>
                        {[...Array(6).keys()].map(i =>
                            participant.stats[`item${i}`] === 0 ?
                                <Empty cn={classes.item} />  : (
                                <img
                                    src={`${baseUrl}cdn/${version}/img/item/${participant.stats[`item${i}`]}.png`}
                                    alt=""
                                    className={classes.item}
                                    key={i}
                                />
                            )
                        )}
                    </div>
                    {participant.stats[`item6`] === 0 ?
                        <Empty cn={classes.item} /> : (
                        <img
                            src={`${baseUrl}cdn/${version}/img/item/${participant.stats[`item6`]}.png`}
                            alt=""
                            className={classes.trinket}
                        />
                    )}
                </ListItem>
            )}
        </List>
    )
})
