import React from 'react';
import ReactDOM from 'react-dom';

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
    return <div>Navigation</div>
}

export default Navigation;
