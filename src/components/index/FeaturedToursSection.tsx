
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TourData } from "@/types/tour";
import { useNavigate } from "react-router-dom";

const FeaturedToursSection = () => {
  const [featuredTours, setFeaturedTours] = useState<TourData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const transformTourData = (tour: any): TourData => {
    const safeParseArray = (field: any): any[] => {
      if (Array.isArray(field)) return field;
      if (typeof field === 'string') {
        try {
          const parsed = JSON.parse(field);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    };

    const safeParseObject = (field: any, defaultValue: any): any => {
      if (field && typeof field === 'object' && !Array.isArray(field)) return field;
      if (typeof field === 'string') {
        try {
          const parsed = JSON.parse(field);
          return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : defaultValue;
        } catch {
          return defaultValue;
        }
      }
      return defaultValue;
    };

    return {
      id: tour.id,
      name: tour.name,
      duration: tour.duration,
      transport_mode: tour.transport_mode,
      destinations: tour.destinations,
      departure_date: tour.departure_date,
      cost: tour.cost,
      cost_details: tour.cost_details || '',
      description: tour.description || '',
      slug: tour.slug || '',
      image_url: tour.image_url || '',
      rating: tour.rating,
      pilgrims_count: tour.pilgrims_count,
      next_departure: tour.next_departure || '',
      highlights: safeParseArray(tour.highlights),
      itinerary: safeParseArray(tour.itinerary),
      accommodation: safeParseObject(tour.accommodation, { hotels: [], roomType: '', amenities: [] }),
      meals: safeParseObject(tour.meals, { included: '', special: '', note: '' }),
      transport: safeParseObject(tour.transport, { pickup: '', drop: '', vehicle: '', luggage: '' }),
      spiritualArrangements: safeParseArray(tour.spiritual_arrangements),
      inclusions: safeParseArray(tour.inclusions),
      exclusions: safeParseArray(tour.exclusions),
      pricing: safeParseObject(tour.pricing, { doubleSharing: '', singleSupplement: '', child5to12: '', groupDiscount: '', earlyBird: '' }),
      gallery: safeParseArray(tour.gallery),
      isDraft: tour.isDraft || false,
      trip_type: (tour.trip_type as 'domestic' | 'international') || 'domestic',
      total_capacity: tour.total_capacity || 50
    };
  };

  const fetchFeaturedTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('isDraft', false)
        .order('rating', { ascending: false })
        .limit(6);

      if (error) throw error;

      setFeaturedTours((data || []).map(transformTourData));
    } catch (error) {
      console.error('Error fetching featured tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-temple font-bold text-temple-maroon mb-4">
              Featured Spiritual Journeys
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular pilgrimage tours, carefully curated for spiritual seekers
            </p>
          </div>
          <div className="text-center">Loading featured tours...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-temple font-bold text-temple-maroon mb-4">
            Featured Spiritual Journeys
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular pilgrimage tours, carefully curated for spiritual seekers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={tour.image_url || "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"} 
                  alt={tour.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                    ₹{tour.cost.toLocaleString()}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="font-temple text-temple-maroon group-hover:text-orange-600 transition-colors">
                  {tour.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {tour.destinations}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>{formatDate(tour.departure_date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>{tour.transport_mode}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span>{tour.pilgrims_count || 0} joined</span>
                  </div>
                </div>
                
                {tour.rating && tour.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    {[...Array(Math.floor(tour.rating))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{tour.rating}/5</span>
                  </div>
                )}
                
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300"
                  onClick={() => navigate(`/trip/${tour.slug || tour.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedToursSection;
