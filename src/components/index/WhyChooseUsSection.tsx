
import { Card } from "@/components/ui/card";
import { Heart, Shield, MapPin, Calendar, Users, Check } from "lucide-react";

const WhyChooseUsSection = () => {
  const whyChooseUs = [
    {
      icon: Heart,
      title: "Expert Guided Tours",
      description: "Professional tour guides and local experts for authentic experiences"
    },
    {
      icon: Shield,
      title: "Comfortable & Safe Travel",
      description: "AC transport, quality accommodation, and 24/7 support"
    },
    {
      icon: MapPin,
      title: "Handpicked Destinations",
      description: "Carefully selected locations covering heritage, adventure, and leisure"
    },
    {
      icon: Calendar,
      title: "Flexible Departures",
      description: "Multiple departure dates with customizable itineraries"
    },
    {
      icon: Users,
      title: "Easy Booking Process",
      description: "Simple online booking with secure payment options"
    },
    {
      icon: Check,
      title: "Dedicated Support Team",
      description: "Expert tour managers and round-the-clock assistance"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-temple font-bold text-orange-600 mb-4">
            Why Thousands Trust Omy Travels
          </h2>
          <p className="text-xl text-gray-600">
            Experience the difference of traveling with India's most trusted tour specialist
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <Card key={index} className="group p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm rounded-2xl">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-temple font-semibold text-orange-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
