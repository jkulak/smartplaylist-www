export const API_URL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000";
export const FASTAPI_URL = process.env.NODE_ENV === "production" ? "/fastapi" : "http://localhost:8008";
export const FETCH_DELAY = 100;
export const DEFAULT_TRACK_LIST_LENGTH = 250;
