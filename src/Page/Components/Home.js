import React, { useState, useEffect } from 'react';
import {Island} from './Island'

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
            <Island isUserIsland={true} island={null}/>
            {islands.map((island) => {
                <Island isUserIsland={false} island={island}/>
            })}
            <button>+</button>
        </div>
    )
}