
import { MapPin, Check, Heart } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-temple font-bold text-orange-600 mb-4">
            Your Journey in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-temple font-semibold text-orange-600">Choose Your Tour</h3>
            <p className="text-gray-600">Browse destinations, check dates & pricing to find your perfect getaway</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-temple font-semibold text-orange-600">Book & Pay Securely</h3>
            <p className="text-gray-600">Easy booking with flexible payment options and instant confirmation</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-temple font-semibold text-orange-600">Travel & Explore</h3>
            <p className="text-gray-600">Receive travel kit, enjoy guided tours, create unforgettable memories</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
