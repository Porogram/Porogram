import React from 'react'
import { SummonerDataContext } from '../Context'
import Profile from './profile'

export default ({ match: { params: { summonerName } } }) => (
    <SummonerDataContext.Consumer>
        {({ getSummonerData }) => (
            <Profile
                summonerName={summonerName}
                getSummonerData={getSummonerData}
            />
        )}
    </SummonerDataContext.Consumer>
)
