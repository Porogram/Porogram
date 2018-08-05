import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, CardHeader } from '@material-ui/core'
// import Empty from './empty'

export default withStyles(() => ({

}))(({
    summoner: { name, profileIconId },
    positions: { tier, rank },
    version,
    classes
}) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    return (
        <Fragment>
            <CardHeader
                avatar={
                    <Avatar
                        src={`${baseUrl}cdn/${version}/img/profileicon/${profileIconId}.png`}
                        alt=""
                    />
                }
                title={name}
                subheader={`${tier} ${rank}`}
            >

            </CardHeader>
        </Fragment>
    )
})
