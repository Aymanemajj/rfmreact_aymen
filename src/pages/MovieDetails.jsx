import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: '6785f7cb8ae7ecd5b206f96b2c5dc5da',
              language: 'fr-FR',
            },
          }
        );
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement du film');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!movie) return <div className="text-center">Film non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-red-600">{movie.title}</h1>
          <p className="text-gray-400 mb-4">
            Date de sortie: {new Date(movie.release_date).toLocaleDateString()}
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Informations</h2>
            <p className="text-gray-300">Note: {movie.vote_average}/10</p>
            <p className="text-gray-300">Durée: {movie.runtime} minutes</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-red-600 text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
