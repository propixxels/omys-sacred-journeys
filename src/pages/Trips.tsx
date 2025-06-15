
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Search, Filter, SortAsc, Users, Star } from "lucide-react";
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
  isDraft?: boolean;
}

const Trips = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [transportFilter, setTransportFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("departure_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    filterAndSortTours();
  }, [tours, searchTerm, transportFilter, priceRange, durationFilter, sortBy, sortOrder]);

  const fetchTours = async () => {
    try {
      console.log('Fetching tours...');
      setLoading(true);
      
      // Simplified query - remove the complex OR condition that might be causing issues
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('isDraft', false)
        .order('departure_date', { ascending: true });

      console.log('Tours fetched:', { data, error, count: data?.length });

      if (error) {
        console.error('Error fetching tours:', error);
        throw error;
      }
      
      const mappedTours: Tour[] = (data || []).map(tour => ({
        id: tour.id,
        name: tour.name,
        duration: tour.duration,
        transport_mode: tour.transport_mode,
        destinations: tour.destinations,
        departure_date: tour.departure_date,
        cost: tour.cost,
        cost_details: tour.cost_details || '',
        description: tour.description,
        slug: tour.slug,
        image_url: tour.image_url,
        isDraft: tour.isDraft || false
      }));
      
      console.log('Mapped tours:', mappedTours);
      setTours(mappedTours);
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
      
      let matchesPrice = true;
      if (priceRange !== "all") {
        switch (priceRange) {
          case "budget":
            matchesPrice = tour.cost <= 20000;
            break;
          case "mid":
            matchesPrice = tour.cost > 20000 && tour.cost <= 50000;
            break;
          case "premium":
            matchesPrice = tour.cost > 50000;
            break;
        }
      }

      let matchesDuration = true;
      if (durationFilter !== "all") {
        const dayCount = parseInt(tour.duration.match(/\d+/)?.[0] || "0");
        switch (durationFilter) {
          case "short":
            matchesDuration = dayCount <= 7;
            break;
          case "medium":
            matchesDuration = dayCount > 7 && dayCount <= 14;
            break;
          case "long":
            matchesDuration = dayCount > 14;
            break;
        }
      }

      return matchesSearch && matchesTransport && matchesPrice && matchesDuration;
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

  const clearAllFilters = () => {
    setSearchTerm("");
    setTransportFilter("all");
    setPriceRange("all");
    setDurationFilter("all");
    setSortBy("departure_date");
    setSortOrder("asc");
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
      {/* Standardized Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        
        {/* Regular Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 mandala-bg opacity-10" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-temple font-bold text-white mb-6 leading-tight">
                Sacred Pilgrimage Tours
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
                Embark on transformative spiritual journeys across India's most revered destinations with expert guidance and comfortable accommodations
              </p>
              <div className="flex flex-wrap gap-6 text-orange-100 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-temple-gold" />
                  <span>Expert Spiritual Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-temple-gold" />
                  <span>Small Group Tours</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-temple-gold" />
                  <span>Authentic Experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 -mt-8 relative z-20">
          <div className="mb-6">
            <h2 className="text-2xl font-temple font-semibold text-temple-maroon mb-2">
              Find Your Perfect Pilgrimage
            </h2>
            <p className="text-gray-600">Use the filters below to discover tours that match your preferences</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search destinations, tour names, or spiritual sites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-saffron-400"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Transport Mode</label>
              <Select value={transportFilter} onValueChange={setTransportFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Any Transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Transport</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="flight">Flight</SelectItem>
                  <SelectItem value="volvo">AC Volvo</SelectItem>
                  <SelectItem value="tempo">Tempo Traveller</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="budget">Budget (₹0 - ₹20,000)</SelectItem>
                  <SelectItem value="mid">Mid-range (₹20,000 - ₹50,000)</SelectItem>
                  <SelectItem value="premium">Premium (₹50,000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Duration</label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Any Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="short">Short (1-7 days)</SelectItem>
                  <SelectItem value="medium">Medium (8-14 days)</SelectItem>
                  <SelectItem value="long">Long (15+ days)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sort By</label>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="departure_date">Departure Date</SelectItem>
                    <SelectItem value="cost">Price</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  <SortAsc className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters and Clear */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {(searchTerm || transportFilter !== "all" || priceRange !== "all" || durationFilter !== "all") ? (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && <Badge variant="secondary">Search: "{searchTerm}"</Badge>}
                  {transportFilter !== "all" && <Badge variant="secondary">Transport: {transportFilter}</Badge>}
                  {priceRange !== "all" && <Badge variant="secondary">Price: {priceRange}</Badge>}
                  {durationFilter !== "all" && <Badge variant="secondary">Duration: {durationFilter}</Badge>}
                </div>
              ) : (
                <span className="text-sm text-gray-500">None</span>
              )}
            </div>
            <Button 
              variant="ghost" 
              onClick={clearAllFilters}
              className="text-saffron-600 hover:text-saffron-700"
            >
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-temple font-semibold text-temple-maroon">
              {filteredTours.length} Tours Available
            </h3>
            <p className="text-gray-600">
              {filteredTours.length === tours.length 
                ? "Showing all tours" 
                : `Filtered from ${tours.length} total tours`}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Sorted by {sortBy.replace('_', ' ')} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
          </div>
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
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-saffron-600" />
            </div>
            <h3 className="text-2xl font-temple font-semibold text-gray-700 mb-4">
              No tours match your criteria
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or filters to discover more spiritual journeys.
            </p>
            <Button onClick={clearAllFilters} className="btn-temple">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* No Tours at all */}
        {tours.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-16 h-16 text-saffron-600" />
            </div>
            <h3 className="text-2xl font-temple font-semibold text-gray-700 mb-4">
              No tours available yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Sacred pilgrimage tours will appear here once they are added to our collection. Check back soon for spiritual adventures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
