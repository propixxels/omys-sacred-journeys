import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Calendar, MapPin, Star, ArrowUp, Users, Heart, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TourData } from "@/types/tour";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tours, setTours] = useState<TourData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Discover India's Hidden Gems",
      subtitle: "Experience breathtaking destinations across incredible India"
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Adventure Awaits",
      subtitle: "Discover thrilling experiences and unforgettable moments"
    },
    {
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Cultural Heritage Tours",
      subtitle: "Explore India's rich history and vibrant traditions"
    }
  ];

  // Fetch tours from database
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .eq('isDraft', false)
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) {
          console.error('Error fetching tours:', error);
        } else if (data) {
          // Map database response to TourData interface
          const mappedTours: TourData[] = data.map(tour => ({
            id: tour.id,
            name: tour.name,
            duration: tour.duration,
            transport_mode: tour.transport_mode,
            destinations: tour.destinations,
            departure_date: tour.departure_date,
            cost: tour.cost,
            cost_details: tour.cost_details || "",
            description: tour.description || "",
            slug: tour.slug || "",
            image_url: tour.image_url || "",
            rating: tour.rating,
            pilgrims_count: tour.pilgrims_count,
            next_departure: tour.next_departure || "",
            highlights: Array.isArray(tour.highlights) ? tour.highlights : [],
            itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
            accommodation: typeof tour.accommodation === 'object' && tour.accommodation !== null 
              ? tour.accommodation as any 
              : { hotels: [], roomType: "", amenities: [] },
            meals: typeof tour.meals === 'object' && tour.meals !== null 
              ? tour.meals as any 
              : { included: "", special: "", note: "" },
            transport: typeof tour.transport === 'object' && tour.transport !== null 
              ? tour.transport as any 
              : { pickup: "", drop: "", vehicle: "", luggage: "" },
            spiritualArrangements: Array.isArray(tour.spiritual_arrangements) ? tour.spiritual_arrangements : [],
            inclusions: Array.isArray(tour.inclusions) ? tour.inclusions : [],
            exclusions: Array.isArray(tour.exclusions) ? tour.exclusions : [],
            pricing: typeof tour.pricing === 'object' && tour.pricing !== null 
              ? tour.pricing as any 
              : { doubleSharing: "", singleSupplement: "", child5to12: "", groupDiscount: "", earlyBird: "" },
            gallery: Array.isArray(tour.gallery) ? tour.gallery : [],
            isDraft: tour.isDraft || false
          }));
          
          setTours(mappedTours);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const testimonials = [
    {
      name: "Priya Sharma",
      city: "Mumbai",
      rating: 5,
      comment: "Absolutely amazing experience! Every detail was perfectly arranged and the destinations were breathtaking.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Rajesh Kumar",
      city: "Delhi",
      rating: 5,
      comment: "Professional service with excellent guides and comfortable accommodations. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Meera Patel",
      city: "Ahmedabad",
      rating: 5,
      comment: "From adventure trips to cultural tours, they offer the best travel experiences in India!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    }
  ];

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

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-screen md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-7xl font-temple font-bold text-left mb-4 md:mb-6 text-white drop-shadow-2xl">
                Incredible Journeys
                <span className="block text-temple-gold">Await You</span>
              </h1>
              <p className="text-lg md:text-2xl text-left mb-6 md:mb-8 text-white/90 max-w-2xl leading-relaxed drop-shadow-lg">
                Discover India's diverse beauty - from majestic temples to pristine beaches, royal palaces to mountain adventures
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="btn-temple text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/trips">Explore All Tours</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-xl"
                  asChild
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-orange-500 scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Values Bar */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Desktop/Tablet View */}
          <div className="hidden md:flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">100% Trusted by Travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Comfortable AC Transport</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Quality Accommodations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">Expert Local Guides</span>
            </div>
          </div>
          
          {/* Mobile Infinite Sliding View */}
          <div className="md:hidden">
            <div className="flex animate-[slide-left_15s_linear_infinite] text-white">
              <div className="flex items-center space-x-8 whitespace-nowrap">
                {/* First set */}
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">100% Trusted by Travelers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Comfortable AC Transport</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">Quality Accommodations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Expert Local Guides</span>
                </div>
                {/* Second set for seamless loop */}
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">100% Trusted by Travelers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Comfortable AC Transport</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">Quality Accommodations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Expert Local Guides</span>
                </div>
                {/* Third set for seamless loop */}
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">100% Trusted by Travelers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Comfortable AC Transport</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">Quality Accommodations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Expert Local Guides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section - Now Dynamic */}
      <section id="featured-tours" className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative">
        <div className="absolute inset-0 mandala-overlay opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-4">
              Featured Tours & Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of travelers on these amazing journeys across India's most beautiful destinations
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tours.map((tour) => (
                <Card key={tour.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0">
                  <div className="relative">
                    <img 
                      src={tour.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"} 
                      alt={tour.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {tour.rating && tour.rating >= 4.5 && (
                      <Badge className="absolute top-3 left-3 bg-orange-500 text-white border-0">
                        Popular
                      </Badge>
                    )}
                    
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-temple font-bold text-lg">{tour.name}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(tour.departure_date)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-1">
                        <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{tour.destinations}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-2xl font-bold text-orange-600">{formatPrice(tour.cost)}</div>
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Link to={`/trip/${tour.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">No tours available at the moment.</p>
              <p className="text-gray-500">Please check back later for exciting new destinations!</p>
            </div>
          )}

          {tours.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/trips">View All Tours</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* About Us Intro */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl font-temple font-bold text-temple-maroon">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Omy Travels is a trusted name in travel experiences across India. From ancient temples to pristine beaches, 
                royal heritage to mountain adventures - we curate diverse, comfortable, and memorable journeys for all types of travelers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded with passion for travel and dedication to service, our mission is to make India's incredible destinations 
                accessible, enjoyable, and transformative for every traveler who journeys with us.
              </p>
              <Button 
                asChild
                variant="outline" 
                className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3"
              >
                <Link to="/about">Read Full Story</Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Temple"
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Cultural gathering"
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 animate-gentle-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100 relative">
        <div className="absolute inset-0 mandala-overlay opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
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
                <h3 className="text-xl font-temple font-semibold text-temple-maroon mb-3">
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

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Your Journey in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-temple font-semibold text-temple-maroon">Choose Your Tour</h3>
              <p className="text-gray-600">Browse destinations, check dates & pricing to find your perfect getaway</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-temple font-semibold text-temple-maroon">Book & Pay Securely</h3>
              <p className="text-gray-600">Easy booking with flexible payment options and instant confirmation</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-temple font-semibold text-temple-maroon">Travel & Explore</h3>
              <p className="text-gray-600">Receive travel kit, enjoy guided tours, create unforgettable memories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 mandala-overlay opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <blockquote className="text-3xl md:text-4xl font-temple font-medium text-white leading-relaxed">
            "Travel is not just a journey. It's a discovery of the incredible diversity and beauty of India."
          </blockquote>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100 relative">
        <div className="absolute inset-0 mandala-overlay opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              What Our Travelers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-temple-maroon">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.city}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-temple-maroon to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 mandala-overlay opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 text-white">
            <h2 className="text-4xl font-temple font-bold">
              Ready to Begin Your Adventure?
            </h2>
            <p className="text-xl">
              Let us know your travel interests — we'll guide you personally through your perfect journey.
            </p>
            <Button 
              className="bg-white text-temple-maroon hover:bg-orange-50 text-lg px-8 py-4 h-auto transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              Enquire Now
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter & WhatsApp */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100 relative">
        <div className="absolute inset-0 mandala-overlay opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <h3 className="text-2xl font-temple font-bold text-temple-maroon mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 mb-6">
                  Subscribe for special offers, early-bird discounts, and travel insights.
                </p>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Your Email Address" 
                    className="flex-1"
                  />
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    Subscribe
                  </Button>
                </div>
              </Card>

              <Card className="p-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <h3 className="text-2xl font-temple font-bold text-temple-maroon mb-4">
                  WhatsApp Updates
                </h3>
                <p className="text-gray-600 mb-6">
                  Join our WhatsApp community for instant updates on tour schedules and offers.
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join WhatsApp Group
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Visit Us or Reach Out Anytime
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-temple font-semibold text-temple-maroon text-lg">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span>+91 73488 69099</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span>connect@omytravels.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-temple font-semibold text-temple-maroon text-lg">Office Hours</h4>
                  <div className="space-y-2">
                    <p className="text-gray-600">9am to 6pm</p>
                    <p className="text-gray-600">Sunday closed</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-temple font-semibold text-temple-maroon text-lg">Office Address</h4>
                <p className="text-gray-600">
                  Dhundasi Nagar Rd<br />
                  Sirsi, Karnataka 581401
                </p>
              </div>
            </div>

            <div className="rounded-lg h-80 overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.123456789!2d74.8339!3d14.6243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM3JzI3LjUiTiA3NMKwNTAnMDIuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Omy Travels Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg animate-gentle-bounce"
        >
          <Users className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <Button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
