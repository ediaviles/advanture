import './IslandInfo.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { UserProfile } from '../../UserInfo'
import * as apiService from '../../services/apiService'


export function IslandInfo({ island, handleCloseIslandInfo, isFollowed, canFollow=true }) {
    const [isFavorited, setIsFavorited] = useState(isFollowed);

    const toggleFavorite = async () => {
        if (!isFavorited === true) {
            let following = UserProfile.getFollowing()
            let new_following = [...following, island._id]
            const result = await apiService.updateFollowing({username: UserProfile.getUsername(), following: new_following})
            console.log('now following!', result)
            UserProfile.setFollowing(result)
        } else {
            let following = UserProfile.getFollowing()
            let new_following = following.filter(id => id !== island._id)
            const result = await apiService.updateFollowing({username: UserProfile.getUsername(), following: new_following})
            console.log('now unfollowed!', result)
            UserProfile.setFollowing(result)
        }
        console.log(island._id)
        setIsFavorited(!isFavorited);
    }

    const renderIcon = () => {
        console.log(canFollow)
        if (canFollow === false) {
            return(<></>)
        } else {
            return (
                <FontAwesomeIcon icon={isFavorited ? faHeartSolid : faHeartRegular} onClick={toggleFavorite} className="island-favorite-icon"/>
            )
        }
    }

    return (
        <div className="island-info-container">
            <div className="island-info-header">
                <h1>{island.islandName} {renderIcon()}</h1>
                <div className="island-tags">
                    {island.tags.map((tag, index) => (
                        <span key={index} className="island-tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="islandinfo-image-container">
                {island.images.map((image, index) => {
                    return(
                    <img key={index} src={image} alt={`${island.islandName}`} className="islandinfo-image" />)
                })}
            </div>
            <p className="island-description">{island.description}</p>
            <div className="island-close-button" onClick={handleCloseIslandInfo}>✕</div>
        </div>
    );
}
