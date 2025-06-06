
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Clock, Phone, Mail, ArrowLeft, Star } from "lucide-react";
import BookingForm from "@/components/BookingForm";
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

const TripDetail = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchTourBySlug(slug);
    }
  }, [slug]);

  const fetchTourBySlug = async (tourSlug: string) => {
    try {
      // Since we don't store slugs in the database, we need to match by converting names to slugs
      const { data: tours, error } = await supabase
        .from('tours')
        .select('*')
        .gte('departure_date', new Date().toISOString().split('T')[0]);

      if (error) throw error;

      // Find tour by matching slug with converted name
      const foundTour = tours?.find(tour => {
        const tourSlug = tour.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return tourSlug === slug;
      });

      if (foundTour) {
        setTour(foundTour);
      } else {
        toast({
          title: "Tour not found",
          description: "The requested tour could not be found.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tour details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream flex items-center justify-center">
        <div className="text-xl font-temple text-temple-maroon">Loading tour details...</div>
      </div>
    );
  }

  if (!tour) {
    return <Navigate to="/trips" replace />;
  }

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    toast({
      title: "Booking Submitted!",
      description: "We'll contact you soon to confirm your pilgrimage booking.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-temple-maroon hover:bg-temple-maroon/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Trips
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Card */}
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative h-64 bg-gradient-to-br from-saffron-400 to-orange-500">
                <div className="absolute inset-0 mandala-bg opacity-20"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 text-white h-full flex flex-col justify-end">
                  <Badge 
                    variant="secondary" 
                    className="mb-4 bg-white/20 text-white border-white/30 w-fit"
                  >
                    {tour.transport_mode === 'bus' ? 'Bus Travel' : 'Flight + Bus'}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-temple font-bold mb-2">
                    {tour.name}
                  </h1>
                  <p className="text-lg opacity-90">{tour.duration}</p>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-temple-gold" />
                    <div>
                      <p className="text-sm text-gray-600">Departure</p>
                      <p className="font-semibold">
                        {new Date(tour.departure_date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-temple-bronze" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{tour.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-saffron-600" />
                    <div>
                      <p className="text-sm text-gray-600">Group Size</p>
                      <p className="font-semibold">Small Groups</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-temple font-semibold text-temple-maroon mb-4">
                    Sacred Destinations
                  </h2>
                  <div className="flex items-start space-x-3 mb-6">
                    <MapPin className="w-6 h-6 text-saffron-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{tour.destinations}</p>
                  </div>

                  {tour.description && (
                    <>
                      <h2 className="text-xl font-temple font-semibold text-temple-maroon mb-4">
                        About This Pilgrimage
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">{tour.description}</p>
                    </>
                  )}

                  <div className="bg-saffron-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-temple-maroon mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-saffron-600" />
                      What's Included
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Comfortable accommodation</li>
                      <li>• All transportation as per itinerary</li>
                      <li>• Experienced spiritual guide</li>
                      <li>• Entry fees to temples and sites</li>
                      <li>• Daily breakfast and dinner</li>
                      <li>• Group prayers and spiritual discussions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="border-0 shadow-xl sticky top-6">
              <CardHeader className="bg-gradient-to-r from-temple-maroon to-saffron-600 text-white">
                <CardTitle className="text-2xl font-temple">Book Your Journey</CardTitle>
                <CardDescription className="text-white/90">
                  Secure your spot on this sacred pilgrimage
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-saffron-600">
                    ₹{tour.cost.toLocaleString()}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{tour.cost_details}</p>
                </div>

                {!showBookingForm ? (
                  <Button 
                    onClick={() => setShowBookingForm(true)}
                    className="w-full btn-temple text-lg py-3"
                  >
                    Book Now
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <BookingForm 
                      tourId={tour.id}
                      onSuccess={handleBookingSuccess}
                    />
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowBookingForm(false)}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t space-y-3">
                  <h4 className="font-semibold text-temple-maroon">Need Help?</h4>
                  <div className="space-y-2">
                    <a 
                      href="tel:+919876543210" 
                      className="flex items-center space-x-2 text-gray-600 hover:text-temple-maroon transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>+91 98765 43210</span>
                    </a>
                    <a 
                      href="mailto:info@omytours.com" 
                      className="flex items-center space-x-2 text-gray-600 hover:text-temple-maroon transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>info@omytours.com</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
