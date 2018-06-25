import React from 'react';
import './sidebar.css';

const Sidebar = props => {
    return (
        <div className="sidebar">
            <h1>Summoner</h1>
            <ul>
                <li>{props.summonerData.playerOrTeamName}</li>
                <li>{props.summonerData.tier} {props.summonerData.rank}</li>
            </ul>
            { props.summonerData.profileIconVersion && props.summonerData.profileIconId &&
                <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.profileIconVersion}/img/profileicon/${props.summonerData.profileIconId}.png`} alt="profile icon"/>
            }
            <div className="options">
                <ul>
                    <li>Performance</li>
                    <li>Match History</li>
                    <li>Champion Mastery</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
