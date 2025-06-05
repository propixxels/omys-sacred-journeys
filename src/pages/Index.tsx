
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, MapPin, Users, Plane, Bus, Shield, Utensils, 
  Star, CheckCircle, Phone, Mail, ArrowRight, Heart,
  Navigation, CreditCard, ChevronLeft, ChevronRight, 
  MessageCircle, Clock, Award, Globe
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BookingForm from "@/components/BookingForm";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

interface Tour {
  id: string;
  name: string;
  duration: string;
  transport_mode: string;
  destinations: string;
  departure_date: string;
  cost: number;
  cost_details: string;
  description?: string;
}

const Index = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const heroImages = [
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=1080&fit=crop"
  ];

  const tourImages = [
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop"
  ];

  useEffect(() => {
    fetchTours();
    
    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      clearInterval(heroInterval);
    };
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('departure_date', { ascending: true });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (tourId: string) => {
    navigate(`/trip/${tourId}`);
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you!",
      description: "You've been subscribed to our newsletter for spiritual updates.",
    });
    setEmail("");
  };

  const testimonials = [
    {
      quote: "Omy Travels made our Kashi Yatra unforgettable. Perfect arrangements and spiritual guidance throughout the journey.",
      name: "Rajesh Kumar",
      city: "Mumbai",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Excellent service and authentic experience. The priests were knowledgeable and the arrangements were flawless.",
      name: "Priya Sharma",
      city: "Delhi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Best pilgrimage tour we've ever taken. Everything was perfectly organized with deep spiritual focus.",
      name: "Suresh Patel",
      city: "Ahmedabad",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-xl font-temple text-temple-maroon animate-pulse">Loading sacred journeys...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Spiritual journey ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/40"></div>
            </div>
          ))}
        </div>

        {/* Floating mandala background */}
        <div 
          className="absolute inset-0 opacity-10 animate-spin" 
          style={{ 
            backgroundImage: `url(/lovable-uploads/9224665a-3020-4a03-9d34-e4d7523f8a73.png)`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top right',
            animationDuration: '120s'
          }}
        ></div>

        {/* Hero Content - Left Aligned */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-temple font-bold mb-6 text-left leading-tight">
                Omy Travels
              </h1>
              <h2 className="text-2xl md:text-3xl mb-4 font-medium text-left">
                Sacred Journeys Begin Here
              </h2>
              <p className="text-lg md:text-xl mb-8 text-orange-200 text-left max-w-2xl">
                Authentic Spiritual Experiences • Historic Temples • Divine Blessings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => document.getElementById('upcoming-yatras')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Yatras
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-temple-maroon px-8 py-4 text-lg transition-all duration-300 backdrop-blur-sm"
                  onClick={() => window.location.href = 'tel:+917348869099'}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-8 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917348869099"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Upcoming Yatras Section */}
      <section id="upcoming-yatras" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative overflow-hidden">
        {/* Rotating mandala background */}
        <div 
          className="absolute top-10 right-10 opacity-5 animate-spin" 
          style={{ 
            backgroundImage: `url(/lovable-uploads/9224665a-3020-4a03-9d34-e4d7523f8a73.png)`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'no-repeat',
            width: '300px',
            height: '300px',
            animationDuration: '100s'
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-6">
              Upcoming Sacred Pilgrimage Tours
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.slice(0, 4).map((tour, index) => (
              <Card 
                key={tour.id} 
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tourImages[index % tourImages.length]}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                    Popular
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-temple text-temple-maroon group-hover:text-orange-600 transition-colors duration-300">
                    {tour.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-orange-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(tour.departure_date).toLocaleDateString('en-IN')}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {tour.transport_mode === 'bus' ? (
                      <Bus className="w-4 h-4 text-orange-600" />
                    ) : (
                      <Plane className="w-4 h-4 text-orange-600" />
                    )}
                    <span className="text-sm text-gray-600 capitalize">{tour.transport_mode}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-600">{tour.destinations.split(',').slice(0, 2).join(', ')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-orange-600">
                      ₹{tour.cost.toLocaleString()}
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleViewDetails(tour.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Intro Snippet */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -left-20 top-20 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop" 
            alt="Temple architecture" 
            className="w-96 h-96 object-cover rounded-full"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-8 animate-fade-in">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed animate-fade-in">
              Omy Travels is a trusted name in spiritual journeys across India. From Kashi to Rameshwaram, 
              we curate deeply devotional, safe, and comfortable yatras for seekers of all ages.
            </p>
            <Button 
              variant="outline" 
              className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/about')}
            >
              Read Full Story
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Omy Travels */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
        <div 
          className="absolute bottom-10 left-10 opacity-5 animate-spin" 
          style={{ 
            backgroundImage: `url(/lovable-uploads/9224665a-3020-4a03-9d34-e4d7523f8a73.png)`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'no-repeat',
            width: '200px',
            height: '200px',
            animationDuration: '80s'
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-6 animate-fade-in">
              Why Thousands Trust Omy Travels
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Spiritually Guided Tours", description: "Expert priests and guides for authentic experiences", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=200&fit=crop" },
              { icon: Shield, title: "Comfortable & Safe Travel", description: "Modern AC transport with safety as priority", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop" },
              { icon: Heart, title: "Handpicked Pilgrimage Sites", description: "Most sacred and powerful spiritual destinations", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=200&fit=crop" },
              { icon: Calendar, title: "Scheduled Group Departures", description: "Regular departures with like-minded pilgrims", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=200&fit=crop" },
              { icon: Phone, title: "Easy Enquiry Process", description: "Simple booking with transparent pricing", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=200&fit=crop" },
              { icon: CheckCircle, title: "Dedicated Support Team", description: "24/7 assistance throughout your journey", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=200&fit=crop" }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"></div>
                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  <CardContent className="pt-6 text-center">
                    <h3 className="font-temple font-semibold text-temple-maroon mb-3 text-lg group-hover:text-orange-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Yatra List */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=800&fit=crop" 
            alt="Temple" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-6">
              Yatra Calendar – July to September 2025
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tours.map((tour, index) => (
              <Card 
                key={tour.id} 
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-102 bg-gradient-to-br from-white to-orange-50/30 rounded-2xl overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex">
                  <div className="w-1/3 relative overflow-hidden">
                    <img
                      src={tourImages[index % tourImages.length]}
                      alt={tour.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-600/20"></div>
                  </div>
                  <div className="w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl font-temple text-temple-maroon group-hover:text-orange-600 transition-colors duration-300">
                          {tour.name}
                        </CardTitle>
                        <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                          Popular
                        </Badge>
                      </div>
                      <CardDescription className="text-orange-600 font-medium">
                        {tour.duration}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span>{new Date(tour.departure_date).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {tour.transport_mode === 'bus' ? (
                            <Bus className="w-4 h-4 text-orange-600" />
                          ) : (
                            <Plane className="w-4 h-4 text-orange-600" />
                          )}
                          <span className="capitalize">{tour.transport_mode}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 text-orange-600 flex-shrink-0" />
                        <span>{tour.destinations}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-2xl font-bold text-orange-600">
                          ₹{tour.cost.toLocaleString()}
                        </div>
                        <Button 
                          onClick={() => handleViewDetails(tour.id)}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105"
                        >
                          View Tour
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Break - Quote Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 animate-spin" 
          style={{ 
            backgroundImage: `url(/lovable-uploads/9224665a-3020-4a03-9d34-e4d7523f8a73.png)`,
            backgroundSize: '600px 600px',
            backgroundRepeat: 'repeat',
            animationDuration: '150s'
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-temple font-bold mb-6 leading-relaxed">
              "Yatra is not a trip. It is a journey of the soul towards the Divine."
            </h2>
            <p className="text-2xl font-sanskrit opacity-90">ॐ नमः शिवाय</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-3 animate-spin" 
          style={{ 
            backgroundImage: `url(/lovable-uploads/9224665a-3020-4a03-9d34-e4d7523f8a73.png)`,
            backgroundSize: '800px 800px',
            backgroundRepeat: 'no-repeat',
            width: '800px',
            height: '800px',
            animationDuration: '200s'
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-6">
              What Our Devotees Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <Carousel className="max-w-6xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <CardContent className="pt-8 pb-6 px-6 text-center">
                      <div className="relative mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-orange-200 group-hover:border-orange-400 transition-colors duration-300"
                        />
                      </div>
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-temple-maroon mb-1">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.city}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-orange-200 text-orange-600 hover:bg-orange-100" />
            <CarouselNext className="border-orange-200 text-orange-600 hover:bg-orange-100" />
          </Carousel>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-700 to-temple-maroon text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `url(/lovable-uploads/9224665a-3020-4a03-9d34-e4d7523f8a73.png)`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-temple font-bold mb-6 animate-fade-in">
            Ready to Begin Your Yatra?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in">
            Let us know your interest — we'll guide you personally.
          </p>
          <Button 
            size="lg"
            className="bg-white text-temple-maroon hover:bg-orange-50 px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => setIsBookingOpen(true)}
          >
            Enquire Now
          </Button>
        </div>
      </section>

      {/* Newsletter & WhatsApp */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="flex space-x-8">
            <img src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300&h=400&fit=crop" alt="" className="w-64 h-80 object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=400&fit=crop" alt="" className="w-64 h-80 object-cover rounded-lg mt-12" />
            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=400&fit=crop" alt="" className="w-64 h-80 object-cover rounded-lg" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-temple font-bold text-temple-maroon mb-6">
            Stay Updated on Our Upcoming Yatras
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get dates, spiritual updates, and exclusive offers
          </p>
          
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={handleNewsletterSignup} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="flex-1 px-4 py-3 rounded-lg border border-orange-300 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                required
              />
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
            
            <Button 
              variant="outline"
              className="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
              onClick={() => window.open('https://wa.me/917348869099', '_blank')}
            >
              Join Our WhatsApp Updates
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-6">
              Visit Us or Reach Out Anytime
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-temple-maroon">Phone</p>
                  <p className="text-gray-700">+91 73488 69099</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-temple-maroon">Email</p>
                  <p className="text-gray-700">connect@omytravels.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-temple-maroon">Office Address</p>
                  <p className="text-gray-700">Dhundasi Nagar Rd, Sirsi, Karnataka 581401</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-temple-maroon">Office Hours</p>
                  <p className="text-gray-700">9am to 6pm, Sunday closed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Google Map Integration</p>
                  <p className="text-gray-500 text-sm">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-temple text-temple-maroon">
              Book Your Pilgrimage
            </DialogTitle>
          </DialogHeader>
          {selectedTour ? (
            <BookingForm
              tourId={selectedTour.id}
              tourName={selectedTour.name}
              onClose={() => setIsBookingOpen(false)}
            />
          ) : (
            <BookingForm
              tourId=""
              tourName="General Enquiry"
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
