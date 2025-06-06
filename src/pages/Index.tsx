
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Clock, Star, Phone, Mail, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .gte('departure_date', new Date().toISOString().split('T')[0])
        .order('departure_date', { ascending: true })
        .limit(3);

      if (error) throw error;
      setFeaturedTours(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load featured tours",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 mandala-bg opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-temple font-bold text-temple-maroon mb-6 leading-tight">
              Sacred Hindu Pilgrimages
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Embark on transformative spiritual journeys to India's most revered temples and holy sites
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-temple text-lg px-8 py-3">
                <Link to="/trips">
                  Explore All Trips <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 border-temple-maroon text-temple-maroon hover:bg-temple-maroon hover:text-white">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-temple font-bold text-center text-temple-maroon mb-12">
            Why Choose Omy Tours?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="text-xl font-semibold text-temple-maroon mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Experienced spiritual guides who understand the significance of each sacred site
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-temple-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-temple-gold" />
              </div>
              <h3 className="text-xl font-semibold text-temple-maroon mb-3">Small Groups</h3>
              <p className="text-gray-600">
                Intimate group sizes for a more personal and meaningful pilgrimage experience
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-temple-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-temple-bronze" />
              </div>
              <h3 className="text-xl font-semibold text-temple-maroon mb-3">Sacred Sites</h3>
              <p className="text-gray-600">
                Carefully curated itineraries covering the most revered temples and holy places
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 bg-gradient-to-br from-saffron-50 to-temple-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-temple font-bold text-temple-maroon mb-4">
              Featured Pilgrimages
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover our most popular spiritual journeys, designed to provide deep cultural immersion and spiritual awakening
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl font-temple text-temple-maroon">Loading tours...</div>
            </div>
          ) : featuredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTours.map((tour) => (
                <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-saffron-400 to-orange-500 overflow-hidden">
                    <div className="absolute inset-0 mandala-bg opacity-20"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 p-6 text-white">
                      <Badge 
                        variant="secondary" 
                        className="mb-2 bg-white/20 text-white border-white/30"
                      >
                        {tour.transport_mode === 'bus' ? 'Bus Travel' : 'Flight + Bus'}
                      </Badge>
                      <h3 className="text-xl font-temple font-bold mb-2">{tour.name}</h3>
                      <p className="text-sm opacity-90">{tour.duration}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-saffron-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 line-clamp-2">{tour.destinations}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-temple-gold" />
                        <span className="text-gray-700">
                          {new Date(tour.departure_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-temple-bronze" />
                        <span className="text-gray-700">{tour.duration}</span>
                      </div>

                      {tour.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <span className="text-2xl font-bold text-saffron-600">
                              ₹{tour.cost.toLocaleString()}
                            </span>
                            <p className="text-xs text-gray-500">{tour.cost_details}</p>
                          </div>
                        </div>

                        <Button 
                          asChild
                          className="w-full btn-temple group-hover:shadow-lg transition-all duration-300"
                        >
                          <Link to={`/trip/${createSlug(tour.name)}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-saffron-600" />
              </div>
              <h3 className="text-xl font-temple font-semibold text-gray-700 mb-2">
                No tours available
              </h3>
              <p className="text-gray-600">
                Please check back later for upcoming pilgrimages.
              </p>
            </div>
          )}

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-temple-maroon text-temple-maroon hover:bg-temple-maroon hover:text-white">
              <Link to="/trips">
                View All Pilgrimages <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-temple-maroon text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-temple font-bold mb-8">
            Begin Your Sacred Journey
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ready to embark on a transformative pilgrimage? Contact us to start planning your spiritual adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919876543210" 
              className="inline-flex items-center justify-center px-6 py-3 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 transition-colors font-medium"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: +91 98765 43210
            </a>
            <a 
              href="mailto:info@omytours.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-temple-maroon transition-colors font-medium"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
