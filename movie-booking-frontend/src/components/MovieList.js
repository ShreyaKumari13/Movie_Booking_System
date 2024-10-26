// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMoviesByCategory, createBooking } from '../services/api';

// const MovieList = () => {
//   const { category } = useParams();
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     getMoviesByCategory(category).then((response) => setMovies(response.data));
//   }, [category]);

//   const handleBooking = (movieId, availableSeats) => {
//     if (availableSeats === 0) {
//       alert('Seats are full for this movie.'); // Show prompt if no seats are available
//       return;
//     }

//     const userId = 1; // Replace with actual user ID from session
//     createBooking(userId, movieId)
//       .then(() => {
//         alert('Booking successful!');
//         // Optionally update the UI to reflect the reduced seat count
//         setMovies((prevMovies) =>
//           prevMovies.map((movie) =>
//             movie.id === movieId ? { ...movie, availableSeats: movie.availableSeats - 1 } : movie
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Error booking movie:", error);
//         alert("Booking failed. Please try again.");
//       });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">
//         {category === 'upcoming' ? 'Upcoming Movies' : 'This Week Movies'}
//       </h2>
//       <h3>Dashboard</h3>
//       {movies.map((movie) => (
//         <div key={movie.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
//           <h3 className="text-xl font-semibold">{movie.title}</h3>
//           <p>Release Date: {movie.releaseDate}</p>
//           <p>Available Seats: {movie.availableSeats}</p>
//           {category === 'this_week' && (
//             <button
//               onClick={() => handleBooking(movie.id, movie.availableSeats)}
//               className="btn mt-2 bg-blue-500 text-white p-2 rounded"
//             >
//               Book
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MovieList;


// src/components/MovieList.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByCategory, createBooking } from '../services/api';

const MovieList = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    getMoviesByCategory(category).then((response) => setMovies(response.data));
  }, [category]);

  const handleBooking = (movieId, availableSeats) => {
    if (availableSeats === 0) {
      alert('Seats are full for this movie.'); // Show prompt if no seats are available
      return;
    }

    const userId = 1; // Replace with actual user ID from session
    createBooking(userId, movieId)
      .then(() => {
        alert('Booking successful!');
        // Optionally update the UI to reflect the reduced seat count
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieId ? { ...movie, availableSeats: movie.availableSeats - 1 } : movie
          )
        );

        // Redirect to the movies list page
        navigate('/movies');
      })
      .catch((error) => {
        console.error("Error booking movie:", error);
        alert("Booking failed. Please try again.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {category === 'upcoming' ? 'Upcoming Movies' : 'This Week Movies'}
      </h2>
      {/* Dashboard Button */}
      <button
        onClick={() => navigate('/movies')} // Replace with actual dashboard route
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200 mb-4"
      >
        Dashboard
      </button>
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p>Release Date: {movie.releaseDate}</p>
          <p>Available Seats: {movie.availableSeats}</p>
          {category === 'this_week' && (
            <button
              onClick={() => handleBooking(movie.id, movie.availableSeats)}
              className="btn mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Book
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
