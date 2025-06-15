
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, CheckCircle, Heart, Star, Phone, Mail, MapPin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      {/* Standardized Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        
        {/* Regular Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 mandala-bg opacity-10" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-temple font-bold text-white mb-6 leading-tight">
                Discover India With Us
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
                At Omy Travels, we believe every journey is an opportunity to explore, learn, and create memories. 
                Founded with passion for travel and dedication to service, our mission is to make India's incredible destinations accessible, comfortable, and unforgettable for every traveler.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-8 text-center">
              Who We Are
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                We are a team of passionate travel planners, local experts, and service professionals 
                who are dedicated to showcasing India's incredible diversity. From heritage tours to adventure expeditions, 
                beach getaways to mountain retreats, our crew is handpicked to ensure authentic experiences, comfortable stays, 
                and seamless travel.
              </p>
              <p>
                Whether you're seeking spiritual journeys, cultural immersion, thrilling adventures, or relaxing holidays, 
                our curated tours take you through India's most beautiful and exciting destinations—with full attention to 
                your comfort and modern travel conveniences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-temple-cream to-saffron-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-12 text-center">
            Why Choose Omy Travels?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Heart className="w-8 h-8 text-saffron-600" />,
                title: "Handcrafted Experiences",
                description: "Not just tours, we offer immersive travel experiences"
              },
              {
                icon: <Users className="w-8 h-8 text-saffron-600" />,
                title: "Trusted by 2,000+ Travelers",
                description: "With 4.8★ average Google rating"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-saffron-600" />,
                title: "All-Inclusive Packages",
                description: "Stay, sightseeing, transport, and meals included"
              },
              {
                icon: <Shield className="w-8 h-8 text-saffron-600" />,
                title: "Local Experts",
                description: "Professional guides and drivers who know the local culture"
              },
              {
                icon: <Star className="w-8 h-8 text-saffron-600" />,
                title: "Comfortable Travel",
                description: "Quality accommodations, AC transport, and assistance for all ages"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-temple text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-temple font-semibold text-temple-maroon mb-3 text-lg">
                    ✅ {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <blockquote className="text-2xl font-temple text-temple-maroon italic">
              "When expertise meets passion, the journey becomes extraordinary."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Vision & Promise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-3xl font-temple font-bold text-temple-maroon mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be India's most trusted travel partner, creating memorable journeys that connect travelers with the country's rich heritage, natural beauty, and diverse cultures.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-3xl font-temple font-bold text-temple-maroon mb-6">
                Our Promise
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                You focus on creating memories and enjoying experiences. We'll take care of all the planning, logistics, and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-temple-maroon to-saffron-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-temple-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-temple-maroon font-bold text-xl font-sanskrit">ॐ</span>
            </div>
            <h2 className="text-3xl font-temple font-bold mb-2">Omy Travels</h2>
            <p className="text-xl mb-4">India's Most Trusted Travel Partner</p>
            <p className="text-lg italic mb-8">"Your journey, our expertise."</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+91 73488 69099</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>connect@omytravels.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
