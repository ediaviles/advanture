import './SearchBar.css'
import React, { useState } from 'react';
import * as apiService from '../../services/apiService'


export function SearchBar({tagList, setTagList}) {
    const [tag, setTag] = useState("")

    const handleChange = (e) => {
        setTag(e.target.value);
    };

    const handleAddClick = () => {
        // Handle the click event for adding the tag
        const newTagList = [...tagList, tag]
        
        // Add your logic to handle the tag addition here
        const getIslandsFromTagList = async(tags) => {
          try {
            console.log(tags)
            const result = await apiService.getIslandsFromTags({tags: tags})
            console.log(result)
          } catch (error) {
            console.log('Error fetching data: ', error)
          }
        }
        getIslandsFromTagList(newTagList)
        setTagList(newTagList)
    };
    return (
    <div className="tag-input-container">
      <input 
        type="text" 
        className="tag-input" 
        value={tag} 
        onChange={handleChange} 
        placeholder="#interior-design" // Placeholder text if needed
      />
      <button className="add-button" onClick={handleAddClick}>Add</button>
    </div>
    )
}