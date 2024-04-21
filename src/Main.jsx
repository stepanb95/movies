import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar';

function Main({ username }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=68864733bd80d9b9b313f9240ef20b9b&query=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const addToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie]);
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter(movie => movie.id !== id));
  };

  return (
    <Router>
      <Navbar></Navbar>
      <div className="container">
        <h1>Movie Database</h1>
        <p>Právě přihlášen: {username.split('@')[0]}</p>
        
        <form onSubmit={searchMovies} className="search-form">
          <input type="text" value={query} onChange={handleChange} placeholder="Search movies..." />
          <button type="submit">Search</button>
        </form>
        <div className="movie-list">
          {movies.map(movie => (
            <div className="movie" key={movie.id}>
              <h2>{movie.title}</h2>
              <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
            </div>
          ))}
        </div>
        <div>
      <h2>Watchlist</h2>
      {watchlist.map(movie => (
        <div className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
        </div>
      ))}
    </div>
      </div>
    </Router>
  );
}

export default Main;
