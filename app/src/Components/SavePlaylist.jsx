import React from "react";
import { FASTAPI_URL } from "./Const";
import "./SavePlaylist.css";

const SavePlaylist = (props) => {
    const savePlaylist = (accessToken, ids, name = "") => {
        let url = FASTAPI_URL;
        url += `/user/save_playlist`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
                accessToken: accessToken,
                ids: ids,
                name: name,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <a
            href="#/user/save_playlist"
            className="pure-menu-link pure-menu-enabled"
            onClick={(e) => savePlaylist(props.accessToken, props.ids)}
        >
            Save Playlist
        </a>
    );
};

export default SavePlaylist;
