
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Loader } from "lucide-react";

const AddTour = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [tourData, setTourData] = useState({
    name: "",
    duration: "",
    transport_mode: "bus",
    destinations: "",
    departure_date: "",
    cost: "",
    cost_details: "",
    description: "",
    slug: "",
    image_url: "",
    rating: "",
    pilgrims_count: "",
    next_departure: "",
    highlights: [""],
    itinerary: [{ day: 1, title: "", activities: [""] }],
    accommodation: {
      hotels: [""],
      roomType: "",
      amenities: [""]
    },
    meals: {
      included: "",
      special: "",
      note: ""
    },
    transport: {
      pickup: "",
      drop: "",
      vehicle: "",
      luggage: ""
    },
    spiritualArrangements: [""],
    inclusions: [""],
    exclusions: [""],
    pricing: {
      doubleSharing: "",
      singleSupplement: "",
      child5to12: "",
      groupDiscount: "",
      earlyBird: ""
    },
    draft: false
  });

  const addListItem = (field: string, subField?: string) => {
    if (subField) {
      setTourData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [subField]: [...(prev[field as keyof typeof prev] as any)[subField], ""]
        }
      }));
    } else {
      setTourData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), ""]
      }));
    }
  };

  const updateListItem = (field: string, index: number, value: string, subField?: string) => {
    if (subField) {
      const fieldData = tourData[field as keyof typeof tourData] as any;
      const newArray = [...fieldData[subField]];
      newArray[index] = value;
      setTourData(prev => ({
        ...prev,
        [field]: {
          ...fieldData,
          [subField]: newArray
        }
      }));
    } else {
      const newArray = [...(tourData[field as keyof typeof tourData] as string[])];
      newArray[index] = value;
      setTourData(prev => ({
        ...prev,
        [field]: newArray
      }));
    }
  };

  const removeListItem = (field: string, index: number, subField?: string) => {
    if (subField) {
      const fieldData = tourData[field as keyof typeof tourData] as any;
      const newArray = fieldData[subField].filter((_: any, i: number) => i !== index);
      setTourData(prev => ({
        ...prev,
        [field]: {
          ...fieldData,
          [subField]: newArray
        }
      }));
    } else {
      const newArray = (tourData[field as keyof typeof tourData] as string[]).filter((_, i) => i !== index);
      setTourData(prev => ({
        ...prev,
        [field]: newArray
      }));
    }
  };

  const addItineraryDay = () => {
    setTourData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: "", activities: [""] }]
    }));
  };

  const updateItinerary = (index: number, field: string, value: any) => {
    const newItinerary = [...tourData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setTourData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!tourData.name || !tourData.duration || !tourData.cost) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Duration, Cost)",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const slug = tourData.slug || generateSlug(tourData.name);
      
      const tourPayload = {
        name: tourData.name,
        duration: tourData.duration,
        transport_mode: tourData.transport_mode,
        destinations: tourData.destinations,
        departure_date: tourData.departure_date,
        cost: parseInt(tourData.cost),
        cost_details: tourData.cost_details,
        description: tourData.description,
        slug,
        image_url: tourData.image_url,
        rating: tourData.rating ? parseFloat(tourData.rating) : null,
        pilgrims_count: tourData.pilgrims_count ? parseInt(tourData.pilgrims_count) : null,
        next_departure: tourData.next_departure || null,
        highlights: tourData.highlights.filter(h => h.trim()),
        itinerary: tourData.itinerary.filter(item => item.title.trim()),
        accommodation: {
          hotels: tourData.accommodation.hotels.filter(h => h.trim()),
          roomType: tourData.accommodation.roomType,
          amenities: tourData.accommodation.amenities.filter(a => a.trim())
        },
        meals: tourData.meals,
        transport: tourData.transport,
        spiritual_arrangements: tourData.spiritualArrangements.filter(s => s.trim()),
        inclusions: tourData.inclusions.filter(i => i.trim()),
        exclusions: tourData.exclusions.filter(e => e.trim()),
        pricing: tourData.pricing,
        draft: isDraft
      };

      const { error } = await supabase
        .from('tours')
        .insert(tourPayload);

      if (error) throw error;

      toast({
        title: "Success",
        description: isDraft ? "Tour saved as draft!" : "Tour created successfully!"
      });

      navigate('/admin');
    } catch (error) {
      console.error('Error creating tour:', error);
      toast({
        title: "Error",
        description: "Failed to create tour",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <h1 className="text-4xl font-temple font-bold text-temple-maroon">
              Add New Tour
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleSubmit(true)}
              disabled={loading}
            >
              {loading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save as Draft
            </Button>
            <Button 
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="btn-temple"
            >
              {loading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Publish Tour
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card className="card-temple">
            <CardHeader>
              <CardTitle className="text-temple-maroon">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Tour Name *</Label>
                <Input
                  id="name"
                  value={tourData.name}
                  onChange={(e) => setTourData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Kedarnath Yatra"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={tourData.slug}
                  onChange={(e) => setTourData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="Auto-generated from name"
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={tourData.duration}
                  onChange={(e) => setTourData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 7 Days / 6 Nights"
                />
              </div>

              <div>
                <Label htmlFor="transport_mode">Transport Mode</Label>
                <Select 
                  value={tourData.transport_mode} 
                  onValueChange={(value) => setTourData(prev => ({ ...prev, transport_mode: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="flight">Flight</SelectItem>
                    <SelectItem value="volvo">AC Volvo</SelectItem>
                    <SelectItem value="tempo">Tempo Traveller</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="destinations">Destinations *</Label>
                <Textarea
                  id="destinations"
                  value={tourData.destinations}
                  onChange={(e) => setTourData(prev => ({ ...prev, destinations: e.target.value }))}
                  placeholder="List of destinations"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departure_date">Departure Date *</Label>
                  <Input
                    id="departure_date"
                    type="date"
                    value={tourData.departure_date}
                    onChange={(e) => setTourData(prev => ({ ...prev, departure_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="next_departure">Next Departure</Label>
                  <Input
                    id="next_departure"
                    type="date"
                    value={tourData.next_departure}
                    onChange={(e) => setTourData(prev => ({ ...prev, next_departure: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cost">Cost (₹) *</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={tourData.cost}
                    onChange={(e) => setTourData(prev => ({ ...prev, cost: e.target.value }))}
                    placeholder="e.g., 25999"
                  />
                </div>
                <div>
                  <Label htmlFor="cost_details">Cost Details</Label>
                  <Input
                    id="cost_details"
                    value={tourData.cost_details}
                    onChange={(e) => setTourData(prev => ({ ...prev, cost_details: e.target.value }))}
                    placeholder="e.g., GST inclusive"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={tourData.rating}
                    onChange={(e) => setTourData(prev => ({ ...prev, rating: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="pilgrims_count">Pilgrims Count</Label>
                  <Input
                    id="pilgrims_count"
                    type="number"
                    value={tourData.pilgrims_count}
                    onChange={(e) => setTourData(prev => ({ ...prev, pilgrims_count: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={tourData.image_url}
                  onChange={(e) => setTourData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={tourData.description}
                  onChange={(e) => setTourData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the tour"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card className="card-temple">
            <CardHeader>
              <CardTitle className="text-temple-maroon">Tour Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tourData.highlights.map((highlight, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateListItem('highlights', index, e.target.value)}
                    placeholder="Tour highlight"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeListItem('highlights', index)}
                    disabled={tourData.highlights.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addListItem('highlights')}
                className="w-full"
              >
                Add Highlight
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Continue with more sections in next part... */}
      </div>
    </div>
  );
};

export default AddTour;
