
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TourData } from "@/types/tour";
import BookingFilters, { BookingFilters as FilterTypes } from "@/components/BookingFilters";

const TripsWithTabs = () => {
  const navigate = useNavigate();
  const [domesticTrips, setDomesticTrips] = useState<TourData[]>([]);
  const [internationalTrips, setInternationalTrips] = useState<TourData[]>([]);
  const [filteredDomesticTrips, setFilteredDomesticTrips] = useState<TourData[]>([]);
  const [filteredInternationalTrips, setFilteredInternationalTrips] = useState<TourData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
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
      trip_type: tour.trip_type as 'domestic' | 'international' || 'domestic',
      total_capacity: tour.total_capacity || 50
    };
  };

  const fetchTrips = async () => {
    try {
      setLoading(true);
      
      // Fetch domestic trips
      const { data: domestic, error: domesticError } = await supabase
        .from('tours')
        .select('*')
        .eq('trip_type', 'domestic')
        .eq('isDraft', false)
        .order('created_at', { ascending: false });

      if (domesticError) throw domesticError;

      // Fetch international trips
      const { data: international, error: internationalError } = await supabase
        .from('tours')
        .select('*')
        .eq('trip_type', 'international')
        .eq('isDraft', false)
        .order('created_at', { ascending: false });

      if (internationalError) throw internationalError;

      const transformedDomestic = (domestic || []).map(transformTourData);
      const transformedInternational = (international || []).map(transformTourData);

      setDomesticTrips(transformedDomestic);
      setInternationalTrips(transformedInternational);
      setFilteredDomesticTrips(transformedDomestic);
      setFilteredInternationalTrips(transformedInternational);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters: FilterTypes) => {
    const filterTrips = (trips: TourData[]) => {
      return trips.filter(trip => {
        const matchesSearch = !filters.search || 
          trip.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          trip.destinations.toLowerCase().includes(filters.search.toLowerCase()) ||
          trip.description.toLowerCase().includes(filters.search.toLowerCase());

        const matchesDateFrom = !filters.dateFrom || 
          new Date(trip.departure_date) >= new Date(filters.dateFrom);

        const matchesDateTo = !filters.dateTo || 
          new Date(trip.departure_date) <= new Date(filters.dateTo);

        return matchesSearch && matchesDateFrom && matchesDateTo;
      });
    };

    setFilteredDomesticTrips(filterTrips(domesticTrips));
    setFilteredInternationalTrips(filterTrips(internationalTrips));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const TripCard = ({ trip }: { trip: TourData }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={trip.image_url || "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"}
          alt={trip.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            ₹{trip.cost.toLocaleString()}
          </Badge>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-orange-600 text-white">
            {trip.trip_type === 'domestic' ? 'Domestic' : 'International'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="font-temple text-temple-maroon group-hover:text-orange-600 transition-colors line-clamp-2">
          {trip.name}
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-orange-600" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-orange-600" />
            <span className="truncate">{trip.destinations}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-2">{trip.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span>{formatDate(trip.next_departure || trip.departure_date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-orange-600" />
            <span>{trip.pilgrims_count || 0} joined</span>
          </div>
        </div>

        {trip.rating && trip.rating > 0 && (
          <div className="flex items-center space-x-1">
            {[...Array(Math.floor(trip.rating))].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
            ))}
            <span className="text-sm text-gray-600 ml-2">{trip.rating}/5</span>
          </div>
        )}

        <Button 
          onClick={() => navigate(`/trip/${trip.slug}`)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-xl font-temple text-temple-maroon">Loading trips...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8">
        <BookingFilters
          onFiltersChange={handleFiltersChange}
          totalCount={domesticTrips.length + internationalTrips.length}
          filteredCount={filteredDomesticTrips.length + filteredInternationalTrips.length}
        />
      </div>

      <Tabs defaultValue="domestic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="domestic" className="text-lg">
            Domestic Trips ({filteredDomesticTrips.length})
          </TabsTrigger>
          <TabsTrigger value="international" className="text-lg">
            International Trips ({filteredInternationalTrips.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="domestic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDomesticTrips.length > 0 ? (
              filteredDomesticTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No domestic trips available</h3>
                <p className="text-gray-500">Check back soon for new domestic pilgrimage tours!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="international">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternationalTrips.length > 0 ? (
              filteredInternationalTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No international trips available</h3>
                <p className="text-gray-500">Check back soon for new international pilgrimage tours!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripsWithTabs;
