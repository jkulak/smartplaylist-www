import React from "react";
import "./Menu.css";

const Menu = (props) => {
    return (
        <span className="link" onClick={() => props.onClick()}>
            Log out
        </span>
    );
};

export default Menu;
