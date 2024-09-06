import React from 'react';
import '../styles/Watchlist.css'; // Import the CSS for Watchlist styling

function Watchlist({ watchlist, onRemove }) {
  return (
    <div className="watchlist-container">
      <h2>Watchlist</h2>
      <div className="watchlist-items">
        {watchlist.map((movie, index) => (
          <div key={index} className="watchlist-item">
            <div className="watchlist-item-index">#{index + 1}</div>
            <div className="watchlist-item-title">{movie.title}</div>
            <div className="watchlist-item-plot">{movie.plot}</div>
            <div className="watchlist-item-rating">Rating: {movie.rating}</div>
            <button onClick={() => onRemove(index)} className="remove-button">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;