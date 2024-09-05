import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const addToWatchlist = async (movieId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/watchlist-add`, { movieId, userId });
    return response.data;
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
    throw error;
  }
};

const removeFromWatchlist = async (movieId, userId) => {
    try {
      const response = await axios.post(`${API_URL}/watchlist-add`, { movieId, userId });
      return response.data;
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      throw error;
    }
  };


module.exports = { addToWatchlist, removeFromWatchlist}