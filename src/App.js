import './App.css';
import React, { useState } from 'react';
import {NavBar} from './NavBar/NavBar'
import {Page} from './Page/Page'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CreateAccount } from './Page/Components/CreateAccount'
import { Login } from './Page/Components/Login'
import { UserProfile } from './UserInfo'


function App() {
  
  const MainApp = () => {
    const [navbarIcon, setNavbarIcon] = useState(2)
    return (
      <div className={"container"}>
        <NavBar navBarIcon={navbarIcon} setNavBarIcon={setNavbarIcon}/>
        <Page navBarIcon={navbarIcon}/>
      </div>
    );
  }
  const isLoggedIn = UserProfile.getUsername() !== ""
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login/>}/>
        { isLoggedIn ? (
          <Route path="/" element={<MainApp/>}/>
        ) : (
           <Route path="/" element={<Navigate to="/login"/>}/>
        )
          
        }
        <Route path="/create-account" element={<CreateAccount/>} />
      </Routes>
    </BrowserRouter>
  )
 
}

export default App;
