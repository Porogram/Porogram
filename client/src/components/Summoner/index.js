import React from 'react'
import { Consumer } from '../context'
import Summoner from './Summoner'

export default ({ match: { params: { summonerName } } }) => (
    <Consumer>
        {({ getSummonerData }) => (
            <Summoner
                summonerName={summonerName}
                getSummonerData={getSummonerData}
            />
        )}
    </Consumer>
)
