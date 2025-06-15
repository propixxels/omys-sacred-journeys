
import { Link } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/trips", label: "All Trips" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-saffron-500 relative z-50">
      <div className="container mx-auto px-4 lg:px-20 py-4">
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.to}
                to={item.to} 
                className="text-gray-700 hover:text-temple-maroon transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <a 
              href="tel:+917348869099" 
              className="flex items-center space-x-1 text-gray-700 hover:text-temple-maroon transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>+91 73488 69099</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className={cn(
              "w-6 h-6 text-gray-700 transition-all duration-300",
              isMobileMenuOpen && "rotate-90 opacity-0"
            )} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden z-40",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={closeMobileMenu} />

      {/* Mobile Menu Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <img 
            src="/lovable-uploads/7efea016-f501-432e-9c33-3064bfb876b6.png" 
            alt="Omy Travels & Tours" 
            className="h-10 w-auto"
          />
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close mobile menu"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <nav className="flex flex-col p-6">
          {menuItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={cn(
                "py-4 px-3 text-lg font-medium text-gray-700 hover:text-temple-maroon hover:bg-saffron-50 rounded-lg transition-all duration-200 transform",
                "animate-fade-in border-b border-gray-100 last:border-b-0"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'backwards'
              }}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Mobile Contact Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Contact Us
            </h3>
            <a 
              href="tel:+917348869099"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 py-3 px-3 text-gray-700 hover:text-temple-maroon hover:bg-saffron-50 rounded-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">+91 73488 69099</span>
            </a>
            <a 
              href="mailto:info@omytravels.com"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 py-3 px-3 text-gray-700 hover:text-temple-maroon hover:bg-saffron-50 rounded-lg transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">info@omytravels.com</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
