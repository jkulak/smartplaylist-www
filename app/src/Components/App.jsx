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

const API_URL =
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000";

const FASTAPI_URL =
    process.env.NODE_ENV === "production"
        ? "/fastapi"
        : "http://localhost:8008";
const FETCH_DELAY = 300;

const App = () => {
    const [isLoading, setIsLoading] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(0);
    const [totalResults, setTotalResults] = useState("🤷🏽");
    const [estimatedResults, setEstimatedResults] = useState("🤷🏽");
    const [totalTracks, setTotalTracks] = useState(0);
    const [previewUrl, setPreviewUrl] = useState("");
    const [tracks, setTracks] = useState([]);
    const [stats, setStats] = useState([]);

    const [form, setForm] = useState({
        query: "mok",
        genres: "bass",
        releaseDate: "2021-01-01",

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
        url += `/init`;

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
        const LIMIT = 100;

        let url = API_URL;
        url += `/tracks`;
        url += `?select=spotify_id,all_artists,name,genres,release_date,tempo,popularity,danceability,energy,speechiness,acousticness,instrumentalness,liveness,valence,main_artist_popularity,main_artist_followers,key,preview_url`;

        if (form.followed) {
            url += `,user_followed_artist(user_id)`;
        }

        url += `&order=release_date.desc,popularity.desc,spotify_id.asc`;
        url += `&limit=${LIMIT}`;
        url += `&tempo=gte.${form.minTempo}&tempo=lte.${form.maxTempo}`;
        url += `&popularity=gte.${form.minPopularity}&popularity=lte.${form.maxPopularity}`;
        url += `&main_artist_popularity=gte.${form.minMainArtistPopularity}&main_artist_popularity=lte.${form.maxMainArtistPopularity}`;
        url += `&main_artist_followers=gte.${form.minMainArtistFollowers}&main_artist_followers=lte.${form.maxMainArtistFollowers}`;
        url += `&danceability=gte.${form.minDanceability}&danceability=lte.${form.maxDanceability}`;
        url += `&energy=gte.${form.minEnergy}&energy=lte.${form.maxEnergy}`;
        url += `&speechiness=gte.${form.minSpeechiness}&speechiness=lte.${form.maxSpeechiness}`;
        url += `&acousticness=gte.${form.minAcousticness}&acousticness=lte.${form.maxAcousticness}`;
        url += `&instrumentalness=gte.${form.minInstrumentalness}&instrumentalness=lte.${form.maxInstrumentalness}`;
        url += `&liveness=gte.${form.minLiveness}&liveness=lte.${form.maxLiveness}`;
        url += `&valence=gte.${form.minValence}&valence=lte.${form.maxValence}`;

        if (form.query.length > 0) {
            const searchQuery = form.query.toLowerCase().split(",");
            searchQuery.forEach((element) => {
                url += `&or=(name_fts_string.like.*${element.trim()}*,all_artists_string.like.*${element.trim()}*)`;
            });
        }

        if (form.genres.length > 0) {
            const genresQuery = form.genres.toLowerCase().split(",");
            url += `&or=(`;
            genresQuery.forEach((element) => {
                url += `genres_string.like.*${element.trim()}*,`;
            });
            url = url.slice(0, -1);
            url += `)`;
        }

        // Use `or` or `and` depending on the logic you need (genre has any or all of the strings)
        url += `&release_date=gte.${form.releaseDate}`;
        if (form.key !== "any") url += `&key=eq.${form.key}`;

        setIsLoading((prev) => prev + 1);
        fetch(url, {
            headers: { Prefer: "count=estimated" },
        })
            .then((response) => {
                let count = response.headers.get("Content-Range");
                setEstimatedResults(parseInt(count.split("/")[1]));
                setIsLoading((prev) => prev - 1);
                return response.json();
            })
            .then((data) => {
                setTracks(data);
                setTotalResults(data.length);
            });
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
        if (isLoggedIn) fetchInitData();
        if (!isLoggedIn) window.location.hash = "";
    }, [isLoggedIn]);

    // ex componentDidUpdate()
    useEffect(() => {
        if (isLoggedIn) debouncedFetchData(form);
    }, [isLoggedIn, debouncedFetchData, form]);

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

    const logInUser = (user) => {
        setIsLoggedIn(user);
    };

    const setPlayerSong = (url) => {
        setPreviewUrl(url);
    };

    const logOut = () => {
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return (
            <div className="App">
                <div class="pure-g">
                    <div class="pure-u-1">
                        <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
                            <span class="pure-menu-heading">
                                🎧 Smart Playlists
                            </span>

                            <ul class="pure-menu-list">
                                <li class="pure-menu-item">
                                    <span class="pure-menu-heading">
                                        <Stats
                                            totalResults={totalResults}
                                            estimatedResults={estimatedResults}
                                            totalTracks={totalTracks}
                                        />
                                    </span>
                                </li>
                                <li class="pure-menu-item">
                                    <a
                                        href="#"
                                        class="pure-menu-link pure-menu-disabled"
                                    >
                                        Save playlist
                                    </a>
                                </li>
                                <li class="pure-menu-item">
                                    <a
                                        href="#"
                                        class="pure-menu-link pure-menu-disabled"
                                    >
                                        Save search
                                    </a>
                                </li>
                                <li class="pure-menu-item">
                                    <a href="#" class="pure-menu-link">
                                        <User onClick={logOut} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="pure-g main-content">
                    <div class="pure-u-1">
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
