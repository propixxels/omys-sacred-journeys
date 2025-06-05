
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
  const [currentTourSlide, setCurrentTourSlide] = useState(0);
  const { toast } = useToast();

  const heroImages = [
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1920&h=1080&fit=crop", // Varanasi Ganga Aarti
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&h=1080&fit=crop", // Temple architecture
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop", // Hindu temple
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=1080&fit=crop"  // Spiritual gathering
  ];

  useEffect(() => {
    fetchTours();
    
    // Auto-slide hero images
    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Auto-slide tour cards
    const tourInterval = setInterval(() => {
      if (tours.length > 0) {
        setCurrentTourSlide((prev) => (prev + 4) % tours.length);
      }
    }, 8000);

    return () => {
      clearInterval(heroInterval);
      clearInterval(tourInterval);
    };
  }, [tours.length]);

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

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
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
      rating: 5
    },
    {
      quote: "Excellent service and authentic experience. The priests were knowledgeable and the arrangements were flawless.",
      name: "Priya Sharma",
      city: "Delhi",
      rating: 5
    },
    {
      quote: "Best pilgrimage tour we've ever taken. Everything was perfectly organized with deep spiritual focus.",
      name: "Suresh Patel",
      city: "Ahmedabad",
      rating: 5
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-temple font-bold mb-6 animate-fade-in">
              Omy Travels
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-medium">
              Sacred Journeys Begin Here
            </p>
            <p className="text-lg md:text-xl mb-8 text-saffron-200">
              • Authentic Spiritual Experiences • Historic Temples • Divine Blessings
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-4 text-lg"
                onClick={() => document.getElementById('upcoming-yatras')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🛕 Explore Yatras
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-temple-maroon px-8 py-4 text-lg"
                onClick={() => window.location.href = 'tel:+917348869099'}
              >
                📞 Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-saffron-500' : 'bg-white/50'
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
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Upcoming Yatras Section */}
      <section id="upcoming-yatras" className="py-16 bg-gradient-to-br from-saffron-50 to-temple-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Upcoming Sacred Pilgrimage Tours
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.slice(0, 4).map((tour) => (
              <Card key={tour.id} className="border-saffron-200 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                <div className="h-40 bg-gradient-to-br from-saffron-200 to-temple-gold rounded-t-xl flex items-center justify-center">
                  <span className="text-4xl">🛕</span>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-temple text-temple-maroon">
                    ✨ {tour.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-saffron-600">
                    <Calendar className="w-4 h-4" />
                    <span>📅 {new Date(tour.departure_date).toLocaleDateString('en-IN')}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {tour.transport_mode === 'bus' ? (
                      <><Bus className="w-4 h-4 text-saffron-600" /> 🚎</>
                    ) : (
                      <><Plane className="w-4 h-4 text-saffron-600" /> ✈️</>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm">
                    <span className="text-gray-600">🛕 {tour.destinations.split(',').slice(0, 2).join(', ')}</span>
                  </div>

                  <div className="text-xl font-bold text-saffron-600">
                    💰 ₹{tour.cost.toLocaleString()}
                  </div>

                  <Button 
                    className="w-full bg-saffron-600 hover:bg-saffron-700 text-white"
                    onClick={() => handleBookNow(tour)}
                  >
                    🔍 View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Intro Snippet */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Omy Travels is a trusted name in spiritual journeys across India. From Kashi to Rameshwaram, 
              we curate deeply devotional, safe, and comfortable yatras for seekers of all ages.
            </p>
            <Button 
              variant="outline" 
              className="border-saffron-600 text-saffron-600 hover:bg-saffron-600 hover:text-white px-8 py-3"
              onClick={() => window.location.href = '/about'}
            >
              Read Full Story
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Omy Travels */}
      <section className="py-16 bg-gradient-to-br from-temple-cream to-saffron-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Why Thousands Trust Omy Travels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🧘‍♂️", title: "Spiritually Guided Tours", description: "Expert priests and guides for authentic experiences" },
              { icon: "🚌", title: "Comfortable & Safe Travel", description: "Modern AC transport with safety as priority" },
              { icon: "📿", title: "Handpicked Pilgrimage Sites", description: "Most sacred and powerful spiritual destinations" },
              { icon: "🗓️", title: "Scheduled Group Departures", description: "Regular departures with like-minded pilgrims" },
              { icon: "📱", title: "Easy Enquiry Process", description: "Simple booking with transparent pricing" },
              { icon: "🙏", title: "Dedicated Support Team", description: "24/7 assistance throughout your journey" }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:bg-saffron-50 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-temple font-semibold text-temple-maroon mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Yatra List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              🛕 Yatra Calendar – July to September 2025
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tours.map((tour) => (
              <Card key={tour.id} className="border-saffron-200 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-temple text-temple-maroon">
                      {tour.name}
                    </CardTitle>
                    <Badge className="bg-saffron-600 text-white">Popular</Badge>
                  </div>
                  <CardDescription className="text-saffron-600 font-medium">
                    {tour.duration}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-temple-gold" />
                      <span>{new Date(tour.departure_date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {tour.transport_mode === 'bus' ? (
                        <><Bus className="w-4 h-4 text-saffron-600" /> Bus</>
                      ) : (
                        <><Plane className="w-4 h-4 text-saffron-600" /> Flight</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 text-saffron-600" />
                    <span>{tour.destinations}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-saffron-600">
                      ₹{tour.cost.toLocaleString()}
                    </div>
                    <Button 
                      onClick={() => handleBookNow(tour)}
                      className="bg-saffron-600 hover:bg-saffron-700 text-white"
                    >
                      View Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Break - Quote Section */}
      <section className="py-16 bg-gradient-to-r from-saffron-500 to-temple-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 mandala-bg opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-temple font-bold mb-4">
              "Yatra is not a trip. It is a journey of the soul towards the Divine."
            </h2>
            <p className="text-xl font-sanskrit">ॐ नमः शिवाय</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-saffron-50 to-temple-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              💬 What Our Devotees Say
            </h2>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-saffron-200">
                    <CardContent className="pt-6">
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-temple-gold text-temple-gold" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                      <div className="text-sm">
                        <p className="font-semibold text-temple-maroon">{testimonial.name}</p>
                        <p className="text-gray-500">{testimonial.city}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-saffron-600 to-temple-maroon text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-temple font-bold mb-4">
            🧭 Ready to Begin Your Yatra?
          </h2>
          <p className="text-xl mb-8">
            Let us know your interest — we'll guide you personally.
          </p>
          <Button 
            size="lg"
            className="bg-white text-temple-maroon hover:bg-gray-100 px-8 py-4 text-lg"
            onClick={() => setIsBookingOpen(true)}
          >
            📨 Enquire Now
          </Button>
        </div>
      </section>

      {/* Newsletter & WhatsApp */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mandala-bg opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-temple font-bold text-temple-maroon mb-4">
            Stay Updated on Our Upcoming Yatras
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get dates, spiritual updates, and exclusive offers
          </p>
          
          <div className="max-w-md mx-auto space-y-4">
            <form onSubmit={handleNewsletterSignup} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="📧 Your Email Address"
                className="flex-1 px-4 py-3 rounded-lg border border-saffron-300 focus:border-saffron-500 focus:outline-none"
                required
              />
              <Button type="submit" className="bg-saffron-600 hover:bg-saffron-700 px-6">
                Subscribe
              </Button>
            </form>
            
            <Button 
              variant="outline"
              className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
              onClick={() => window.open('https://wa.me/917348869099', '_blank')}
            >
              Join Our WhatsApp Updates
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 bg-gradient-to-br from-temple-cream to-saffron-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              📍 Visit Us or Reach Out Anytime
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-saffron-600" />
                <div>
                  <p className="font-semibold text-temple-maroon">Phone</p>
                  <p className="text-gray-700">+91 73488 69099</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-saffron-600" />
                <div>
                  <p className="font-semibold text-temple-maroon">Email</p>
                  <p className="text-gray-700">connect@omytravels.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-saffron-600 mt-1" />
                <div>
                  <p className="font-semibold text-temple-maroon">Office Address</p>
                  <p className="text-gray-700">Dhundasi Nagar Rd, Sirsi, Karnataka 581401</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-saffron-600" />
                <div>
                  <p className="font-semibold text-temple-maroon">Office Hours</p>
                  <p className="text-gray-700">9am to 6pm, Sunday closed</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-600">Google Map Embed</p>
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
