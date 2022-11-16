import React from "react";
import "./Loader.css";

const Loader = (props) => {
    return (
        <div>
            {props.isLoading !== 0 && (
                <div className="loadingio-spinner-spinner-h20oygmmml">
                    <div className="ldio-2ut23a1a9kb">
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
                </div>
            )}
        </div>
    );
};

export default Loader;
