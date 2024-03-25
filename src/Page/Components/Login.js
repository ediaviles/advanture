import React, { useState } from 'react';
import './Login.css'; // Make sure to create a corresponding CSS file
import * as apiService from '../../services/apiService'
import { UserProfile } from '../../UserInfo'
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here
    const handleLogin = async (userData) => {
        try {
            const result = await apiService.loginUser(userData)
            UserProfile.loginUser(result)
            navigate('/')
        } catch (error) {
            console.log('Incorrect username or password: ', error)
        }
    }
    handleLogin({username: username, password: password})
    console.log(username, password);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">✔</button>
          <div className="footer">
            <span onClick={() => {navigate('/create-account')}}>Don't have an account?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

