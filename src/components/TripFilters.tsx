
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, MapPin, Clock, Calendar, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TripFiltersProps {
  onFiltersChange: (filters: TripFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export interface TripFilters {
  search: string;
  destination: string;
  duration: string;
  priceRange: string;
  dateFrom: string;
  dateTo: string;
}

const TripFilters = ({ onFiltersChange, totalCount, filteredCount }: TripFiltersProps) => {
  const [filters, setFilters] = useState<TripFilters>({
    search: '',
    destination: '',
    duration: '',
    priceRange: '',
    dateFrom: '',
    dateTo: ''
  });

  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data: tours, error } = await supabase
        .from('tours')
        .select('destinations')
        .eq('isDraft', false);

      if (error) throw error;

      const uniqueDestinations = new Set<string>();
      tours?.forEach(tour => {
        // Split destinations by comma and add each one
        const destList = tour.destinations.split(',').map(dest => dest.trim());
        destList.forEach(dest => uniqueDestinations.add(dest));
      });

      setDestinations(Array.from(uniqueDestinations).sort());
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const handleFilterChange = (key: keyof TripFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: TripFilters = {
      search: '',
      destination: '',
      duration: '',
      priceRange: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-blue-600" />
            <Label className="text-lg font-semibold text-gray-800">Filter Tours</Label>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Showing {filteredCount} of {totalCount} tours
            </span>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <X className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">
              Search Tours
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search destinations, tour names..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
              <MapPin className="w-4 h-4 inline mr-1" />
              Destination
            </Label>
            <Select value={filters.destination} onValueChange={(value) => handleFilterChange('destination', value === 'all' ? '' : value)}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Any destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any destination</SelectItem>
                {destinations.map((destination) => (
                  <SelectItem key={destination} value={destination.toLowerCase()}>
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 block">
              <Clock className="w-4 h-4 inline mr-1" />
              Duration
            </Label>
            <Select value={filters.duration} onValueChange={(value) => handleFilterChange('duration', value === 'all' ? '' : value)}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Any duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any duration</SelectItem>
                <SelectItem value="1-3">1-3 Days</SelectItem>
                <SelectItem value="4-7">4-7 Days</SelectItem>
                <SelectItem value="8-15">8-15 Days</SelectItem>
                <SelectItem value="15+">15+ Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priceRange" className="text-sm font-medium text-gray-700 mb-2 block">
              <IndianRupee className="w-4 h-4 inline mr-1" />
              Price Range
            </Label>
            <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value === 'all' ? '' : value)}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any price</SelectItem>
                <SelectItem value="0-10000">Under ₹10,000</SelectItem>
                <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100000+">Above ₹1,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="dateFrom" className="text-sm font-medium text-gray-700 mb-2 block">
                <Calendar className="w-4 h-4 inline mr-1" />
                From Date
              </Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="dateTo" className="text-sm font-medium text-gray-700 mb-2 block">
                To Date
              </Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripFilters;
