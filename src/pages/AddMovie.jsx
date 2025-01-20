import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

function AddMovie() {
  const navigate = useNavigate();
  const { addCustomMovie } = useMovies();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    poster_path: ''
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Le titre et la description sont obligatoires');
      return;
    }

    if (!formData.poster_path) {
      setError('Veuillez ajouter une image pour le film');
      return;
    }

    addCustomMovie(formData);
    alert('Film ajouté avec succès!');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError('L\'image ne doit pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          poster_path: reader.result
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-red-600">Ajouter un nouveau film</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Image du film *
          </label>
          <div className="flex flex-col items-center space-y-4">
            {imagePreview ? (
              <div className="relative w-full max-w-xs">
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  className="w-full h-auto rounded shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, poster_path: '' }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-full">
                <label className="flex flex-col items-center px-4 py-6 bg-gray-800 text-white rounded-lg shadow-lg tracking-wide border border-gray-700 cursor-pointer hover:bg-gray-700">
                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-sm">Sélectionner une image</span>
                  <input
                    type='file'
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:outline-none"
            placeholder="Entrez le titre du film"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:outline-none"
            placeholder="Entrez la description du film"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Date de sortie
          </label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:outline-none"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Ajouter le film
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
