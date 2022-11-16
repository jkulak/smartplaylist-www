import React from "react";
import "./Stats.css";
import { DEFAULT_TRACK_LIST_LENGTH } from "./Const";

const Stats = (props) => (
    <span>
        Results:
        {props.estimatedResults > DEFAULT_TRACK_LIST_LENGTH ? (
            <> ~{props.estimatedResults.toLocaleString("en-US")}</>
        ) : (
            <> {props.totalResults}</>
        )}
    </span>
);

export default Stats;
