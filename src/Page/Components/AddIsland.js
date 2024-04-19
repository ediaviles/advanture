// AddIsland.js
import React, { useState } from 'react';
import './AddIsland.css'

export function AddIsland({ onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileReaders = [];
    const imageStrings = [];

    files.forEach(file => {
      const fileReader = new FileReader();
      
      fileReader.onloadend = () => {
        imageStrings.push(fileReader.result);
        if (imageStrings.length === files.length) {
          setImages(imageStrings);
        }
      };

      fileReader.readAsDataURL(file);
      fileReaders.push(fileReader);
    });
    console.log(images)
  };
  
  const handleSave = () => {
    // Here you would typically send the data to your backend or directly update your state
    onSave({ islandName: name, description: description, images: images, tags: tags });
  };

  const addTag = (newTag) => {
    setTags(prevTags => [...prevTags, newTag])
    setTag('')
  } 

  const removeTag = (tagIdx) => {
    setTags(prevTags => prevTags.filter((_, idx) => idx !== tagIdx));
  }

  return (
    <div className="add-island-container">
      <input 
        type="text" 
        placeholder="Island Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        className="input-text"
      />
      <div className="input-row">
        <textarea 
          className="description-input" 
          placeholder="Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="image-upload" className="image-upload-label"></label>
        <input 
          id="image-upload" 
          type="file" 
          multiple 
          onChange={handleImageChange} 
          className="input-file"
        />
      </div>

      <div className="image-preview-container">
        {images.map((imageSrc, idx) => (
          <img key={idx} src={imageSrc} alt={`Upload preview ${idx}`} className="image-preview" />
        ))}
      </div>

      <div className="add-tag-input-container">
        <input 
          type="text" 
          placeholder="#tag" 
          value={tag} 
          onChange={e => setTag(e.target.value)}
          className="island-tag-input"
        />
        <button onClick={() => addTag(tag)} className="add-tag-button">Add tag</button>
      </div>

      <div className="island-tags-container">
        {tags.map((tag, idx) => (
          <div key={idx} className="add-tag" onClick={() => removeTag(idx)}>
            {tag}
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Island</button>
    </div>
  );
}
