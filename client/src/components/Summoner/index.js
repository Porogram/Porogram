import React from 'react'
import { SummonerDataContext } from '../Context'
import Summoner from './summoner'

export default ({ match: { params: { summonerName } } }) => (
    <SummonerDataContext.Consumer>
        {({ getSummonerData }) => (
            <Summoner
                summonerName={summonerName}
                getSummonerData={getSummonerData}
            />
        )}
    </SummonerDataContext.Consumer>
)
