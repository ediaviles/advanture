import { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService'
import { UserProfile } from '../../UserInfo'
import './Recommended.css'

export function Recommended() {
    const [recommendedProjects, setRecommendedProjects] = useState([])

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

    return (
        <div className="recommended-grid">
          {recommendedProjects.map((project, index) => (
            <div key={index} className="recommended-item">
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
}