
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Star, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const featuredTours = [
    {
      id: "kashi-yatra",
      name: "Kashi Yatra",
      duration: "5 Days / 4 Nights",
      price: "₹12,499",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience Ganga Aarti & VIP Darshan at the sacred city of Varanasi",
      highlights: ["Ganga Aarti", "VIP Darshan", "Boat Ride", "Pure Veg Meals"],
      rating: 4.8,
      pilgrims: 245
    },
    {
      id: "ujjain-mahakal",
      name: "Ujjain Mahakaleshwar",
      duration: "3 Days / 2 Nights",
      price: "₹8,999",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Witness the divine Bhasma Aarti at one of the 12 Jyotirlingas",
      highlights: ["Bhasma Aarti", "Jyotirlinga Darshan", "Rudrabhishek", "Temple Guide"],
      rating: 4.9,
      pilgrims: 189
    },
    {
      id: "dwarka-darshan",
      name: "Dwarka Darshan",
      duration: "4 Days / 3 Nights",
      price: "₹15,999",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Visit Krishna's divine city and experience spiritual bliss",
      highlights: ["Dwarkadhish Temple", "Bet Dwarka", "Rukmini Temple", "Gopi Talav"],
      rating: 4.7,
      pilgrims: 167
    },
    {
      id: "char-dham",
      name: "Char Dham Yatra",
      duration: "12 Days / 11 Nights",
      price: "₹45,999",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Complete the sacred circuit of four divine abodes in the Himalayas",
      highlights: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
      rating: 5.0,
      pilgrims: 89
    },
    {
      id: "kedarnath-trek",
      name: "Kedarnath Trek",
      duration: "6 Days / 5 Nights",
      price: "₹18,999",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Trek to the divine abode of Lord Shiva in the Himalayas",
      highlights: ["Helicopter Option", "Guided Trek", "Temple Darshan", "Mountain Views"],
      rating: 4.6,
      pilgrims: 134
    },
    {
      id: "amarnath-yatra",
      name: "Amarnath Yatra",
      duration: "8 Days / 7 Nights",
      price: "₹28,999",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Sacred journey to the ice lingam in Kashmir's divine cave",
      highlights: ["Ice Lingam", "Helicopter Service", "Pahalgam Base", "Medical Support"],
      rating: 4.8,
      pilgrims: 76
    }
  ];

  const whyChooseUs = [
    {
      icon: <Check className="w-6 h-6" />,
      title: "Certified Guides & Priests",
      description: "24×7 temple support and authentic ritual guidance"
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "All-Inclusive Packages",
      description: "Stay, Meals, Transport, and Spiritual Rituals included"
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Transparent Pricing",
      description: "No hidden charges, clear breakdown of all costs"
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Customizable Itineraries",
      description: "Group or Private Yatras tailored to your needs"
    }
  ];

  const testimonials = [
    {
      name: "Ritu Sharma",
      city: "Mumbai",
      rating: 5,
      comment: "Absolutely life-changing experience! The guide made every ritual so special."
    },
    {
      name: "Rajesh Kumar",
      city: "Delhi",
      rating: 5,
      comment: "Perfect organization. Every detail was taken care of beautifully."
    },
    {
      name: "Meera Patel",
      city: "Ahmedabad",
      rating: 5,
      comment: "Spiritual journey that touched my soul. Highly recommended!"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-br from-saffron-100 via-temple-cream to-saffron-200 overflow-hidden">
        <div className="absolute inset-0 mandala-bg opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-temple font-bold text-temple-maroon leading-tight">
              Embark on a <span className="text-temple">Divine Journey</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Curated Hindu Pilgrimages Across India – Kashi, Ujjain, Dwarka, and More
            </p>
            
            {/* Quick Values */}
            <div className="flex flex-wrap gap-4 py-4">
              {[
                { icon: "🔱", text: "100% Trusted" },
                { icon: "🚌", text: "AC Transport" },
                { icon: "🍲", text: "Pure Veg Meals" },
                { icon: "📜", text: "Expert Priests" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => navigate("#tours")}
              className="btn-temple text-lg px-8 py-4 h-auto"
            >
              View All Yatras
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-temple-gold/20 to-saffron-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-temple-maroon/20 to-saffron-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Featured Tours Section */}
      <section id="tours" className="py-16 temple-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Our Flagship Yatras
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most beloved pilgrimage packages, crafted with devotion and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour, index) => (
              <Card key={tour.id} className="card-temple hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-temple-gold text-temple-maroon font-medium">
                      {tour.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 text-temple-gold fill-current" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-temple text-temple-maroon group-hover:text-saffron-600 transition-colors">
                      {tour.name}
                    </CardTitle>
                    <span className="text-2xl font-bold text-saffron-600">
                      {tour.price}
                    </span>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {tour.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-saffron-100 text-saffron-700">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.pilgrims} pilgrims</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Next departure</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate(`/trip/${tour.id}`)}
                    className="w-full btn-temple"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-white to-saffron-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Why Pilgrims Trust Omy Travels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Over 2,000 satisfied pilgrims have chosen us for their spiritual journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="card-temple text-center p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-temple-maroon rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-temple font-semibold text-temple-maroon mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 temple-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Your Pilgrimage in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <MapPin className="w-8 h-8" />,
                title: "Choose Your Yatra",
                description: "Browse tours, check dates & prices to find your perfect spiritual journey"
              },
              {
                step: "2",
                icon: <Calendar className="w-8 h-8" />,
                title: "Book & Pay Securely",
                description: "50% advance booking with multiple payment options and instant confirmation"
              },
              {
                step: "3",
                icon: <Star className="w-8 h-8" />,
                title: "Depart & Experience",
                description: "Receive yatra kit, enjoy guided darshans, and return home blessed"
              }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-saffron-500 to-temple-maroon rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-temple-gold rounded-full flex items-center justify-center text-temple-maroon font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-temple font-semibold text-temple-maroon">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-saffron-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Hear from Our Pilgrims
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from souls who have journeyed with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-temple p-6">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-temple-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-temple-maroon rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-temple-maroon">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.city}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-temple-maroon to-saffron-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-temple font-bold mb-4">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-xl text-saffron-200 mb-8 max-w-2xl mx-auto">
            Join thousands of pilgrims who have experienced divine transformation with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-temple-gold text-temple-maroon hover:bg-temple-gold/90 font-medium px-8 py-4 h-auto"
            >
              Book Your Yatra Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-temple-maroon font-medium px-8 py-4 h-auto"
            >
              Call +91 98765 43210
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
