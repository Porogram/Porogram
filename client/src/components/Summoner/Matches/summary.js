import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Typography,
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
}))(({ participants, summonerIndex, version, classes }) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    return (
        <Fragment>
            {participants[summonerIndex].champion && (
                <Fragment>
                    <Avatar
                        src={`${baseUrl}cdn/${version}/img/champion/${participants[summonerIndex].champion}.png`}
                        alt=""
                        className={classes.avatar}
                    />
                    <Typography variant="headline" className={classes.kda}>
                        {participants[summonerIndex].champion}
                    </Typography>
                </Fragment>
            )}
            <Typography variant="headline" className={classes.kda}>
                {participants[summonerIndex].stats.kills}/
                {participants[summonerIndex].stats.deaths}/
                {participants[summonerIndex].stats.assists}
            </Typography>
            <Grid
                container direction="column"
                className={classes.doubleIcon}
                justify="center"
            >
                {participants[summonerIndex].rune1 ? (
                    <Image
                        src={`${baseUrl}cdn/img/${participants[summonerIndex].rune1}`}
                        classes={classes.img}
                    />
                ) : <Empty classes={classes.img} />}
                {participants[summonerIndex].rune1 ? (
                    <Image
                        src={`${baseUrl}cdn/img/${participants[summonerIndex].rune2}`}
                        classes={classes.secondary}
                    />
                ) : <Empty classes={classes.secondary} />}
            </Grid>
            <Grid
                container direction="column"
                className={classes.doubleIcon}
            >
                {participants[summonerIndex].summonerSpell1 ? (
                    <Image
                        src={`${baseUrl}cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell1}.png`}
                        classes={classes.item}
                    />
                ) : <Empty classes={classes.item} />}
                {participants[summonerIndex].summonerSpell2 ? (
                    <Image
                        src={`${baseUrl}cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell2}.png`}
                        classes={classes.item}
                    />
                ) : <Empty classes={classes.item} />}
            </Grid>
            <div className={classes.items}>
                {[...Array(6).keys()].map(i =>
                    participants[summonerIndex].stats[`item${i}`] === 0 ? (
                        <Empty classes={classes.item} key={i} />
                    ) : (
                        <img
                            src={`${baseUrl}cdn/${version}/img/item/${participants[summonerIndex].stats[`item${i}`]}.png`}
                            alt=""
                            className={classes.item}
                            key={i}
                        />
                    )
                )}
            </div>
            {participants[summonerIndex].stats[`item6`] === 0 ? (
                <Empty classes={classes.trinket} />
            ) : (
                <img
                    src={`${baseUrl}cdn/${version}/img/item/${participants[summonerIndex].stats[`item6`]}.png`}
                    alt=""
                    className={classes.trinket}
                />
            )}
        </Fragment>
    )
})
