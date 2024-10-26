
# Movie Booking System

This Movie Booking System is a backend and frontend application that allows users to explore movies by category, view specific movie details, and make or cancel bookings. It is built using Java and React, with a focus on RESTful API principles and session-based user management.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Run Locally](#run-locally)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Author](#author)

---

## Features
- **User Management**: Register and log in users.
- **Movie Browsing**: Browse movies by category, such as "upcoming" or "this week."
- **Booking Management**: Book or cancel movie tickets within specified time constraints.
- **Seat Management**: Manage seat availability for each movie dynamically based on bookings and cancellations.

## Tech Stack
- **Backend**: Java, Spring Boot, H2 Database (in-memory)
- **Frontend**: React
- **Database**: H2 (for testing, can be replaced with MySQL or another DB)
- **API Documentation**: RESTful endpoints

## Getting Started

### Prerequisites
- Java Development Kit (JDK 11+)
- Spring Boot dependencies
- Git

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/ShreyaKumari13/Movie_Booking_System.git
   cd Movie_Booking_System
   ```

2. **Backend Setup**
   - Navigate to the backend folder.
     ```bash
     cd movie-booking-backend
     ```
   - Start the Spring Boot application.
     ```bash
     ./mvnw spring-boot:run
     ```
   - **H2 Database Console**:
     Access the database at `http://localhost:8080/h2-console` (URL and credentials can be updated in `application.properties`).
     
3. **Database Setup**
     ```bash
      CREATE DATABASE moviedb;
      use moviedb;
      Insert "Upcoming Movies"
      INSERT INTO movie (title, release_date, category, available_seats) VALUES 
      ('Future Blockbuster', '2024-01-15', 'upcoming', 100),
      ('Sci-Fi Saga', '2024-02-10', 'upcoming', 80),
      ('Adventure Quest', '2024-03-05', 'upcoming', 120),
      ('Mystery Island', '2024-03-25', 'upcoming', 70),
      ('Epic Journey', '2024-04-12', 'upcoming', 90);
         
       INSERT INTO movie (title, release_date, category, available_seats) VALUES 
        ('Action Thriller', CURDATE(), 'this_week', 50),
        ('Comedy Special', CURDATE(), 'this_week', 60),
        ('Romantic Drama', CURDATE(), 'this_week', 40),
        ('Animated Adventure', CURDATE(), 'this_week', 75),
        ('Horror Nights', CURDATE(), 'this_week', 30);
    
     ```

4. **Frontend Setup**
   - Navigate to the frontend folder.
     ```bash
     cd ../movie-booking-frontend
     ```
   - Install dependencies.
     ```bash
     npm install
     ```
   - Start the React application.
     ```bash
     npm start
     ```
   - The application will run on `http://localhost:3000`.

---

## API Endpoints

### User API
- **Register a new user**
  - `POST /api/users/register`
  - JSON Body:
    ```json
    {
      "username": "user1",
      "password": "pass123"
    }
    ```
- **Login a user**
  - `POST /api/users/login`

### Movie API
- **Get Movies by Category**
  - `GET /api/movies/category/{category}`
- **Get Movie Details by ID**
  - `GET /api/movies/{id}`

### Booking API
- **Create Booking**
  - `POST /api/bookings/create`
  - Params: `userId`, `movieId`
- **Cancel Booking**
  - `POST /api/bookings/cancel/{bookingId}`
- **Get User Bookings**
  - `GET /api/bookings/user/{userId}`

## Run Locally

1. **Start the backend server** on port `8080`.
2. **Start the frontend server** on port `3000`.
3. Access the app through the frontend at `http://localhost:3000`.

## Usage
- **Registration & Login**: First, create a user and log in.
- **Browse Movies**: Use the accordion menu to filter movies by category.
- **Booking & Cancellation**: Book available seats for a movie. Cancellations are allowed within a 10-minute window after booking.

---

## Project Structure
```plaintext
Movie_Booking_System/
├── movie-booking-backend/       # Spring Boot backend
│   ├── src/                     # Source code for backend
│   ├── pom.xml                  # Maven dependencies
│   └── application.properties   # Database and server configuration
└── movie-booking-frontend/      # React frontend
    ├── src/                     # Source code for frontend
    ├── package.json             # npm dependencies
    └── README.md                # Project documentation
```

## Author
Shreya Kumari - [GitHub Profile](https://github.com/ShreyaKumari13)
