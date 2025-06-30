
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TourData } from "@/types/tour";

const TripsWithTabs = () => {
  const navigate = useNavigate();
  const [domesticTrips, setDomesticTrips] = useState<TourData[]>([]);
  const [internationalTrips, setInternationalTrips] = useState<TourData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

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

      setDomesticTrips(domestic || []);
      setInternationalTrips(international || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
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

  const TripCard = ({ trip }: { trip: TourData }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={trip.image_url || "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"}
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-orange-600 text-white">
            {trip.trip_type === 'domestic' ? 'Domestic' : 'International'}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl font-temple text-temple-maroon line-clamp-2">
          {trip.name}
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{trip.destinations}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-3">{trip.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              <span>{trip.pilgrims_count || 0}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 mr-1 text-orange-400 fill-current" />
              <span>{trip.rating || 0}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-orange-600">
              ₹{trip.cost.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <Calendar className="w-4 h-4 inline mr-1" />
            Next: {trip.next_departure ? formatDate(trip.next_departure) : formatDate(trip.departure_date)}
          </div>
        </div>

        <Button 
          onClick={() => navigate(`/trip/${trip.slug}`)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
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
      <Tabs defaultValue="domestic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="domestic" className="text-lg">
            Domestic Trips ({domesticTrips.length})
          </TabsTrigger>
          <TabsTrigger value="international" className="text-lg">
            International Trips ({internationalTrips.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="domestic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domesticTrips.length > 0 ? (
              domesticTrips.map((trip) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalTrips.length > 0 ? (
              internationalTrips.map((trip) => (
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
