package com.example.moviebooking.service;

import com.example.moviebooking.model.Movie;
import com.example.moviebooking.repository.MovieRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MovieServiceTest {

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieService movieService;

    public MovieServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetMoviesByCategory() {
        Movie movie = new Movie();
        movie.setCategory("upcoming");
        when(movieRepository.findByCategory("upcoming")).thenReturn(List.of(movie));

        List<Movie> movies = movieService.getMoviesByCategory("upcoming");
        assertEquals(1, movies.size());
        assertEquals("upcoming", movies.get(0).getCategory());
    }

    @Test
    void testUpdateAvailableSeats() {
        Movie movie = new Movie();
        movie.setAvailableSeats(10);

        movieService.updateAvailableSeats(movie, 9);
        assertEquals(9, movie.getAvailableSeats());
        verify(movieRepository, times(1)).save(movie);
    }
}
