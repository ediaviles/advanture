// AddIsland.js
import React, { useState } from 'react';

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
      <input type="text" placeholder="Island Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" multiple onChange={handleImageChange} />
      {tags.map((tag, idx) => {
        return(
          <ul onClick={() => removeTag(idx)}>
            {tag}
          </ul>
        )
      })}
      <input type="text" placeholder="#tag" value={tag} onChange={e => setTag(e.target.value)}/><button onClick={() => addTag(tag)}>Add tag</button>
      {/* Implement image upload logic here */}
      <button onClick={handleSave}>Save Island</button>
    </div>
  );
}
