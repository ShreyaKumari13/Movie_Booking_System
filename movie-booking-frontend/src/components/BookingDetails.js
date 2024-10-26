// // src/components/BookingDetails.js
// import React, { useEffect, useState } from "react";
// import { getUserBookings, cancelBooking } from "../services/api";

// const BookingDetails = () => {
//   const [bookings, setBookings] = useState([]);

//   // Load user's bookings
//   useEffect(() => {
//     const userId = 1; // Replace with logged-in user ID or retrieve from session
//     getUserBookings(userId).then((response) => setBookings(response.data));
//   }, []);

//   const handleCancel = (bookingId) => {
//     if (window.confirm("Do you really want to cancel this booking?")) {
//       cancelBooking(bookingId)
//         .then(() => {
//           alert("Booking cancelled successfully");
//           // Update the bookings list to reflect the cancellation
//           setBookings((prevBookings) =>
//             prevBookings.map((booking) =>
//               booking.id === bookingId ? { ...booking, isCancelled: true } : booking
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error cancelling booking:", error.response?.data || error.message);
//           alert("Failed to cancel booking. Please try again.");
//         });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
//       <button
//         onClick={() => navigate('/movies')} // Replace with actual dashboard route
//         className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200 mb-4"
//       >
//         Dashboard
//       </button>
//       {bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <div
//             key={booking.id}
//             className="bg-white p-4 rounded-lg shadow-lg mb-4"
//           >
//             <p>Movie: {booking.movie.title}</p>
//             <p>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</p>
//             {booking.isCancelled ? (
//               <p className="text-red-500">This booking has been cancelled</p>
//             ) : (
//               <button
//                 onClick={() => handleCancel(booking.id)}
//                 className="btn mt-2 bg-red-500 text-white p-2 rounded"
//               >
//                 Cancel Booking
//               </button>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default BookingDetails;
// src/components/BookingDetails.js
// src/components/BookingDetails.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getUserBookings, cancelBooking } from "../services/api";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  // Load user's bookings
  useEffect(() => {
    const userId = 1; // Replace with logged-in user ID or retrieve from session
    getUserBookings(userId).then((response) => setBookings(response.data));
  }, []);

  const handleCancel = (bookingId) => {
    if (window.confirm("Do you really want to cancel this booking?")) {
      cancelBooking(bookingId)
        .then(() => {
          alert("Booking cancelled successfully");
          // Update the bookings list to reflect the cancellation
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === bookingId ? { ...booking, isCancelled: true } : booking
            )
          );
        })
        .catch((error) => {
          console.error("Error cancelling booking:", error.response?.data || error.message);
          alert("Failed to cancel booking. Please try again.");
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      <button
        onClick={() => navigate('/movies')} // Navigate to movies
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200 mb-4"
      >
        Dashboard
      </button>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-4 rounded-lg shadow-lg mb-4"
          >
            <p>Movie: {booking.movie.title}</p>
            <p>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</p>
            {booking.isCancelled ? (
              <p className="text-red-500">This booking has been cancelled</p>
            ) : (
              <button
                onClick={() => handleCancel(booking.id)}
                className="btn mt-2 bg-red-500 text-white p-2 rounded"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingDetails;

