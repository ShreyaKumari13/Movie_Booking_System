package com.example.moviebooking.controller;

import com.example.moviebooking.model.Booking;
import com.example.moviebooking.model.Movie;
import com.example.moviebooking.model.User;
import com.example.moviebooking.service.BookingService;
import com.example.moviebooking.service.MovieService;
import com.example.moviebooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @Autowired
    private MovieService movieService;

    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok("Booking cancelled successfully");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestParam Long userId, @RequestParam Long movieId) {
        Optional<User> userOpt = userService.findUserById(userId);
        Optional<Movie> movieOpt = movieService.getMovieById(movieId);

        if (userOpt.isPresent() && movieOpt.isPresent()) {
            Booking booking = bookingService.createBooking(userOpt.get(), movieOpt.get());
            return new ResponseEntity<>(booking, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User or Movie not found");
        }
    }

    // @GetMapping("/user/{userId}")
    // public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long
    // userId) {
    // Optional<User> userOpt =
    // userService.findUserByUsername(String.valueOf(userId));

    // if (userOpt.isPresent()) {
    // List<Booking> bookings = bookingService.getBookingsByUser(userOpt.get());
    // return new ResponseEntity<>(bookings, HttpStatus.OK);
    // } else {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }
    // }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
        // Find user by ID instead of username
        Optional<User> userOpt = userService.findUserById(userId);

        if (userOpt.isPresent()) {
            List<Booking> bookings = bookingService.getBookingsByUser(userOpt.get());
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//     @DeleteMapping("/cancel/{bookingId}")
// public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) { ... }

}
