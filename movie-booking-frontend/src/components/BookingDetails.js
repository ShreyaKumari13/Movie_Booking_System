// src/components/BookingDetails.js
import React, { useEffect, useState } from 'react';
import { getUserBookings, cancelBooking } from '../services/api';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userId = 1; // Replace with logged-in user ID
    getUserBookings(userId).then((response) => setBookings(response.data));
  }, []);

  const handleCancel = (bookingId) => {
    if (window.confirm('Do you really want to cancel this booking?')) {
      cancelBooking(bookingId).then(() => alert('Booking cancelled'));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <p>Movie: {booking.movie.title}</p>
          <p>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</p>
          {!booking.isCancelled && (
            <button onClick={() => handleCancel(booking.id)} className="btn mt-2">Cancel Booking</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingDetails;
