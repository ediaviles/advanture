import './App.css';
import React, { useState, useEffect } from 'react';
import {NavBar} from './NavBar/NavBar'
import {Page} from './Page/Page'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CreateAccount } from './Page/Components/CreateAccount'
import { Login } from './Page/Components/Login'
import { UserProfile } from './UserInfo'


function App() {
  
  const MainApp = () => {
    const [navbarIcon, setNavbarIcon] = useState(3)
    return (
      <div className={"container"}>
        <NavBar navBarIcon={navbarIcon} setNavBarIcon={setNavbarIcon}/>
        <Page navBarIcon={navbarIcon}/>
      </div>
    );
  }
  const [isLoggedIn, setIsLoggedIn] = useState(UserProfile.getUsername() !== "");

  useEffect(() => {
    const handleLoginStatusChange = () => {
      setIsLoggedIn(UserProfile.getUsername() !== "");
    };

    // Listen for the custom event
    window.addEventListener('user-login-status-changed', handleLoginStatusChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('user-login-status-changed', handleLoginStatusChange);
    };
  }, []); 

  
  return (
    <BrowserRouter>
      <Routes>
        { !isLoggedIn ? (
            <Route path="/login" element={<Login/>}/>
          ) : (
            <Route path="/login" element={<Navigate to="/"/>}/>
          )    
        }
        { isLoggedIn ? (
            <Route path="/" element={<MainApp/>}/>
          ) : (
            <Route path="/" element={<Navigate to="/login"/>}/>
          )
        }
        { !isLoggedIn ? (
            <Route path="/create-account" element={<CreateAccount/>}/>
          ) : (
            <Route path="/create-account" element={<Navigate to="/"/>}/>
          )    
        }
      </Routes>
    </BrowserRouter>
  )
 
}

export default App;
