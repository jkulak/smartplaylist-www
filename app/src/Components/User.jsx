import React from "react";
import "./User.css";

const User = (props) => {
    return (
        <span className="link" onClick={() => props.onClick()}>
            Log out
        </span>
    );
};

export default User;
