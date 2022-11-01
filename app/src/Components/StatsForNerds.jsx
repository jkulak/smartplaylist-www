import React, { useState, useEffect } from "react";
import "./StatsForNerds.css";
import KeyboardHandler from "./KeyboardHandler";

const StatsForNerds = (props) => {
    const questionMarkPressed = KeyboardHandler("?");
    const escapePressed = KeyboardHandler("Escape");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (questionMarkPressed) {
            setIsVisible(true);
        }
        if (escapePressed) {
            setIsVisible(false);
        }
    }, [questionMarkPressed, escapePressed]);

    return (
        <div id="statsForNerds" className={isVisible ? undefined : "hidden"}>
            <h3>Added today</h3>
            <ul>
                <li>
                    Artists:{" "}
                    {parseInt(props.stats.artists_added).toLocaleString(
                        "en-US"
                    )}
                </li>
                <li>
                    Albums:{" "}
                    {parseInt(props.stats.albums_added).toLocaleString("en-US")}
                </li>
                <li>
                    Tracks:{" "}
                    {parseInt(props.stats.tracks_added).toLocaleString("en-US")}
                </li>
            </ul>
            <h3>Artists albums</h3>
            <ul>
                <li>
                    Oldest updated:{" "}
                    {new Date(
                        props.stats.artist_albums_updated_at_min
                    ).toLocaleString("pl-PL")}
                </li>
                <li>
                    Newest updated:{" "}
                    {new Date(
                        props.stats.artist_albums_updated_at_max
                    ).toLocaleString("pl-PL")}
                </li>
            </ul>
            <h3>Totals</h3>
            <ul>
                <li>
                    Albums:{" "}
                    {parseInt(props.stats.albums).toLocaleString("en-US")}
                </li>
                <li>
                    Artists:{" "}
                    {parseInt(props.stats.artists).toLocaleString("en-US")}
                </li>
                <li>
                    Tracks:{" "}
                    {parseInt(props.stats.tracks).toLocaleString("en-US")}
                </li>
            </ul>
            <button
                onClick={() => {
                    setIsVisible(false);
                }}
            >
                Close
            </button>
        </div>
    );
};

export default StatsForNerds;
