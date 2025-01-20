import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

// Composant pour afficher les étoiles
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating / 2); // Convertir sur 5 étoiles
  const hasHalfStar = rating / 2 - fullStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="#4B5563"/>
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  }
  return <div className="flex space-x-1">{stars}</div>;
};

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { customMovies, deleteCustomMovie } = useMovies();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: '6785f7cb8ae7ecd5b206f96b2c5dc5da',
              language: 'fr-FR',
              page: 1
            },
          }
        );
        const apiMovies = response.data.results;
        setMovies([...customMovies, ...apiMovies]);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des films');
        setLoading(false);
        console.error('Erreur API:', err);
      }
    };

    fetchMovies();
  }, [customMovies]);

  if (loading) return <div className="text-center text-2xl">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 text-2xl">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-red-600">Films Populaires</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <Link 
              to={movie.custom ? '#' : `/film/${movie.id}`}
              className="block transition-transform duration-300 group-hover:scale-105"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-w-2 aspect-h-3">
                  {movie.custom ? (
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
                  <h2 className="text-lg font-semibold text-white mb-2">{movie.title}</h2>
                  <div className="flex items-center justify-between">
                    <StarRating rating={movie.vote_average || 0} />
                    {movie.custom && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCustomMovie(movie.id);
                        }}
                        className="text-white hover:text-red-500 transition-colors"
                        title="Supprimer le film"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
