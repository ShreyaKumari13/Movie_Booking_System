// src/services/movieService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movies';

export const getUpcomingMovies = async () => {
    const response = await axios.get(`${API_URL}/upcoming`); // Use backticks
    return response.data;
};

export const getThisWeekMovies = async () => {
    const response = await axios.get(`${API_URL}/this_week`); // Use backticks
    return response.data;
};
