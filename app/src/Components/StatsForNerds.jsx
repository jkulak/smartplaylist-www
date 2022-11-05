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
            <h3>Last.fm</h3>
            <ul>
                <li>
                    Artists with NULL tags:{" "}
                    {parseInt(
                        props.stats.artists_with_null_lastfm_tags
                    ).toLocaleString("en-US")}
                </li>
                <li>
                    Albums with NULL tags:{" "}
                    {parseInt(
                        props.stats.albums_with_null_lastfm_tags
                    ).toLocaleString("en-US")}
                </li>
                <li>
                    Tracks with NULL tags:{" "}
                    {parseInt(
                        props.stats.tracks_with_null_lastfm_tags
                    ).toLocaleString("en-US")}
                </li>
            </ul>
            <h3>Last.fm tags added</h3>
            <ul>
                <li>
                    For artists:{" "}
                    {parseInt(
                        props.stats.artists_lastfm_tags_added
                    ).toLocaleString("en-US")}
                </li>
                <li>
                    For albums:{" "}
                    {parseInt(
                        props.stats.albums_lastfm_tags_added
                    ).toLocaleString("en-US")}
                </li>
                <li>
                    For tracks:{" "}
                    {parseInt(
                        props.stats.tracks_lastfm_tags_added
                    ).toLocaleString("en-US")}
                </li>
            </ul>
            <h3>Totals</h3>
            <ul>
                <li>
                    Artists:{" "}
                    {parseInt(props.stats.artists).toLocaleString("en-US")}
                </li>
                <li>
                    Albums:{" "}
                    {parseInt(props.stats.albums).toLocaleString("en-US")}
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
