import React, { Fragment } from 'react'
// import { AuthContext, SummonerDataContext } from '../Context'
import { Consumer } from '../context'
import Login from './Login'
import Loading from '../loading'
import Feed from './Feed'

export default () => (
    <Consumer>
        {({ state: { fetchedData, isAuthenticated } }) => (
            <Fragment>
                {!isAuthenticated && <Login />}
                {isAuthenticated && !fetchedData && <Loading />}
                {fetchedData && <Feed />}
            </Fragment>
        )}
    </Consumer>
)

// <AuthContext.Consumer>
//     {({ state: { isAuthenticated } }) => (
//         <SummonerDataContext.Consumer>
//             {({ state: { searched, fetchedData } }) => (
//                 <Fragment>
//                     {!isAuthenticated && <Login />}
//                     {isAuthenticated && !fetchedData && <Loading />}
//                     {fetchedData && <Feed />}
//                 </Fragment>
//             )}
//         </SummonerDataContext.Consumer>
//     )}
// </AuthContext.Consumer>
