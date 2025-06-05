
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-temple-gold">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-temple-maroon to-saffron-600 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">ॐ</span>
            </div>
            <div>
              <h1 className="text-2xl font-temple font-bold text-temple-maroon">
                Omy Tours & Travels
              </h1>
              <p className="text-sm text-gray-600">Sacred Hindu Pilgrimages</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              About Us
            </Link>
            <a 
              href="tel:+919876543210" 
              className="text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              📞 +91 98765 43210
            </a>
            <a 
              href="mailto:info@omytours.com" 
              className="text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              ✉️ Contact Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
