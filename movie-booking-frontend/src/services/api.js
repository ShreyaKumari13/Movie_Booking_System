// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const getMoviesByCategory = (category) => api.get(`/movies/${category}`); // Use backticks
export const createBooking = (userId, movieId) => api.post(`/bookings/create?userId=${userId}&movieId=${movieId}`); // Use backticks
// export const cancelBooking = (bookingId) => api.post(`/bookings/cancel/${bookingId}`); // Use backticks
export const getUserBookings = (userId) => api.get(`/bookings/user/${userId}`); // Use backticks
// src/services/api.js
export const cancelBooking = (bookingId) => api.post(`/bookings/cancel/${bookingId}`);
