import React from "react";
import "./Stats.css";

const Stats = (props) => (
    <ul id="stats">
        <li>
            Results:
            {props.estimatedResults > 500 ? (
                <> ~{props.estimatedResults.toLocaleString("en-US")}</>
            ) : (
                <> {props.totalResults}</>
            )}
        </li>
        <li>Total tracks: {props.totalTracks.toLocaleString("en-US")}</li>
    </ul>
);

export default Stats;
