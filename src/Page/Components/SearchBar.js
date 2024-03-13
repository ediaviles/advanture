import './SearchBar.css'
import React, { useState } from 'react';

export function SearchBar({tagList, setTagList}) {
    const [tag, setTag] = useState("")

    const handleChange = (e) => {
        setTag(e.target.value);
    };

    const handleAddClick = () => {
        // Handle the click event for adding the tag
        setTagList([...tagList, tag])
        // Add your logic to handle the tag addition here
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