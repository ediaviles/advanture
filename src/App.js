import './App.css';
import React, { useState, useEffect } from 'react';
import {NavBar} from './NavBar/NavBar'
import {Page} from './Page/Page'


function App() {
  const [navbarIcon, setNavbarIcon] = useState(2)

  return (
    <div className={"container"}>
      <NavBar navBarIcon={navbarIcon} setNavBarIcon={setNavbarIcon}/>
      <Page navBarIcon={navbarIcon}/>
    </div>
  );
}

export default App;
