import React from "react";
import ReactDOM from "react-dom";
import "./pure.css";
import "./index.css";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap');
        </style>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
