import React from "react";
import "./header.css";


const Logo = () => {
    return (
        <h1 className="logo" >Simon Templating App</h1>
    )
};

const Header = () => {
    return (
        <div className="header">
            <Logo />
        </div>
    )
};

export default Header;