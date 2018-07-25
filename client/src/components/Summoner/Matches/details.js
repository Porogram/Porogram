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
import notFoundDoge from '../../../images/not-found-doge.jpg'

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

const Empty = ({ cn }) => {
    return (
        <img
            src={notFoundDoge}
            alt=""
            className={cn}
        />
    )
}

export default ({ match, match: { participants, participantIdentities, summonerIndex }, staticData, staticData: { version, champions, summonerSpells, runes }, classes }) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    return (
        <List className={classes.list}>
            {participants.map((participant, participantIndex) =>
                <ListItem
                    button
                    key={participantIndex}
                    onClick={() =>
                        this.getSummoner(participantIdentities[participantIndex])
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
                        ) : <Empty className={classes.img} />}
                        {participant.rune2 ? (
                            <Image
                                src={`${baseUrl}cdn/img/${participant.rune2}`}
                                classes={classes.secondary}
                            />
                        ) : <Empty className={classes.secondary} />}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        className={classes.doubleIcon}
                    >
                        {participant.spell1Id === 0 ?
                            <Empty className={classes.item} /> : (
                            <Image
                                src={`${baseUrl}cdn/${version}/img/spell/${participant.summonerSpell1}.png`}
                                classes={classes.item}
                            />
                        )}
                        {participant.spell2Id === 0 ?
                            <Empty className={classes.item} /> : (
                            <Image
                                src={`${baseUrl}cdn/${version}/img/spell/${participant.summonerSpell2}.png`}
                                classes={classes.item}
                            />
                        )}
                    </Grid>
                    <div className={classes.items}>
                        {[...Array(6).keys()].map(i =>
                            participant.stats[`item${i}`] === 0 ? (
                                <img
                                    src={notFoundDoge}
                                    alt=""
                                    className={classes.item}
                                    key={i}
                                />
                            ) : (
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
                        <Empty className={classes.item} /> : (
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
}
