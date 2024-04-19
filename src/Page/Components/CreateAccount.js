import React, { useState } from 'react';
import './CreateAccount.css'; // Make sure to create a corresponding CSS file
import * as apiService from '../../services/apiService'
import { UserProfile } from '../../UserInfo'
import { useNavigate } from 'react-router-dom';



export const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    interests: [],
  });
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData({
        ...formData,
        [parentKey]: {
          ...formData[parentKey],
          [childKey]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: call api to create user, update session, redirect user
    const postNewUser = async (userData) => {
        try {
            const result = await apiService.createUser(userData)
            console.log(result)
            UserProfile.loginUser(result)
            navigate('/')
        } catch (error) {
            console.log('Error posting data: ', error)
        }
    }
    console.log(formData);
    // Here you would typically send this data to a server
    postNewUser(formData)
  };

  const handleInterestClick = (interest) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      interests: prevFormData.interests.includes(interest)
        ? prevFormData.interests.filter(i => i !== interest)
        : [...prevFormData.interests, interest]
    }));
  };

  const interests = ["interior design", "architecture", "cooking", "furniture", "sports", "fashion", "film", "art", "comics", "health", "medicine", "design", "politics", "books", "hardware"];

  return (
    <div className="create-account-container">
      <form className="create-account-form" onSubmit={handleSubmit}>
        <h1>Make an account</h1>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className="interests-container">
          <p>What are your interests?</p>
          <div className="interests-tags">
            {interests.map((interest, index) => (
              <div 
                key={index} 
                className={`interest-tag ${formData.interests.includes(interest) ? 'selected' : ''}`} 
                onClick={() => handleInterestClick(interest)}>
                #{interest}
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
