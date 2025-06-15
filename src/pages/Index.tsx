import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Calendar, MapPin, Star, ArrowUp, Users, Heart, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TourData } from "@/types/tour";
import HeroSection from "@/components/index/HeroSection";
import QuickValuesBar from "@/components/index/QuickValuesBar";
import AboutUsIntro from "@/components/index/AboutUsIntro";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";
import EnquiryForm from "@/components/EnquiryForm";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tours, setTours] = useState<TourData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);

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

  const openWhatsApp = () => {
    const phoneNumber = "917348869099"; // Remove + and spaces for WhatsApp URL
    const message = "Hi! I'm interested in your tour packages. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
          // Map database response to TourData interface with proper type casting
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
            highlights: Array.isArray(tour.highlights) 
              ? (tour.highlights as string[])
              : [],
            itinerary: Array.isArray(tour.itinerary) 
              ? (tour.itinerary as { day: number; title: string; activities: string[] }[])
              : [],
            accommodation: typeof tour.accommodation === 'object' && tour.accommodation !== null 
              ? tour.accommodation as { hotels: string[]; roomType: string; amenities: string[] }
              : { hotels: [], roomType: "", amenities: [] },
            meals: typeof tour.meals === 'object' && tour.meals !== null 
              ? tour.meals as { included: string; special: string; note: string }
              : { included: "", special: "", note: "" },
            transport: typeof tour.transport === 'object' && tour.transport !== null 
              ? tour.transport as { pickup: string; drop: string; vehicle: string; luggage: string }
              : { pickup: "", drop: "", vehicle: "", luggage: "" },
            spiritualArrangements: Array.isArray(tour.spiritual_arrangements) 
              ? (tour.spiritual_arrangements as string[])
              : [],
            inclusions: Array.isArray(tour.inclusions) 
              ? (tour.inclusions as string[])
              : [],
            exclusions: Array.isArray(tour.exclusions) 
              ? (tour.exclusions as string[])
              : [],
            pricing: typeof tour.pricing === 'object' && tour.pricing !== null 
              ? tour.pricing as { doubleSharing: string; singleSupplement: string; child5to12: string; groupDiscount: string; earlyBird: string }
              : { doubleSharing: "", singleSupplement: "", child5to12: "", groupDiscount: "", earlyBird: "" },
            gallery: Array.isArray(tour.gallery) 
              ? (tour.gallery as string[])
              : [],
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
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50">
      <HeroSection />
      <QuickValuesBar />
      <AboutUsIntro />

      {/* Featured Tours Section - With Improved Text Clipping */}
      <section id="featured-tours" className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative">
        <div className="absolute inset-0 mandala-overlay opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-orange-600 mb-4">
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
                <Card key={tour.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 h-full flex flex-col">
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
                      <h3 className="font-temple font-bold text-lg line-clamp-2">{tour.name}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
                    <div className="space-y-2 flex-grow">
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
                        <span className="text-sm text-gray-600 line-clamp-2 leading-relaxed" title={tour.destinations}>
                          {tour.destinations}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t mt-auto">
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

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100 relative">
        <div className="absolute inset-0 mandala-overlay opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
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

      {/* How It Works */}
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
            <h2 className="text-4xl font-temple font-bold text-orange-600 mb-4">
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
                    <p className="font-semibold text-orange-600">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.city}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - UPDATED COLORS */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
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
              onClick={() => setIsEnquiryFormOpen(true)}
              className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-4 h-auto transition-all duration-300 transform hover:scale-105"
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
                <h3 className="text-2xl font-temple font-bold text-orange-600 mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 mb-6">
                  Subscribe for special offers, early-bird discounts, and travel insights.
                </p>
                <NewsletterSignup />
              </Card>

              <Card className="p-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <h3 className="text-2xl font-temple font-bold text-orange-600 mb-4">
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
            <h2 className="text-4xl font-temple font-bold text-orange-600 mb-4">
              Visit Us or Reach Out Anytime
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-temple font-semibold text-orange-600 text-lg">Contact Information</h4>
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
                  <h4 className="font-temple font-semibold text-orange-600 text-lg">Office Hours</h4>
                  <div className="space-y-2">
                    <p className="text-gray-600">9am to 6pm</p>
                    <p className="text-gray-600">Sunday closed</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-temple font-semibold text-orange-600 text-lg">Office Address</h4>
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

      {/* Enquiry Form Modal */}
      <EnquiryForm 
        isOpen={isEnquiryFormOpen} 
        onClose={() => setIsEnquiryFormOpen(false)} 
      />

      {/* Floating WhatsApp Button - Fixed to viewport */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Pulse animation backgrounds */}
        <div className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full animate-[ping_4s_ease-in-out_infinite] opacity-15"></div>
        <div className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full animate-[pulse_4s_ease-in-out_infinite] opacity-10"></div>
        
        {/* WhatsApp button - simplified structure */}
        <button
          onClick={openWhatsApp}
          className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center border-0 cursor-pointer"
          title="Chat with us on WhatsApp"
        >
          <img 
            src="/lovable-uploads/8acb597e-cc8e-447a-89e7-75d37af60313.png" 
            alt="WhatsApp" 
            className="w-10 h-10 object-contain"
          />
        </button>
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
