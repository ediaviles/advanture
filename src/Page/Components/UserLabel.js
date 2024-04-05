import React from 'react';
import './UserLabel.css';

export function UserLabel({ island, profile_picture, island_picture, idx, handleSetIslandDisplay }) {
    return (
        <div className="user-label" onClick={() => {handleSetIslandDisplay(idx)}}>
            <img src={require(`${profile_picture}`)} alt={island.name} className="user-profile-picture"/>
            <div className="user-details">
                <div className="user-name">{island.owner_id}</div>
                <div className="user-topic">{island.islandName}</div>
            </div>
            <div className='island-image-container'>
                <img src={require(`${island_picture}`)} alt="Island" className="island-image"/>
            </div>
        </div>
    );
}
