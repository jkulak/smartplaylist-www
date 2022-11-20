import "./App.css";
import React, { useEffect, useState, useMemo } from "react";
import Form from "./Form";
import Player from "./Player";
import Stats from "./Stats";
import TrackList from "./TrackList";
import Loader from "./Loader";
import LoginPage from "./LoginPage";
import User from "./User";
import StatsForNerds from "./StatsForNerds";
import SavePlaylist from "./SavePlaylist";
import { FASTAPI_URL, FETCH_DELAY, DEFAULT_TRACK_LIST_LENGTH } from "./Const";

const App = () => {
    const [isLoading, setIsLoading] = useState(0);
    const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
    const [totalResults, setTotalResults] = useState("🤷🏽");
    const [estimatedResults, setEstimatedResults] = useState("🤷🏽");
    const [totalTracks, setTotalTracks] = useState(0);
    const [previewUrl, setPreviewUrl] = useState("");
    const [tracks, setTracks] = useState([]);
    const [stats, setStats] = useState([]);
    // const [accessToken, setAccessToken] = useState("");

    const [form, setForm] = useState({
        query: "",
        genres: "bass",
        releaseDate: "2022-01-01",

        minTempo: 80,
        maxTempo: 210,
        showColumnTempo: "true",

        minPopularity: 0,
        maxPopularity: 100,
        showColumnPopularity: "true",

        minMainArtistPopularity: 1,
        maxMainArtistPopularity: 100,
        showColumnMainArtistPopularity: "true",

        minMainArtistFollowers: 1,
        maxMainArtistFollowers: 50000000,
        showColumnMainArtistFollowers: "true",

        minDanceability: 0,
        maxDanceability: 100,
        showColumnDanceability: "false",

        minEnergy: 0,
        maxEnergy: 100,
        showColumnEnergy: "false",

        minSpeechiness: 0,
        maxSpeechiness: 100,
        showColumnSpeechiness: "false",

        minAcousticness: 0,
        maxAcousticness: 100,
        showColumnAcousticness: "false",

        minInstrumentalness: 0,
        maxInstrumentalness: 100,
        showColumnInstrumentalness: "false",

        minLiveness: 0,
        maxLiveness: 100,
        showColumnLiveness: "false",

        minValence: 0,
        maxValence: 100,
        showColumnValence: "true",

        explicit: 1,
        followed: 0,
        key: "any",
    });

    const fetchInitData = () => {
        let url = FASTAPI_URL;
        url += "/init";

        setIsLoading((prev) => prev + 1);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setTotalTracks(data["tracks_with_audiofeature"]);
                setStats(data);
            });

        setIsLoading((prev) => prev - 1);
    };

    const fetchData = (form) => {
        let url = "?_";

        if (form.query.length > 0) {
            url += "&nam=";
            const searchQuery = form.query.toLowerCase().split(",");
            searchQuery.forEach((element) => {
                url += element.trim() + ",";
            });
        }

        if (form.genres.length > 0) {
            url += "&gen=";
            const searchQuery = form.genres.toLowerCase().split(",");
            searchQuery.forEach((element) => {
                url += element.trim() + ",";
            });
        }

        url += `&rel=${form.releaseDate}`;

        url += `&tem=${form.minTempo},${form.maxTempo}`;
        url += `&pop=${form.minPopularity},${form.maxPopularity}`;
        url += `&map=${form.minMainArtistPopularity},${form.maxMainArtistPopularity}`;
        url += `&maf=${form.minMainArtistFollowers},${form.maxMainArtistFollowers}`;
        url += `&dan=${form.minDanceability},${form.maxDanceability}`;
        url += `&ene=${form.minEnergy},${form.maxEnergy}`;
        url += `&spe=${form.minSpeechiness},${form.maxSpeechiness}`;
        url += `&aco=${form.minAcousticness},${form.maxAcousticness}`;
        url += `&ins=${form.minInstrumentalness},${form.maxInstrumentalness}`;
        url += `&liv=${form.minLiveness},${form.maxLiveness}`;
        url += `&val=${form.minValence},${form.maxValence}`;
        url += `&key=${form.key},${form.key}`;

        // if (form.genres.length > 0) {
        //     const genresQuery = form.genres.toLowerCase().split(",");
        //     url += `&or=(`;
        //     genresQuery.forEach((element) => {
        //         url += `genres_string.like.*${element.trim()}*,`;
        //     });
        //     url = url.slice(0, -1);
        //     url += `)`;
        // }

        // // Use `or` or `and` depending on the logic you need (genre has any or all of the strings)

        url += `&order=rel,des`;
        url += `&limit=${DEFAULT_TRACK_LIST_LENGTH}`;

        setIsLoading((prev) => prev + 1);
        fetch(FASTAPI_URL + "/tracks" + url)
            .then((response) => {
                setIsLoading((prev) => prev - 1);
                return response.json();
            })
            .then((data) => {
                setTracks(data);
                setTotalResults(data.length + 1);
            });

        if (DEFAULT_TRACK_LIST_LENGTH === totalResults) {
            // setIsLoading((prev) => prev + 1);
            fetch(FASTAPI_URL + "/tracks/count" + url)
                .then((response) => {
                    // setIsLoading((prev) => prev - 1);
                    return response.json();
                })
                .then((data) => {
                    setEstimatedResults(data);
                });
        }
    };

    // Debouncing with arguments
    // https://dev.to/monaye/refactor-davidwalsh-s-debounce-function-5afc
    const debounce = (func, delay, immediate) => {
        let timerId;
        return (...args) => {
            const boundFunc = func.bind(this, ...args);
            clearTimeout(timerId);
            if (immediate && !timerId) {
                boundFunc();
            }
            const calleeFunc = immediate
                ? () => {
                      timerId = null;
                  }
                : boundFunc;
            timerId = setTimeout(calleeFunc, delay);
        };
    };

    const debouncedFetchData = useMemo(
        () => debounce(fetchData, FETCH_DELAY),
        []
    );

    // Run on first render, ex componentDidMount()
    // Second parameter is `[]` to run only when an empty table changes (which results in only one run)
    useEffect(() => {
        // document.getElementById("query").focus();
        if ("" !== spotifyAccessToken) fetchInitData();
        if (!spotifyAccessToken) window.location.hash = "";
    }, [spotifyAccessToken]);

    // ex componentDidUpdate()
    useEffect(() => {
        if ("" !== spotifyAccessToken) debouncedFetchData(form);
    }, [spotifyAccessToken, debouncedFetchData, form]);

    // Update state based on form's elements and their name
    const handleFormChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const setQuery = (name) => {
        name = form.query !== name ? name : "";
        setForm((prev) => ({
            ...prev,
            query: name,
        }));
    };

    const setGenre = (name) => {
        name = form.genres !== name ? name : "";
        setForm((prev) => ({
            ...prev,
            genres: name,
        }));
    };

    const logInUser = (token) => {
        setSpotifyAccessToken(token);
    };

    const setPlayerSong = (url) => {
        setPreviewUrl(url);
    };

    const logOut = () => {
        setSpotifyAccessToken("");
    };

    if (spotifyAccessToken) {
        return (
            <div className="App">
                <div className="pure-g">
                    <div className="pure-u-1">
                        <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
                            <span className="pure-menu-heading">
                                🎧 Smart Playlists
                            </span>

                            <ul className="pure-menu-list">
                                <li className="pure-menu-item">
                                    <span className="pure-menu-heading">
                                        <Stats
                                            totalResults={totalResults}
                                            estimatedResults={estimatedResults}
                                            totalTracks={totalTracks}
                                        />
                                    </span>
                                </li>
                                <li className="pure-menu-item">
                                    <SavePlaylist
                                        accessToken={spotifyAccessToken}
                                        ids={Array.from(
                                            tracks,
                                            (track) => track.spotify_id
                                        )}
                                        name={"smartplaylist"}
                                    />
                                </li>
                                <li className="pure-menu-item">
                                    <a
                                        href="#/save-search"
                                        className="pure-menu-link pure-menu-disabled"
                                    >
                                        Save search
                                    </a>
                                </li>
                                <li className="pure-menu-item">
                                    <a
                                        href="#/logout"
                                        className="pure-menu-link"
                                    >
                                        <User onClick={logOut} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pure-g main-content">
                    <div className="pure-u-1">
                        <Loader isLoading={isLoading} />
                        <Form handler={handleFormChange} values={form} />

                        <TrackList
                            tracks={tracks}
                            values={form}
                            onPlayClick={setPlayerSong}
                            handleArtistClick={setQuery}
                            handleGenreClick={setGenre}
                        />
                        <Player previewUrl={previewUrl} />
                        <StatsForNerds stats={stats}></StatsForNerds>
                    </div>
                </div>
            </div>
        );
    } else {
        return <LoginPage logInUser={logInUser} />;
    }
};

export default App;
