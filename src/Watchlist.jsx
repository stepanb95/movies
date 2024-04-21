import React from 'react';

function Watchlist({ watchlist, removeFromWatchlist }) {
  return (
    <div>
      <h2>Watchlist</h2>
      {watchlist.map(movie => (
        <div className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
