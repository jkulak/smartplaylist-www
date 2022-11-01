import React from "react";
import TrackKey from "./TrackKey";
import PlayController from "./PlayController";
import "./TrackList.css";
import Highlighter from "react-highlight-words";

const TrackList = (props) => {
    const queryList = props.values.query
        .trim()
        .replace(/\s\s+/g, " ")
        .split(",");
    const genresList = props.values.genres
        .trim()
        .replace(/\s\s+/g, " ")
        .split(",");

    return (
        <div id="tracks">
            <h2>Tracks</h2>
            {props.tracks.length > 0 && (
                <table className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Play</th>
                            <th>Artists</th>
                            <th>Title</th>
                            <th>Genres</th>
                            <th>Release date</th>
                            {props.values.showColumnTempo === "true" && (
                                <th>Tempo (bpm)</th>
                            )}
                            {props.values.showColumnPopularity === "true" && (
                                <th>
                                    Track popularity
                                    <br />
                                    [0-100]
                                </th>
                            )}
                            {props.values.showColumnMainArtistPopularity ===
                                "true" && (
                                <th>
                                    Main artist popularity
                                    <br />
                                    [0-100]
                                </th>
                            )}
                            {props.values.showColumnMainArtistFollowers ===
                                "true" && (
                                <th>
                                    Main artist followers
                                    <br />
                                    [0-50mln]
                                </th>
                            )}
                            {props.values.showColumnDanceability === "true" && (
                                <th>
                                    Danceability
                                    <br />
                                    [0-1000]
                                </th>
                            )}
                            {props.values.showColumnEnergy === "true" && (
                                <th>
                                    Energy
                                    <br />
                                    [0-1000]
                                </th>
                            )}
                            {props.values.showColumnSpeechiness === "true" && (
                                <th>
                                    Speechiness
                                    <br />
                                    [0-1000]
                                </th>
                            )}
                            {props.values.showColumnAcousticness === "true" && (
                                <th>
                                    Acousticness
                                    <br />
                                    [0-1000]
                                </th>
                            )}
                            {props.values.showColumnInstrumentalness ===
                                "true" && (
                                <th>
                                    Instrumentalness
                                    <br />
                                    [0-1000]
                                </th>
                            )}
                            {props.values.showColumnLiveness === "true" && (
                                <th>
                                    Liveness
                                    <br />
                                    [0-1000]
                                </th>
                            )}
                            {props.values.showColumnValence === "true" && (
                                <th>
                                    Valence
                                    <br />
                                    [0-1000]
                                </th>
                            )}
                            <th>Key</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.tracks.map((track, i) => (
                            <tr key={track.spotify_id}>
                                <td>{i + 1}</td>
                                <td>
                                    <PlayController
                                        onPlayClick={() =>
                                            props.onPlayClick(track.preview_url)
                                        }
                                    />
                                </td>
                                <td>
                                    {track.all_artists.map((artist, i) => (
                                        <span key={i}>
                                            {i > 0 && ", "}
                                            <Highlighter
                                                highlightClassName="highlight"
                                                highlightTag="span"
                                                searchWords={queryList}
                                                autoEscape={false}
                                                textToHighlight={artist}
                                            />
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <Highlighter
                                        highlightClassName="highlight"
                                        highlightTag="span"
                                        searchWords={queryList}
                                        autoEscape={false}
                                        textToHighlight={track.name}
                                    />
                                </td>
                                <td>
                                    {track.genres.map((genre, i) => (
                                        <span key={i}>
                                            {i > 0 && ", "}
                                            <Highlighter
                                                highlightClassName="highlight"
                                                highlightTag="span"
                                                searchWords={genresList}
                                                autoEscape={false}
                                                textToHighlight={genre}
                                            />
                                        </span>
                                    ))}
                                </td>

                                <td>{track.release_date}</td>
                                {props.values.showColumnTempo === "true" && (
                                    <td>{track.tempo}</td>
                                )}
                                {props.values.showColumnPopularity ===
                                    "true" && <td>{track.popularity}</td>}
                                {props.values.showColumnMainArtistPopularity ===
                                    "true" && (
                                    <td>{track.main_artist_popularity}</td>
                                )}
                                {props.values.showColumnMainArtistFollowers ===
                                    "true" && (
                                    <td>{track.main_artist_followers}</td>
                                )}
                                {props.values.showColumnDanceability ===
                                    "true" && <td>{track.danceability}</td>}
                                {props.values.showColumnEnergy === "true" && (
                                    <td>{track.energy}</td>
                                )}
                                {props.values.showColumnSpeechiness ===
                                    "true" && <td>{track.speechiness}</td>}
                                {props.values.showColumnAcousticness ===
                                    "true" && <td>{track.acousticness}</td>}
                                {props.values.showColumnInstrumentalness ===
                                    "true" && <td>{track.instrumentalness}</td>}
                                {props.values.showColumnLiveness === "true" && (
                                    <td>{track.liveness}</td>
                                )}
                                {props.values.showColumnValence === "true" && (
                                    <td>{track.valence}</td>
                                )}
                                <td>
                                    <TrackKey trackKey={track.key} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TrackList;
