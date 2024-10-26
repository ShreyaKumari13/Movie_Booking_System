import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUpcomingMovies, getThisWeekMovies } from '../services/movieService';
import { format, parseISO } from 'date-fns'; // For date formatting and parsing

const AccordionMenu = () => {
    const [moviesByMonth, setMoviesByMonth] = useState({});
    const [openMonth, setOpenMonth] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const upcoming = await getUpcomingMovies();
                const thisWeek = await getThisWeekMovies();

                // Combine both lists and group by release month
                const allMovies = [...upcoming, ...thisWeek];
                const groupedMovies = allMovies.reduce((acc, movie) => {
                    const month = format(parseISO(movie.releaseDate), 'MMMM'); // e.g., 'January', 'February'
                    if (!acc[month]) acc[month] = { upcoming: [], thisWeek: [] };
                    if (upcoming.find((up) => up.id === movie.id)) {
                        acc[month].upcoming.push(movie);
                    } else {
                        acc[month].thisWeek.push(movie);
                    }
                    return acc;
                }, {});

                setMoviesByMonth(groupedMovies);
            } catch (error) {
                console.error("Error fetching movies", error);
            }
        };
        fetchMovies();
    }, []);

    const handleToggle = (month) => {
        setOpenMonth(openMonth === month ? null : month);
    };

    const handleLogout = () => {
        // Perform any necessary cleanup or state management for logout here
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="accordion">
            <h2 className="text-2xl font-bold mb-4">Year 2024</h2>

            {/* Navigation Buttons */}
            <div className="mb-4">
                <button 
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                    onClick={() => navigate('/movies/upcoming')}
                >
                    Upcoming Movies
                </button>
                <button 
                    className="bg-green-500 text-white p-2 rounded mr-2"
                    onClick={() => navigate('/movies/this_week')}
                >
                    This Week Movies
                </button>
                <button 
                    className="bg-purple-500 text-white p-2 rounded mr-2"
                    onClick={() => navigate('/bookings')}
                >
                    Booked
                </button>
                <button 
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Dynamically generated accordion for each month */}
            {Object.keys(moviesByMonth)
                .sort((a, b) => new Date(`${a} 1, 2024`) - new Date(`${b} 1, 2024`)) // Sort months in order
                .map((month) => (
                    <div key={month}>
                        <div
                            className="cursor-pointer bg-gray-200 p-2 rounded"
                            onClick={() => handleToggle(month)}
                        >
                            <h3 className="text-xl">{month}</h3>
                        </div>
                        {openMonth === month && (
                            <div className="pl-4">
                                <h4 className="font-bold">1. Upcoming Movies</h4>
                                <ul>
                                    {moviesByMonth[month].upcoming.map((movie) => (
                                        <li key={movie.id}>{movie.title}</li>
                                    ))}
                                </ul>
                                <h4 className="font-bold">2. This Week Movies</h4>
                                <ul>
                                    {moviesByMonth[month].thisWeek.map((movie) => (
                                        <li key={movie.id}>{movie.title}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default AccordionMenu;
