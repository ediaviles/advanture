import './App.css';
import React, { useState, useEffect } from 'react';
import {NavBar} from './NavBar/NavBar'
import {Page} from './Page/Page'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateAccount } from './Page/Components/CreateAccount'


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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp/>} />
        <Route path="/create-account" element={<CreateAccount/>} />
      </Routes>
    </BrowserRouter>
  )
 
}

export default App;
