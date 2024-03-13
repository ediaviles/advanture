import {Island} from './Island'
import {SearchBar} from './SearchBar'
import './Search.css'
import React, { useState, useEffect } from 'react';
import {TagLabel} from './tagLabel'
import {UserLabel} from './UserLabel'

export function Search() {
    const dummyList = [
        {
          profile_picture: './Profile_Pictures/profile_2.jpeg',
          name: 'Laura Kerphy',
          topic: 'Bar Style Interior Design',
          island_picture: './Island_Images/island_1.png'
        },
        {
          profile_picture: './Profile_Pictures/profile_1.jpeg',
          name: 'Eli Jones',
          topic: 'Interior and Tables',
          island_picture: './Island_Images/island_2.png'
        }
    ]
    const [tagList, setTagList] = useState([])
    const [recommendedUserList, setRecommendedUserList] = useState([])
    useEffect(() => {
        //when tagList updates update recommendedUserList
        setRecommendedUserList(dummyList)
    }, [tagList])

    return (
        <div>
            <SearchBar tagList={tagList} setTagList={setTagList}/>
            <ul>
                {tagList.map((tag) => {
                    return(
                        <TagLabel tag={tag} color={'red'}/>
                    )
                })}
            </ul>
            <Island isCentered={true} isUserIsland={false} island={{id:0, island_image:"./Island_Images/island_2.png", island_tag:null}} />
            <div>
                {recommendedUserList.map((user) => {
                    return(
                        <UserLabel user={user}/>
                    )
                })}
            </div>
        </div>
    )
}