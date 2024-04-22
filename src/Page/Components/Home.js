import React, { useState, useEffect } from 'react';
import {Island} from './Island'
import './Home.css'
import {AddIsland} from './AddIsland'
import * as apiService from '../../services/apiService'
import { UserProfile } from '../../UserInfo'
import { IslandInfo } from './IslandInfo';


//Islands will have three attributes, id, island_image, island_tag

export function Home() {
    const [islandDisplay, setIslandDisplay] = useState(-1)
    const [islands, setIslands] = useState([])
    const [isAdding, setIsAdding] = useState(false); // State to manage AddIsland component visibility
    
    const handleSetIslandDisplay = (idx) => {
        setIslandDisplay(idx)
    }
    const handleCloseIslandInfo = () => {
        setIslandDisplay(-1)
    }


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
            setIslands(prevIslands => [...prevIslands, savedIsland]);
        } catch (error) {
            console.error('Error saving data: ', error)
        }
        
        setIsAdding(false); // Hide the AddIsland component after saving
    };
    const homePage = () => {
        console.log(islandDisplay)
        if (islandDisplay === -1) {
            return (
                <div className={"home-container"}>
                    {isAdding && <AddIsland onSave={handleAddIsland} />}
                    <Island isCentered={true} isUserIsland={true} island={{id:0, island_tag:null}} island_image={"./Island_Images/island_1.png"} idx={-1} displayIsland={handleSetIslandDisplay}/>
                    
                    <div className="islands-container">
                        {islands.map((island, idx) => {
                            return(<Island isCentered={false} isUserIsland={false} island={island} island_image={"./Island_Images/island_2.png"} idx={idx} displayIsland={handleSetIslandDisplay} />)
                        })}
                    </div>
                    <button className='floating-button' onClick={() => setIsAdding(true)}>+</button>
                </div> 
            )
        } else {
            return (
                <IslandInfo island={islands[islandDisplay]} handleCloseIslandInfo={handleCloseIslandInfo} isFollowed={false} canFollow={false}/>
            )
        }
    }

    return homePage()
}