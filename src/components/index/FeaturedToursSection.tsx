
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TourData } from "@/types/tour";

const FeaturedToursSection = () => {
  const [tours, setTours] = useState<TourData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tours from database
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setError(null);
        console.log('Fetching featured tours...');
        
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .eq('isDraft', false)
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) {
          console.error('Error fetching tours:', error);
          setError('Failed to load tours');
        } else if (data) {
          console.log('Tours fetched successfully:', data.length);
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
        setError('Failed to load tours');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

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

  if (error) {
    return (
      <section id="featured-tours" className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative">
        <div className="absolute inset-0 mandala-bg"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-temple font-bold text-orange-600 mb-4">
              Featured Tours & Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of travelers on these amazing journeys across India's most beautiful destinations
            </p>
          </div>

          <div className="text-center py-12">
            <p className="text-xl text-red-600 mb-6">{error}</p>
            <p className="text-gray-500">Please try refreshing the page or contact support if the issue persists.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-tours" className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative">
      <div className="absolute inset-0 mandala-bg"></div>
      
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
                <div className="relative overflow-hidden">
                  <img 
                    src={tour.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"} 
                    alt={tour.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500"></div>
                  
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
  );
};

export default FeaturedToursSection;
