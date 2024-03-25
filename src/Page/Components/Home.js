import React, { useState, useEffect } from 'react';
import {Island} from './Island'
import './Home.css'
import {AddIsland} from './AddIsland'
import * as apiService from '../../services/apiService'
import { UserProfile } from '../../UserInfo'

//Islands will have three attributes, id, island_image, island_tag

export function Home() {
    const [selectedIsland, setSelectedIsland] = useState(null)
    const [islands, setIslands] = useState([])
    const [isAdding, setIsAdding] = useState(false); // State to manage AddIsland component visibility

    useEffect(() => {
        // This code will run only once after the component mounts
        // TODO: fetch users islands
        const loadIslands = async (username) => {
            try {
                const result = await apiService.getIslandsFromUser(username);
                console.log(result)
                setIslands(result);
              } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        loadIslands(UserProfile.getUsername())
    }, [])
    const handleAddIsland = async (newIsland) => {
        // Add the newIsland to the islands state
        const island = {...newIsland, owner_id: UserProfile.getUsername()}
        console.log(UserProfile.getUserId())
        try {
            const savedIsland = await apiService.saveIsland({island: island, username: UserProfile.getUsername()})
            setIslands(prevIslands => [...prevIslands, island]);
        } catch (error) {
            console.error('Error saving data: ', error)
        }
        
        setIsAdding(false); // Hide the AddIsland component after saving
    };
    return (
        // TODO: load user's island, and islands that the user is following
        <div className={"container"}>
            {isAdding && <AddIsland onSave={handleAddIsland} />}
            <Island isCentered={true} isUserIsland={true} island={{id:0, island_tag:null}} island_image={"./Island_Images/island_1.png"}/>
            {islands.map((island) => {
                return(<Island isCentered={false} isUserIsland={false} island={island} island_image={"./Island_Images/island_2.png"}/>)
            })}
            <button className='floating-button' onClick={() => setIsAdding(true)}>+</button>
        </div>
    )
}