import React from "react";
import "./Menu.css";

const Menu = (props) => {
    return (
        <ul>
            <li className="link" onClick={() => props.onClick()}>
                Log out
            </li>
        </ul>
    );
};

export default Menu;
