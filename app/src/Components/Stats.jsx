import React from "react";
import "./Stats.css";

const Stats = (props) => (
    <span>
        Results:
        {props.estimatedResults > 500 ? (
            <> ~{props.estimatedResults.toLocaleString("en-US")}</>
        ) : (
            <> {props.totalResults}</>
        )}
    </span>
);

export default Stats;
