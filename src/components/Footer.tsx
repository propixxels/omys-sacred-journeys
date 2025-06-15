
import { Mail, Phone, MapPin, Star, Clock, Home, Users, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-saffron-500 to-orange-500 text-white relative overflow-hidden">
      {/* Footer Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[slide-right_15s_ease-in-out_infinite]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/7efea016-f501-432e-9c33-3064bfb876b6.png" 
                alt="Omy Travels & Tours" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-orange-50 leading-relaxed">
              Sacred journeys across India with authentic spiritual experiences, 
              comfortable stays, and expert guidance since 2015.
            </p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-orange-200 animate-pulse" />
              <span className="text-orange-50">Trusted by thousands of pilgrims</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-orange-100 flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Tours", href: "/trips" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-orange-100 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-orange-100 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Tour Categories</span>
            </h3>
            <ul className="space-y-2">
              {[
                "North India Yatras", "South India Yatras", "Chaturmas Special", 
                "Pitru Paksha", "Kashi Yatra", "Ujjain Darshan"
              ].map((category) => (
                <li key={category}>
                  <a 
                    href="/trips"
                    className="text-orange-100 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-orange-100 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Contact Us</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-200 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-orange-50">+91 73488 69099</p>
                  <p className="text-sm text-orange-100">24/7 Yatra Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-200 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-orange-50">connect@omytravels.com</p>
                  <p className="text-sm text-orange-100">Quick Response</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-200 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-orange-50">Dhundasi Nagar Rd</p>
                  <p className="text-orange-50">Sirsi, Karnataka 581401</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-200 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-orange-50">9am to 6pm</p>
                  <p className="text-sm text-orange-100">Sunday closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-400/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-orange-100 text-sm">
            © 2025 Omy Travels. All rights reserved. Sacred journeys with devotion.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-orange-100 text-sm flex items-center space-x-2">
              <Heart className="w-4 h-4 animate-pulse" />
              <span>Follow us:</span>
            </span>
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
                className="text-orange-100 hover:text-white transition-colors duration-300 text-sm hover:underline"
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
