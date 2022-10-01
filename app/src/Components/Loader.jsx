import React from "react";
import "./Loader.css";

const Loader = (props) => {
    return (
        <div>
            {props.isLoading !== 0 && (
                <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default Loader;
