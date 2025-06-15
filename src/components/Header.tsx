
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-saffron-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/7efea016-f501-432e-9c33-3064bfb876b6.png" 
                alt="Omy Travels & Tours" 
                className="h-12 w-auto"
              />
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
              to="/trips" 
              className="text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              All Trips
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              About Us
            </Link>
            <a 
              href="tel:+919876543210" 
              className="flex items-center space-x-1 text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            <a 
              href="mailto:info@omytours.com" 
              className="flex items-center space-x-1 text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
