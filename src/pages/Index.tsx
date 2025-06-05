
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Plane, Bus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BookingForm from "@/components/BookingForm";
import { useToast } from "@/hooks/use-toast";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-temple-maroon to-saffron-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-temple font-bold mb-6">
            ॐ Omy Tours & Travels
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Embark on Sacred Hindu Pilgrimages with Expert Guidance
          </p>
          <div className="text-lg">
            🙏 Authentic Spiritual Experiences • 🏛️ Historic Temples • 🌅 Divine Blessings
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-temple font-bold text-temple-maroon mb-4">
              Sacred Pilgrimage Tours
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us on transformative spiritual journeys to India's most revered temples and holy sites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Card key={tour.id} className="card-temple hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-temple text-temple-maroon">
                      {tour.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-saffron-600 text-saffron-600">
                      {tour.transport_mode === 'bus' ? (
                        <><Bus className="w-3 h-3 mr-1" /> Bus</>
                      ) : (
                        <><Plane className="w-3 h-3 mr-1" /> Flight</>
                      )}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {tour.duration}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 text-saffron-600 flex-shrink-0" />
                    <span className="line-clamp-3">{tour.destinations}</span>
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
                        <Users className="w-4 h-4 mr-2" />
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
