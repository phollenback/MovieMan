import React from 'react';
import '../styles/MovieCard.css'; // Import the CSS for MovieCard styling

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={`${movie.title} Poster`} className="movie-poster" />
      <h2>{movie.title}</h2>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Plot:</strong> {movie.plot}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
    </div>
  );
}

export default MovieCard;