package com.example.moviebooking.service;

import com.example.moviebooking.model.Booking;
import com.example.moviebooking.model.Movie;
import com.example.moviebooking.model.User;
import com.example.moviebooking.repository.BookingRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.time.LocalDateTime;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private MovieService movieService;

    @InjectMocks
    private BookingService bookingService;

    public BookingServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateBooking() {
        User user = new User();
        Movie movie = new Movie();
        movie.setAvailableSeats(5);
        when(bookingRepository.save(any(Booking.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Booking booking = bookingService.createBooking(user, movie);
        assertEquals(user, booking.getUser());
        assertEquals(movie, booking.getMovie());
        assertEquals(false, booking.isCancelled());
        verify(movieService, times(1)).updateAvailableSeats(movie, 4);
    }

    @Test
    void testCancelBooking() {
        Booking booking = new Booking();
        Movie movie = new Movie();
        movie.setAvailableSeats(0);
        booking.setMovie(movie);
        booking.setBookingTime(LocalDateTime.now().minusMinutes(5));
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        bookingService.cancelBooking(1L);
        assertEquals(true, booking.isCancelled());
        verify(movieService, times(1)).updateAvailableSeats(movie, 1);
    }

    @Test
    void testCancelBookingAfter10Minutes() {
        Booking booking = new Booking();
        booking.setBookingTime(LocalDateTime.now().minusMinutes(15));
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        Exception exception = assertThrows(IllegalStateException.class, () -> bookingService.cancelBooking(1L));
        assertEquals("Booking cannot be canceled after 10 minutes.", exception.getMessage());
    }
}
