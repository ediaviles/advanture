import React, { useState, useEffect } from 'react';
import {Island} from './Island'
import './Home.css'
//Islands will have three attributes, id, island_image, island_tag

export function Home() {
    const [selectedIsland, setSelectedIsland] = useState(null)
    const [islands, setIslands] = useState([])
    useEffect(() => {
        // This code will run only once after the component mounts
        // TODO: fetch users islands
    }, [])
    return (
        // TODO: load user's island, and islands that the user is following
        <div className={"container"}>
            <Island isCentered={true} isUserIsland={true} island={{id:0, island_image:"./Island_Images/island_1.png", island_tag:null}}/>
            {islands.map((island) => {
                return(<Island isCentered={false} isUserIsland={false} island={island}/>)
            })}
            <button className='floating-button'>+</button>
        </div>
    )
}