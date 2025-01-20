import { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [customMovies, setCustomMovies] = useState(() => {
    const saved = localStorage.getItem('customMovies');
    return saved ? JSON.parse(saved) : [];
  });

  const addCustomMovie = (movie) => {
    const newMovie = {
      ...movie,
      id: `custom-${Date.now()}`,
      vote_average: 0,
      custom: true
    };
    setCustomMovies(prev => {
      const updated = [...prev, newMovie];
      localStorage.setItem('customMovies', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteCustomMovie = (movieId) => {
    setCustomMovies(prev => {
      const updated = prev.filter(movie => movie.id !== movieId);
      localStorage.setItem('customMovies', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <MovieContext.Provider value={{ customMovies, addCustomMovie, deleteCustomMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}
