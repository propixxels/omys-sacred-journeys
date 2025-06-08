
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Search, Filter, SortAsc } from "lucide-react";
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
  slug?: string;
  image_url?: string;
}

const Trips = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [transportFilter, setTransportFilter] = useState("all");
  const [sortBy, setSortBy] = useState("departure_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    filterAndSortTours();
  }, [tours, searchTerm, transportFilter, sortBy, sortOrder]);

  const fetchTours = async () => {
    try {
      console.log('Fetching tours...');
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('departure_date', { ascending: true });

      console.log('Tours fetched:', { data, error });

      if (error) {
        console.error('Error fetching tours:', error);
        throw error;
      }
      
      setTours(data || []);
    } catch (error) {
      console.error('Fetch tours error:', error);
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTours = () => {
    let filtered = tours.filter(tour => {
      const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.destinations.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTransport = transportFilter === "all" || tour.transport_mode.toLowerCase().includes(transportFilter.toLowerCase());
      return matchesSearch && matchesTransport;
    });

    // Sort tours
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'departure_date':
          comparison = new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime();
          break;
        case 'cost':
          comparison = a.cost - b.cost;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'duration':
          comparison = a.duration.localeCompare(b.duration);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredTours(filtered);
  };

  const getSlugFromName = (name: string, slug?: string) => {
    if (slug) return slug;
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream flex items-center justify-center">
        <div className="text-xl font-temple text-temple-maroon">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-temple font-bold text-temple-maroon mb-4">
            Sacred Pilgrimage Tours
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover spiritual journeys across India's most sacred destinations with expert guidance and comfortable accommodations.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tours or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Transport Filter */}
            <Select value={transportFilter} onValueChange={setTransportFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Transport Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transport</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="flight">Flight</SelectItem>
                <SelectItem value="volvo">AC Volvo</SelectItem>
                <SelectItem value="tempo">Tempo Traveller</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="departure_date">Departure Date</SelectItem>
                <SelectItem value="cost">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mb-4 text-sm text-gray-600">
          Total tours: {tours.length}, Filtered: {filteredTours.length}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTours.length} of {tours.length} tours
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-saffron-400 to-orange-500 overflow-hidden">
                {tour.image_url ? (
                  <img 
                    src={tour.image_url} 
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 mandala-bg opacity-20"></div>
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-6 text-white">
                  <Badge 
                    variant="secondary" 
                    className="mb-2 bg-white/20 text-white border-white/30"
                  >
                    {tour.transport_mode}
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
                        {tour.cost_details && (
                          <p className="text-xs text-gray-500">{tour.cost_details}</p>
                        )}
                      </div>
                    </div>

                    <Button 
                      asChild
                      className="w-full btn-temple group-hover:shadow-lg transition-all duration-300"
                    >
                      <Link to={`/trip/${getSlugFromName(tour.name, tour.slug)}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTours.length === 0 && tours.length > 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-saffron-600" />
            </div>
            <h3 className="text-xl font-temple font-semibold text-gray-700 mb-2">
              No tours found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more tours.
            </p>
          </div>
        )}

        {/* No Tours at all */}
        {tours.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-saffron-600" />
            </div>
            <h3 className="text-xl font-temple font-semibold text-gray-700 mb-2">
              No tours available
            </h3>
            <p className="text-gray-600">
              Tours will appear here once they are added to the database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
