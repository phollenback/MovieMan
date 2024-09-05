import React, { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import Movie from './models/Movie';
import MovieCard from './components/MovieCard';
import SearchForm from './components/SearchForm';
import Watchlist from './components/Watchlist';
import LoginForm from './components/LoginForm';
import useToken from './components/useToken'
import './styles/App.css';


function App() {

  useEffect(() => {
    
  }, []);

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const searchKey = async (keyword) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=c03606c4&t=${encodeURIComponent(keyword)}`);
      const data = response.data;

      if (data.Response === 'True') {
        const movie = new Movie(
          data.Title,
          data.Year,
          data.Director,
          data.Plot,
          data.Ratings.length > 0 ? data.Ratings[0].Value : 'N/A',
          data.Poster
        );
        setMovies([movie]);
      } else {
        console.log('Movie not found');
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const addToWatchlist = () => {
    if (movies.length > 0) {
      setWatchlist([...watchlist, movies[0]]);
    }
  };

  const removeFromWatchlist = (index) => {
    const updatedWatchlist = watchlist.filter((_, i) => i !== index);
    setWatchlist(updatedWatchlist);
  };

  const {token, setToken} = useToken()
  
  if(!token) {
    return <LoginForm setToken={setToken}/>
  }

  return (
    <div className="app-container">
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>

      <div className="search-add-container">
        <SearchForm onSearch={searchKey} />
        <button onClick={addToWatchlist} className="add-button">
          Add to Watchlist
        </button>
      </div>

      <Watchlist watchlist={watchlist} onRemove={removeFromWatchlist} />
    </div>
  );
}

export default App;
