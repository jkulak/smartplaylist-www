import React, { useEffect } from "react";
import "./LoginPage.css";

const CLIENT_ID =
    process.env.NODE_ENV === "production"
        ? "da581e129b9c40b8a6048468d61b304d"
        : "15b63d73610d491fa65412cb91f0eddb";
const REDIRECT_URI =
    process.env.NODE_ENV === "production"
        ? "https://smartplaylist.me/"
        : "http://localhost:3001/";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
    "user-library-read",
    "user-read-recently-played",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "playlist-read-private",
];

const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
};

const getReturnedParams = (hash) => {
    const stringAfterHastag = hash.substring(1);
    const paramsInUrl = stringAfterHastag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});
    return paramsSplitUp;
};

const LoginPage = (props) => {
    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParams(
                window.location.hash
            );
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("tokenType", token_type);
            window.location.hash = "";

            // get user id from the API, if correct - we are logged in
            // or skip for now
            props.logInUser(true);
        }
    });
    return (
        <div id="loginPage">
            {/* <img src={imgLogo} alt="" /> */}
            <h1>Smart Playlists</h1>
            <span className="link" onClick={handleLogin}>
                Continue with Spotify
            </span>
        </div>
    );
};

export default LoginPage;
