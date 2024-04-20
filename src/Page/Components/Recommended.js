import { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService'
import { UserProfile } from '../../UserInfo'
import './Recommended.css'
import { IslandInfo } from './IslandInfo';


export function Recommended() {
    const [recommendedProjects, setRecommendedProjects] = useState([])
    const [islandDisplay, setIslandDisplay] = useState(-1)

    useEffect(() => {
        const loadRecommendedIslands = async (interests) => {
            try {
                const result = await apiService.getIslandsFromTags({tags: interests})
                console.log(result)
                setRecommendedProjects(result)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        console.log(UserProfile.getInterests())
        loadRecommendedIslands(UserProfile.getInterests())
    }, [])

    const handleSetIslandDisplay = (idx) => {
        setIslandDisplay(idx)
    }
    const handleCloseIslandInfo = () => {
        setIslandDisplay(-1)
    }

    const recommendedPage = () => {
        if (islandDisplay === -1) {

            return (
                <div className="recommended-grid">
                  {recommendedProjects.map((project, index) => (
                    <div key={index} className="recommended-item" onClick={() => {handleSetIslandDisplay(index)}}>
                      {/* Assuming `project.images[0]` is a Base64 string */}
                      <img
                        src={project.images[0]} // Directly binding the Base64 string
                        alt={project.name}
                        className="recommended-image"
                      />
                    </div>
                  ))}
                </div>
              );
        } else {
            return (
                <IslandInfo island={recommendedProjects[islandDisplay]} handleCloseIslandInfo={handleCloseIslandInfo} isFollowed={UserProfile.getFollowing().includes(recommendedProjects[islandDisplay]._id)}/>
            )
        }
    }

    return recommendedPage()
}