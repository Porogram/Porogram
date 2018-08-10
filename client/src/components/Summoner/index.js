import React from 'react'
import { SummonerDataContext } from '../Context'
import Summary from './Summary'

export default ({ match: { params: { summonerName } } }) => (
    <SummonerDataContext.Consumer>
        {({ getSummonerData }) => (
            <Summary
                summonerName={summonerName}
                getSummonerData={getSummonerData}
            />
        )}
    </SummonerDataContext.Consumer>
)
