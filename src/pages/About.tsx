
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, CheckCircle, Heart, Star, Phone, Mail, MapPin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-temple-maroon to-saffron-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-temple font-bold mb-6">
            Walk the Sacred Path With Us
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            At Omy Travels, we believe every step on a pilgrimage is a step closer to the divine. 
            Founded with devotion and care, our mission is to make India's sacred journeys accessible, safe, and soul-stirring for every seeker.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-8 text-center">
              Who We Are
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                We are a team of spiritual travel planners, cultural experts, and service professionals 
                who are passionate about India's rich religious heritage. From temple town guides to 
                pooja coordinators, our crew is handpicked to ensure authentic rituals, comfortable stays, 
                and seamless travel.
              </p>
              <p>
                Whether you're a first-time pilgrim or a lifelong devotee, our curated tours take you 
                through the most powerful and ancient sites in Hindu Dharma—with full respect to tradition 
                and modern travel comforts.
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
                title: "Handcrafted Pilgrimages",
                description: "Not just tourism, we offer spiritual experiences"
              },
              {
                icon: <Users className="w-8 h-8 text-saffron-600" />,
                title: "Trusted by 2,000+ Yatris",
                description: "With 4.8★ average Google rating"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-saffron-600" />,
                title: "All-Inclusive Packages",
                description: "Stay, darshan, transport, and pooja rituals included"
              },
              {
                icon: <Shield className="w-8 h-8 text-saffron-600" />,
                title: "Local Experts",
                description: "Priests, guides, and drivers who know the spiritual pulse"
              },
              {
                icon: <Star className="w-8 h-8 text-saffron-600" />,
                title: "Senior-Friendly Tours",
                description: "Wheelchair help, low-walking itineraries, medical support"
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
              "When tradition meets trust, the journey becomes sacred."
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
                To rekindle faith and spiritual curiosity through culturally rich and well-supported pilgrimages.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-3xl font-temple font-bold text-temple-maroon mb-6">
                Our Promise
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                You focus on prayer, peace, and experience. We'll take care of everything else.
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
            <p className="text-xl mb-4">India's Most Trusted Hindu Pilgrimage Partner</p>
            <p className="text-lg italic mb-8">"Your journey, our devotion."</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>support@omytravels.in</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
