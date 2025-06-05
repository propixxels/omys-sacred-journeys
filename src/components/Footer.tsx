
import { Mail, Phone, MapPin, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-temple-maroon to-saffron-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-temple-gold to-saffron-400 rounded-full flex items-center justify-center">
                <span className="text-temple-maroon font-bold text-lg font-sanskrit">ॐ</span>
              </div>
              <h3 className="text-xl font-temple font-bold">Omy Tours & Travels</h3>
            </div>
            <p className="text-saffron-200 leading-relaxed">
              Founded in 2015, we are dedicated to crafting soulful Hindu pilgrimages. 
              We prioritize comfortable stays, authentic rituals, and seamless logistics.
            </p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-temple-gold" />
              <span className="text-saffron-200">Trusted by 2,000+ pilgrims</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-temple-gold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Home", "All Yatras", "About Us", "Blog", 
                "Contact Us", "FAQs", "Privacy Policy"
              ].map((link) => (
                <li key={link}>
                  <a 
                    href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-saffron-200 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-temple-gold">Popular Yatras</h3>
            <ul className="space-y-2">
              {[
                "Kashi Yatra", "Ujjain Mahakal", "Dwarka Darshan", 
                "Char Dham", "Kedarnath Trek", "Amarnath Yatra"
              ].map((yatra) => (
                <li key={yatra}>
                  <a 
                    href={`/trip/${yatra.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-saffron-200 hover:text-white transition-colors duration-300"
                  >
                    {yatra}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-temple font-semibold text-temple-gold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-temple-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-saffron-200">+91 98765 43210</p>
                  <p className="text-sm text-saffron-300">24/7 Yatra Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-temple-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-saffron-200">support@omytravels.in</p>
                  <p className="text-sm text-saffron-300">Quick Response</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-temple-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-saffron-200">123 Temple Street</p>
                  <p className="text-saffron-200">Varanasi, UP 221001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-saffron-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-saffron-300 text-sm">
            © 2024 Omy Tours & Travels. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-saffron-300 text-sm">Follow us:</span>
            {["Facebook", "Instagram", "YouTube"].map((social) => (
              <a 
                key={social}
                href={`https://${social.toLowerCase()}.com/omytravels`}
                className="text-saffron-200 hover:text-white transition-colors duration-300 text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
