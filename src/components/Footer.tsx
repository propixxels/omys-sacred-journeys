
import { Mail, Phone, MapPin, Star, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-temple-maroon to-saffron-800 text-white relative overflow-hidden">
      {/* Footer Mandala Background */}
      <div className="absolute inset-0 mandala-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-temple-gold to-saffron-400 rounded-full flex items-center justify-center">
                <span className="text-temple-maroon font-bold text-lg font-sanskrit">🕉️</span>
              </div>
              <h3 className="text-xl font-temple font-bold">Omy Travels</h3>
            </div>
            <p className="text-saffron-200 leading-relaxed">
              Sacred journeys across India with authentic spiritual experiences, 
              comfortable stays, and expert guidance since 2015.
            </p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-temple-gold" />
              <span className="text-saffron-200">Trusted by thousands of pilgrims</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-temple-gold">🔗 Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Tours", href: "#upcoming-yatras" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-saffron-200 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-temple-gold">🛕 Tour Categories</h3>
            <ul className="space-y-2">
              {[
                "North India Yatras", "South India Yatras", "Chaturmas Special", 
                "Pitru Paksha", "Kashi Yatra", "Ujjain Darshan"
              ].map((category) => (
                <li key={category}>
                  <a 
                    href="#upcoming-yatras"
                    className="text-saffron-200 hover:text-white transition-colors duration-300"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-temple-gold">📍 Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-temple-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-saffron-200">+91 73488 69099</p>
                  <p className="text-sm text-saffron-300">24/7 Yatra Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-temple-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-saffron-200">connect@omytravels.com</p>
                  <p className="text-sm text-saffron-300">Quick Response</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-temple-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-saffron-200">Dhundasi Nagar Rd</p>
                  <p className="text-saffron-200">Sirsi, Karnataka 581401</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-temple-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-saffron-200">9am to 6pm</p>
                  <p className="text-sm text-saffron-300">Sunday closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-saffron-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-saffron-300 text-sm">
            © 2025 Omy Travels. All rights reserved. Sacred journeys with devotion.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-saffron-300 text-sm">📱 Follow us:</span>
            {[
              { name: "Instagram", url: "https://instagram.com/omytravels" },
              { name: "Facebook", url: "https://facebook.com/omytravels" },
              { name: "YouTube", url: "https://youtube.com/omytravels" }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron-200 hover:text-white transition-colors duration-300 text-sm"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
