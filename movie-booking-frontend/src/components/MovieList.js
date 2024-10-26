// src/components/MovieList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByCategory, createBooking } from '../services/api';

const MovieList = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesByCategory(category).then((response) => setMovies(response.data));
  }, [category]);

  const handleBooking = (movieId) => {
    const userId = 1; // Replace with actual user ID from session
    createBooking(userId, movieId).then(() => alert('Booking successful!'));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{category === 'upcoming' ? 'Upcoming Movies' : 'This Week Movies'}</h2>
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p>Release Date: {movie.releaseDate}</p>
          <p>Available Seats: {movie.availableSeats}</p>
          {category === 'this_week' && (
            <button onClick={() => handleBooking(movie.id)} className="btn mt-2">Book</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
