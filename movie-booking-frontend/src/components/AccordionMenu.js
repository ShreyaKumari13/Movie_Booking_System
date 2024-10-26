// src/components/AccordionMenu.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUpcomingMovies, getThisWeekMovies } from '../services/movieService';

const AccordionMenu = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [thisWeekMovies, setThisWeekMovies] = useState([]);
    const [openMonth, setOpenMonth] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const upcoming = await getUpcomingMovies();
                setUpcomingMovies(upcoming);
                const thisWeek = await getThisWeekMovies();
                setThisWeekMovies(thisWeek);
            } catch (error) {
                console.error("Error fetching movies", error);
            }
        };
        fetchMovies();
    }, []);

    const handleToggle = (month) => {
        setOpenMonth(openMonth === month ? null : month);
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
                    className="bg-purple-500 text-white p-2 rounded" // Booked button
                    onClick={() => navigate('/bookings')}
                >
                    Booked
                </button>
            </div>

            {/* Accordion for months */}
            <div>
                <div
                    className="cursor-pointer bg-gray-200 p-2 rounded"
                    onClick={() => handleToggle("January")}
                >
                    <h3 className="text-xl">January</h3>
                </div>
                {openMonth === "January" && (
                    <div className="pl-4">
                        <h4 className="font-bold">1. Upcoming Movies</h4>
                        <ul>
                            {upcomingMovies.map(movie => (
                                <li key={movie.id}>{movie.title}</li>
                            ))}
                        </ul>
                        <h4 className="font-bold">2. This Week Movies</h4>
                        <ul>
                            {thisWeekMovies.map(movie => (
                                <li key={movie.id}>{movie.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccordionMenu;
