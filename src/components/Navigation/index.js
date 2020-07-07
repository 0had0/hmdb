import React from 'react';
import ReactDOM from 'react-dom';

import {
    AppBar,
    AppBarTitle,
  AppBarNav,
  AppBarAction,
  APP_BAR_OFFSET_CLASSNAME,
  Grid
} from 'react-md';

import { MenuSVGIcon, SearchSVGIcon } from "@react-md/material-icons";

const NAVBAR = document.getElementById("navbar");

const Navigation = () => {
    const node = document.createElement('div');
    
    React.useEffect(() => {
        NAVBAR.appendChild(node);
        return () => NAVBAR.removeChild(node);
    }, []);
    
    return ReactDOM.createPortal(<NavBar/>, node);
}

const NavBar = () => {
    return (
        <>
      <AppBar id="main-app-bar">
            <AppBarNav aria-label="Navigation">
                <MenuSVGIcon />
            </AppBarNav>
            <AppBarTitle>
                My Company's Name
            </AppBarTitle>
            <AppBarAction id="search" aria-label="Search">
                <SearchSVGIcon />
            </AppBarAction>
        </AppBar>
    </>
    )
}

export default Navigation;
