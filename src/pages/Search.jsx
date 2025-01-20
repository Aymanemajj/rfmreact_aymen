import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: '6785f7cb8ae7ecd5b206f96b2c5dc5da',
            language: 'fr-FR',
            query: query,
          },
        }
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors de la recherche');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-red-600">Rechercher un film</h1>
      <form onSubmit={searchMovies} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Entrez le titre d'un film..."
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:outline-none"
          />
          <button type="submit" className="btn-primary">
            Rechercher
          </button>
        </div>
      </form>

      {loading && <div className="text-center">Chargement...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link to={`/film/${movie.id}`} key={movie.id} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-400 text-sm">
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
