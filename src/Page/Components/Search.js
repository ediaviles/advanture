import {Island} from './Island'
import {SearchBar} from './SearchBar'
import './Search.css'
import React, { useState, useEffect } from 'react';
import {TagLabel} from './tagLabel'
import {UserLabel} from './UserLabel'
import { IslandInfo } from './IslandInfo';

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

    const searchPage = () => {
        if (islandDisplay === -1) {
            return (
                <div>
                    <SearchBar tagList={tagList} setTagList={setTagList} setRecommendedUserList={setRecommendedUserList}/>
                    
                    <ul>
                        {tagList.map((tag) => {
                            return(
                                <TagLabel tag={tag} color={'red'}/>
                            )
                        })}
                    </ul>
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
                <IslandInfo island={recommendedUserList[islandDisplay]} handleCloseIslandInfo={handleCloseIslandInfo}/>
            )
        }
    }
    
    return searchPage()
}