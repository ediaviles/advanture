// AddIsland.js
import React, { useState } from 'react';

export function AddIsland({ onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleSave = () => {
    // Here you would typically send the data to your backend or directly update your state
    onSave({ name: name, description: description, images: images, island_image: './Island_Images/island_2.png' });
  };

  return (
    <div className="add-island-container">
      <input type="text" placeholder="Island Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      {/* Implement image upload logic here */}
      <button onClick={handleSave}>Save Island</button>
    </div>
  );
}
