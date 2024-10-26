// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AccordionMenu from './components/AccordionMenu';
import MovieList from './components/MovieList';
import BookingDetails from './components/BookingDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<AccordionMenu />} />
          <Route path="/movies/:category" element={<MovieList />} />
          <Route path="/bookings" element={<BookingDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
