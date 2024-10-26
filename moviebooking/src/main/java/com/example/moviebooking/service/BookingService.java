package com.example.moviebooking.service;

import com.example.moviebooking.model.Booking;
import com.example.moviebooking.model.Movie;
import com.example.moviebooking.model.User;
import com.example.moviebooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private MovieService movieService;

    public Booking createBooking(User user, Movie movie) {
        if (movie.getAvailableSeats() > 0) {
            Booking booking = new Booking();
            booking.setUser(user);
            booking.setMovie(movie);
            booking.setBookingTime(LocalDateTime.now());
            booking.setCancelled(false);

            movieService.updateAvailableSeats(movie, movie.getAvailableSeats() - 1);
            return bookingRepository.save(booking);
        } else {
            throw new IllegalStateException("No available seats for this movie.");
        }
    }

    @Transactional
    public void cancelBooking(Long bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            if (!booking.isCancelled() && booking.getBookingTime().plusMinutes(10).isAfter(LocalDateTime.now())) {
                booking.setCancelled(true);
                bookingRepository.save(booking);

                Movie movie = booking.getMovie();
                movieService.updateAvailableSeats(movie, movie.getAvailableSeats() + 1);
            } else {
                throw new IllegalStateException("Booking cannot be canceled after 10 minutes.");
            }
        } else {
            throw new IllegalArgumentException("Booking not found.");
        }
    }

    public List<Booking> getBookingsByUser(User user) {
        return bookingRepository.findByUser(user);
    }
}
