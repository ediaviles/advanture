import React from 'react';
import './UserLabel.css';

export function UserLabel({ user }) {
    return (
        <div className="user-label">
            <img src={require(`${user.profile_picture}`)} alt={user.name} className="user-profile-picture"/>
            <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-topic">{user.topic}</div>
            </div>
            <div className='island-image-container'>
                <img src={require(`${user.island_picture}`)} alt="Island" className="island-image"/>
            </div>
        </div>
    );
}
