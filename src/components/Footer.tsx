import { Mail, Phone, MapPin, Star, Clock, Home, Users, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-orange-600 text-white relative overflow-hidden">
      {/* Footer Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[slide-right_20s_ease-in-out_infinite]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <img 
                src="/lovable-uploads/7efea016-f501-432e-9c33-3064bfb876b6.png" 
                alt="Omy Travels & Tours" 
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/90 leading-relaxed text-sm">
              Incredible journeys across India with authentic travel experiences, 
              comfortable stays, and expert guidance since 2015.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Trusted by thousands of travelers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-temple font-semibold text-white flex items-center justify-center md:justify-start space-x-2 border-b border-white/30 pb-2">
              <Home className="w-5 h-5" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Tours", href: "/trips" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors duration-300 hover:underline text-sm font-medium block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Categories */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-temple font-semibold text-white flex items-center justify-center md:justify-start space-x-2 border-b border-white/30 pb-2">
              <MapPin className="w-5 h-5" />
              <span>Tour Categories</span>
            </h3>
            <ul className="space-y-3">
              {[
                "Heritage Tours", "Adventure Trips", "Beach Holidays", 
                "Mountain Retreats", "Cultural Experiences", "Wildlife Tours"
              ].map((category) => (
                <li key={category}>
                  <a 
                    href="/trips"
                    className="text-white/90 hover:text-white transition-colors duration-300 hover:underline text-sm font-medium block py-1"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-temple font-semibold text-white flex items-center justify-center md:justify-start space-x-2 border-b border-white/30 pb-2">
              <Users className="w-5 h-5" />
              <span>Contact Us</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start justify-center md:justify-start space-x-3 group">
                <Phone className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0 group-hover:animate-gentle-bounce" />
                <div className="text-center md:text-left">
                  <p className="text-white font-medium">+91 73488 69099</p>
                  <p className="text-xs text-white/80">24/7 Travel Support</p>
                </div>
              </div>
              
              <div className="flex items-start justify-center md:justify-start space-x-3 group">
                <Mail className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0 group-hover:animate-gentle-bounce" />
                <div className="text-center md:text-left">
                  <p className="text-white font-medium">connect@omytravels.com</p>
                  <p className="text-xs text-white/80">Quick Response</p>
                </div>
              </div>
              
              <div className="flex items-start justify-center md:justify-start space-x-3 group">
                <MapPin className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0 group-hover:animate-gentle-bounce" />
                <div className="text-center md:text-left">
                  <p className="text-white font-medium text-sm">Dhundasi Nagar Rd</p>
                  <p className="text-white font-medium text-sm">Sirsi, Karnataka 581401</p>
                </div>
              </div>
              
              <div className="flex items-start justify-center md:justify-start space-x-3 group">
                <Clock className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0 group-hover:animate-gentle-bounce" />
                <div className="text-center md:text-left">
                  <p className="text-white font-medium">9am to 6pm</p>
                  <p className="text-xs text-white/80">Sunday closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/90 text-sm font-medium text-center md:text-left">
            © 2025 Omy Travels. All rights reserved. Incredible journeys with expertise.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <span className="text-white/90 text-sm flex items-center space-x-2 font-medium">
              <Heart className="w-4 h-4 animate-pulse text-yellow-300" />
              <span>Follow us:</span>
            </span>
            <div className="flex items-center space-x-6">
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
                  className="text-white/90 hover:text-white transition-colors duration-300 text-sm hover:underline font-medium"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
