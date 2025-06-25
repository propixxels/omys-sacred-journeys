
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Search, Filter, SortAsc, Users, Star, X } from "lucide-react";
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
                Explore India's Wonders
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
                Discover incredible destinations across India with our carefully curated tours featuring comfortable accommodations, expert guides, and unforgettable experiences
              </p>
              <div className="flex flex-wrap gap-6 text-orange-100 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-temple-gold" />
                  <span>Expert Local Guides</span>
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

      <div className="container mx-auto px-4 py-8">
        {/* Compact Filter Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-8 -mt-16 relative z-20">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search destinations, tour names, or attractions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-11 border-gray-200 focus:border-saffron-400 bg-white/80"
            />
          </div>

          {/* Filters Grid - Compact Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
            <Select value={transportFilter} onValueChange={setTransportFilter}>
              <SelectTrigger className="h-10 text-sm">
                <SelectValue placeholder="Transport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Transport</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="flight">Flight</SelectItem>
                <SelectItem value="volvo">AC Volvo</SelectItem>
                <SelectItem value="tempo">Tempo Traveller</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-10 text-sm">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="budget">Budget (₹0 - ₹20K)</SelectItem>
                <SelectItem value="mid">Mid (₹20K - ₹50K)</SelectItem>
                <SelectItem value="premium">Premium (₹50K+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="h-10 text-sm">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="short">Short (1-7 days)</SelectItem>
                <SelectItem value="medium">Medium (8-14 days)</SelectItem>
                <SelectItem value="long">Long (15+ days)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-10 text-sm">
                <SelectValue placeholder="Sort By" />
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
              size="sm"
              className="h-10 px-3"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <SortAsc className={`h-4 w-4 mr-1 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
              <span className="hidden sm:inline">{sortOrder === "asc" ? "Asc" : "Desc"}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-10 text-saffron-600 hover:text-saffron-700 hover:bg-saffron-50"
            >
              <X className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          </div>

          {/* Active Filters Row */}
          {(searchTerm || transportFilter !== "all" || priceRange !== "all" || durationFilter !== "all") && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
              <span className="text-xs font-medium text-gray-600 mr-2">Active:</span>
              {searchTerm && (
                <Badge variant="secondary" className="text-xs">
                  "{searchTerm}"
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}
              {transportFilter !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  {transportFilter}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setTransportFilter("all")} />
                </Badge>
              )}
              {priceRange !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  {priceRange}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPriceRange("all")} />
                </Badge>
              )}
              {durationFilter !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  {durationFilter}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setDurationFilter("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-temple font-semibold text-temple-maroon">
              {filteredTours.length} Tours Available
            </h3>
            <p className="text-gray-600 text-sm">
              {filteredTours.length === tours.length 
                ? "Showing all tours" 
                : `Filtered from ${tours.length} total tours`}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Sorted by {sortBy.replace('_', ' ')} ({sortOrder === 'asc' ? '↑' : '↓'})
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
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                  >
                    {tour.transport_mode}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Tour Title - Moved outside image area */}
                  <h3 className="text-xl font-temple font-bold text-temple-maroon line-clamp-2 leading-tight">
                    {tour.name}
                  </h3>

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
              Try adjusting your search criteria or filters to discover more tours.
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
              Tours will appear here once they are added to our collection. Check back soon for travel adventures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
