
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, MapPin, Users, Plane, Bus, Shield, Utensils, 
  Star, CheckCircle, Phone, Mail, ArrowRight, Heart,
  Navigation, CreditCard, Temple
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
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
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

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you!",
      description: "You've been subscribed to our newsletter for special offers and spiritual tips.",
    });
    setEmail("");
  };

  const testimonials = [
    {
      quote: "Omy Travels made our Kashi Yatra unforgettable. Perfect arrangements and spiritual guidance.",
      name: "Rajesh Kumar",
      city: "Mumbai",
      rating: 5
    },
    {
      quote: "Excellent service and authentic experience. The priests were knowledgeable and helpful.",
      name: "Priya Sharma",
      city: "Delhi",
      rating: 5
    },
    {
      quote: "Best pilgrimage tour we've ever taken. Everything was perfectly organized.",
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
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-br from-temple-maroon via-saffron-600 to-temple-maroon text-white py-24 overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 mandala-bg opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-temple font-bold mb-6 animate-fade-in">
              🙏 Embark on a Divine Journey
            </h1>
            <p className="text-xl md:text-3xl mb-8 font-medium">
              Curated Hindu Pilgrimages Across India – Kashi, Ujjain, Dwarka, and More
            </p>
            <Button 
              size="lg" 
              className="btn-temple text-lg px-8 py-4 mb-12"
              onClick={() => document.getElementById('featured-tours')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View All Yatras <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          {/* Quick Values Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🔱", text: "100% Trusted Pilgrim-Rated" },
              { icon: "🚌", text: "Comfortable AC Transport" },
              { icon: "🍲", text: "Authentic Veg Meals" },
              { icon: "📜", text: "Experienced Pooja Priests" }
            ].map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pilgrimages */}
      <section id="featured-tours" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Our Flagship Yatras
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the divine with our carefully curated pilgrimage tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.slice(0, 6).map((tour) => (
              <Card key={tour.id} className="card-temple hover:shadow-xl transition-all duration-300 group">
                {/* Tour Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-saffron-200 to-temple-gold rounded-t-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Temple className="w-16 h-16 text-temple-maroon opacity-60" />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-temple text-temple-maroon line-clamp-2">
                      {tour.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-saffron-600 text-saffron-600 shrink-0">
                      {tour.transport_mode === 'bus' ? (
                        <><Bus className="w-3 h-3 mr-1" /> Bus</>
                      ) : (
                        <><Plane className="w-3 h-3 mr-1" /> Flight</>
                      )}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-saffron-600 font-medium">
                    {tour.duration}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 text-saffron-600 flex-shrink-0" />
                    <span className="line-clamp-2">{tour.destinations}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-temple-gold" />
                      <span>{new Date(tour.departure_date).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-saffron-600">
                          ₹{tour.cost.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{tour.cost_details}</p>
                      </div>
                      <Button 
                        onClick={() => handleBookNow(tour)}
                        className="btn-temple"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Omy Travels */}
      <section className="py-16 bg-gradient-to-br from-temple-cream to-saffron-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Why Pilgrims Trust Omy Travels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-saffron-600" />,
                title: "Certified Guides & Priests",
                description: "24×7 temple support with expert guidance"
              },
              {
                icon: <Heart className="w-8 h-8 text-saffron-600" />,
                title: "All-Inclusive Packages",
                description: "Stay, Meals, Transport, Rituals - everything covered"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-saffron-600" />,
                title: "Transparent Pricing",
                description: "No hidden charges, upfront clear pricing"
              },
              {
                icon: <Users className="w-8 h-8 text-saffron-600" />,
                title: "Customizable Itineraries",
                description: "Group or Private Yatras as per your preference"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center card-temple">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-temple font-semibold text-temple-maroon mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Your Pilgrimage in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                icon: <Navigation className="w-8 h-8 text-saffron-600" />,
                title: "Choose Your Yatra",
                description: "Browse tours, check dates & pricing"
              },
              {
                step: "2",
                icon: <CreditCard className="w-8 h-8 text-saffron-600" />,
                title: "Book & Pay Securely",
                description: "50% advance, multiple payment options"
              },
              {
                step: "3",
                icon: <Temple className="w-8 h-8 text-saffron-600" />,
                title: "Depart & Experience",
                description: "Receive Yatra kit, guided Darshans, return blessed!"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-temple-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-temple font-semibold text-temple-maroon mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-saffron-50 to-temple-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Hear from Our Pilgrims
            </h2>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="card-temple">
                    <CardContent className="pt-6">
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-temple-gold text-temple-gold" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
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

      {/* About Omy Travels */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-6">
              About Omy Travels
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2015, Omy Travels is dedicated to crafting soulful Hindu pilgrimages. 
              We prioritize comfortable stays, authentic rituals, and seamless logistics so you can focus on your devotion.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-temple-gold" />
                <span className="text-gray-600">4.8★ Google Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-saffron-600" />
                <span className="text-gray-600">2,000+ Happy Pilgrims</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-saffron-600" />
                <span className="text-gray-600">Trusted Since 2015</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-br from-temple-maroon to-saffron-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-temple font-bold mb-4">Stay Connected</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe for special offers, early-bird discounts, and spiritual tips.
          </p>
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              required
            />
            <Button type="submit" className="bg-temple-gold hover:bg-temple-gold/90 text-temple-maroon px-6">
              Subscribe
            </Button>
          </form>
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
          {selectedTour && (
            <BookingForm
              tourId={selectedTour.id}
              tourName={selectedTour.name}
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
