
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Star } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b-2 border-saffron-200 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-temple-maroon rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl font-sanskrit">ॐ</span>
            </div>
            <div>
              <h1 className="text-2xl font-temple font-bold text-temple-maroon">
                Omy Tours & Travels
              </h1>
              <p className="text-sm text-saffron-600 font-medium">Sacred Journeys Await</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium transition-colors ${
                  isActive 
                    ? "text-saffron-600 border-b-2 border-saffron-600" 
                    : "text-gray-700 hover:text-saffron-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/all-tours" 
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              All Yatras
            </NavLink>
            <NavLink 
              to="/about" 
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contact" 
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              Contact
            </NavLink>
            <Button 
              onClick={() => navigate("/admin")}
              variant="outline" 
              className="border-saffron-300 text-saffron-700 hover:bg-saffron-50"
            >
              Admin
            </Button>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-saffron-700">
              <Phone className="w-4 h-4" />
              <span className="font-medium">+91 98765 43210</span>
            </div>
            <Button className="btn-temple">
              Book Your Yatra
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-saffron-200 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className="text-gray-700 hover:text-saffron-600 font-medium px-4 py-2 rounded transition-colors"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink 
                to="/all-tours" 
                className="text-gray-700 hover:text-saffron-600 font-medium px-4 py-2 rounded transition-colors"
                onClick={toggleMenu}
              >
                All Yatras
              </NavLink>
              <NavLink 
                to="/about" 
                className="text-gray-700 hover:text-saffron-600 font-medium px-4 py-2 rounded transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </NavLink>
              <NavLink 
                to="/contact" 
                className="text-gray-700 hover:text-saffron-600 font-medium px-4 py-2 rounded transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
              <div className="flex items-center space-x-2 text-saffron-700 px-4 py-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="px-4">
                <Button className="btn-temple w-full" onClick={toggleMenu}>
                  Book Your Yatra
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
