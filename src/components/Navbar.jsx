import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-red-600 text-2xl font-bold">
            AymaneNetfilm
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-red-600 transition-colors">
              Accueil
            </Link>
            <Link to="/recherche" className="text-white hover:text-red-600 transition-colors">
              Recherche
            </Link>
            <Link to="/ajouter" className="text-white hover:text-red-600 transition-colors">
              Ajouter un film
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
