import {Island} from './Island'
import {SearchBar} from './SearchBar'
import './Search.css'
import React, { useState } from 'react';

export function Search() {
    const [tagList, setTagList] = useState([])

    return (
        <div>
            <SearchBar tagList={tagList} setTagList={setTagList}/>
            <ul>
                {tagList.map((tag) => {
                    return(<li>{tag}</li>)
                })}
            </ul>
            <Island isCentered={true} isUserIsland={false} island={{id:0, island_image:"./Island_Images/island_2.png", island_tag:null}} />
        </div>
    )
}