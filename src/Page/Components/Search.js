import {Island} from './Island'
import {SearchBar} from './SearchBar'
import './Search.css'
import React, { useState, useEffect } from 'react';
import {TagLabel} from './tagLabel'
import {UserLabel} from './UserLabel'
import { IslandInfo } from './IslandInfo';
import { UserProfile } from '../../UserInfo';

export function Search() {
    const [tagList, setTagList] = useState([])
    const [recommendedUserList, setRecommendedUserList] = useState([])
    const [islandDisplay, setIslandDisplay] = useState(-1)
    // useEffect(() => {
    //     //when tagList updates update recommendedUserList
    //     setRecommendedUserList()
    // }, [tagList])
    const handleSetIslandDisplay = (idx) => {
        setIslandDisplay(idx)
    }
    const handleCloseIslandInfo = () => {
        setIslandDisplay(-1)
    }

    const handleRemoveTag = (tagIdx) => {
        setTagList(prevTags => prevTags.filter((_, idx) => idx !== tagIdx))
    }

    const searchPage = () => {
        if (islandDisplay === -1) {
            return (
                <div>
                    <SearchBar tagList={tagList} setTagList={setTagList} setRecommendedUserList={setRecommendedUserList}/>
                    
                    <div>
                        {tagList.map((tag, idx) => {
                            return(
                                <TagLabel tag={tag} color={'red'} handleRemove={handleRemoveTag} idx={idx}/>
                            )
                        })}
                    </div>
                    <Island isCentered={true} isUserIsland={false} island={{id:0, island_tag:null}} island_image={"./Island_Images/island_2.png"}/>
                    <div>
                        {recommendedUserList.map((island, idx) => {
                            return(
                                <UserLabel handleSetIslandDisplay={handleSetIslandDisplay} idx={idx} island={island} profile_picture={'./Profile_Pictures/blank_pp.png'} island_picture={'./Island_Images/island_1.png'}/>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <IslandInfo island={recommendedUserList[islandDisplay]} handleCloseIslandInfo={handleCloseIslandInfo} isFollowed={UserProfile.getFollowing().includes(recommendedUserList[islandDisplay]._id)}/>
            )
        }
    }
    
    return searchPage()
}