import React from 'react';
import './sidebar.css';

const Sidebar = props => {
    if (Object.keys(props.summonerData).length === 0)
        return null;
    return (
        <div className="sidebar">
            <h1>Summoner</h1>
            <ul>
                <li>{props.summonerData.positions.playerOrTeamName}</li>
                <li>{props.summonerData.positions.tier} {props.summonerData.positions.rank}</li>
            </ul>
            <img src={`http://ddragon.leagueoflegends.com/cdn/${props.summonerData.version}/img/profileicon/${props.summonerData.summoner.profileIconId}.png`} alt="profile icon"/>
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
