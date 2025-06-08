
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, Upload, X, Plus } from "lucide-react";

interface TourData {
  id?: string;
  name: string;
  duration: string;
  transport_mode: string;
  destinations: string;
  departure_date: string;
  cost: number;
  cost_details: string;
  description: string;
  slug: string;
  image_url: string;
  rating: number | null;
  pilgrims_count: number | null;
  next_departure: string;
  highlights: string[];
  itinerary: { day: number; title: string; activities: string[] }[];
  accommodation: {
    hotels: string[];
    roomType: string;
    amenities: string[];
  };
  meals: {
    included: string;
    special: string;
    note: string;
  };
  transport: {
    pickup: string;
    drop: string;
    vehicle: string;
    luggage: string;
  };
  spiritualArrangements: string[];
  inclusions: string[];
  exclusions: string[];
  pricing: {
    doubleSharing: string;
    singleSupplement: string;
    child5to12: string;
    groupDiscount: string;
    earlyBird: string;
  };
  gallery: string[];
  isDraft: boolean;
}

interface TourEditorProps {
  tourId?: string;
  onSave: () => void;
  onCancel: () => void;
}

const TourEditor = ({ tourId, onSave, onCancel }: TourEditorProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tourData, setTourData] = useState<TourData>({
    name: "",
    duration: "",
    transport_mode: "bus",
    destinations: "",
    departure_date: "",
    cost: 0,
    cost_details: "",
    description: "",
    slug: "",
    image_url: "",
    rating: null,
    pilgrims_count: null,
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
    gallery: [],
    isDraft: false
  });

  useEffect(() => {
    if (tourId) {
      fetchTourData();
    }
  }, [tourId]);

  const fetchTourData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', tourId)
        .single();

      if (error) throw error;

      if (data) {
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

        setTourData({
          id: data.id,
          name: data.name || "",
          duration: data.duration || "",
          transport_mode: data.transport_mode || "bus",
          destinations: data.destinations || "",
          departure_date: data.departure_date || "",
          cost: data.cost || 0,
          cost_details: data.cost_details || "",
          description: data.description || "",
          slug: data.slug || "",
          image_url: data.image_url || "",
          rating: data.rating,
          pilgrims_count: data.pilgrims_count,
          next_departure: data.next_departure || "",
          highlights: safeParseArray(data.highlights),
          itinerary: safeParseArray(data.itinerary),
          accommodation: safeParseObject(data.accommodation, { hotels: [], roomType: "", amenities: [] }),
          meals: safeParseObject(data.meals, { included: "", special: "", note: "" }),
          transport: safeParseObject(data.transport, { pickup: "", drop: "", vehicle: "", luggage: "" }),
          spiritualArrangements: safeParseArray(data.spiritual_arrangements),
          inclusions: safeParseArray(data.inclusions),
          exclusions: safeParseArray(data.exclusions),
          pricing: safeParseObject(data.pricing, { doubleSharing: "", singleSupplement: "", child5to12: "", groupDiscount: "", earlyBird: "" }),
          gallery: safeParseArray(data.gallery),
          isDraft: data.isDraft || false
        });
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tour data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      setUploading(true);
      const { data, error } = await supabase.functions.invoke('upload-image', {
        body: { 
          file: await fileToBase64(file),
          fileName: file.name 
        }
      });

      if (error) throw error;
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, isMainImage = false) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      
      if (isMainImage) {
        setTourData(prev => ({ ...prev, image_url: imageUrl }));
      } else {
        setTourData(prev => ({ 
          ...prev, 
          gallery: [...prev.gallery, imageUrl] 
        }));
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setTourData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
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

  const addListItem = (field: string, subField?: string) => {
    if (subField) {
      const fieldData = tourData[field as keyof typeof tourData] as any;
      setTourData(prev => ({
        ...prev,
        [field]: {
          ...fieldData,
          [subField]: [...fieldData[subField], ""]
        }
      }));
    } else {
      setTourData(prev => ({
        ...prev,
        [field]: [...(tourData[field as keyof typeof tourData] as string[]), ""]
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

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!tourData.name || !tourData.duration || !tourData.cost) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const slug = tourData.slug || generateSlug(tourData.name);
      
      const payload = {
        name: tourData.name,
        duration: tourData.duration,
        transport_mode: tourData.transport_mode,
        destinations: tourData.destinations,
        departure_date: tourData.departure_date,
        cost: tourData.cost,
        cost_details: tourData.cost_details,
        description: tourData.description,
        slug,
        image_url: tourData.image_url,
        rating: tourData.rating,
        pilgrims_count: tourData.pilgrims_count,
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
        gallery: tourData.gallery.filter(img => img.trim()),
        isDraft: isDraft
      };

      if (tourId) {
        const { error } = await supabase
          .from('tours')
          .update(payload)
          .eq('id', tourId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tours')
          .insert(payload);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Tour ${tourId ? 'updated' : 'created'} successfully!`
      });

      onSave();
    } catch (error) {
      console.error('Error saving tour:', error);
      toast({
        title: "Error",
        description: "Failed to save tour",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && tourId) {
    return <div className="flex justify-center p-8">Loading tour data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={tourData.duration}
                onChange={(e) => setTourData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 7 Days / 6 Nights"
              />
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cost">Cost (₹) *</Label>
              <Input
                id="cost"
                type="number"
                value={tourData.cost}
                onChange={(e) => setTourData(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
                placeholder="e.g., 25999"
              />
            </div>
            <div>
              <Label htmlFor="departure_date">Departure Date *</Label>
              <Input
                id="departure_date"
                type="date"
                value={tourData.departure_date}
                onChange={(e) => setTourData(prev => ({ ...prev, departure_date: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Image */}
      <Card>
        <CardHeader>
          <CardTitle>Main Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tourData.image_url && (
            <div className="relative">
              <img src={tourData.image_url} alt="Main tour image" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}
          <div>
            <Label htmlFor="main-image">Upload Main Image</Label>
            <Input
              id="main-image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, true)}
              disabled={uploading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tourData.gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tourData.gallery.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img src={imageUrl} alt={`Gallery image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div>
            <Label htmlFor="gallery-image">Add Gallery Image</Label>
            <Input
              id="gallery-image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, false)}
              disabled={uploading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Highlights</CardTitle>
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
            <Plus className="w-4 h-4 mr-2" />
            Add Highlight
          </Button>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleSubmit(true)}
          disabled={loading || uploading}
        >
          Save as Draft
        </Button>
        <Button 
          onClick={() => handleSubmit(false)}
          disabled={loading || uploading}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Saving..." : tourId ? "Update Tour" : "Create Tour"}
        </Button>
      </div>
    </div>
  );
};

export default TourEditor;
