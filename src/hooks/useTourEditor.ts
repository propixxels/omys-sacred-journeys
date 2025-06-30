
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TourData } from "@/types/tour";

const DEFAULT_TOUR_DATA: TourData = {
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
  isDraft: false,
  trip_type: 'domestic',
  total_capacity: 50
};

export const useTourEditor = (tourId?: string) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tourData, setTourData] = useState<TourData>(DEFAULT_TOUR_DATA);

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
          if (Array.isArray(field)) return field.length > 0 ? field : [""];
          if (typeof field === 'string') {
            try {
              const parsed = JSON.parse(field);
              return Array.isArray(parsed) && parsed.length > 0 ? parsed : [""];
            } catch {
              return [""];
            }
          }
          return [""];
        };

        const safeParseItinerary = (field: any): { day: number; title: string; activities: string[] }[] => {
          if (Array.isArray(field) && field.length > 0) {
            return field.map(item => ({
              day: item.day || 1,
              title: item.title || "",
              activities: Array.isArray(item.activities) && item.activities.length > 0 ? item.activities : [""]
            }));
          }
          if (typeof field === 'string') {
            try {
              const parsed = JSON.parse(field);
              if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map(item => ({
                  day: item.day || 1,
                  title: item.title || "",
                  activities: Array.isArray(item.activities) && item.activities.length > 0 ? item.activities : [""]
                }));
              }
            } catch {
              // fallback to default
            }
          }
          return [{ day: 1, title: "", activities: [""] }];
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

        const safeParseAccommodation = (field: any) => {
          const parsed = safeParseObject(field, { hotels: [""], roomType: "", amenities: [""] });
          return {
            hotels: Array.isArray(parsed.hotels) && parsed.hotels.length > 0 ? parsed.hotels : [""],
            roomType: parsed.roomType || "",
            amenities: Array.isArray(parsed.amenities) && parsed.amenities.length > 0 ? parsed.amenities : [""]
          };
        };

        const safeParseGallery = (field: any): string[] => {
          if (Array.isArray(field)) {
            return field.filter(item => typeof item === 'string' && item.trim() !== '');
          }
          if (typeof field === 'string') {
            try {
              const parsed = JSON.parse(field);
              if (Array.isArray(parsed)) {
                return parsed.filter(item => typeof item === 'string' && item.trim() !== '');
              }
            } catch {
              // fallback to empty array
            }
          }
          return [];
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
          itinerary: safeParseItinerary(data.itinerary),
          accommodation: safeParseAccommodation(data.accommodation),
          meals: safeParseObject(data.meals, { included: "", special: "", note: "" }),
          transport: safeParseObject(data.transport, { pickup: "", drop: "", vehicle: "", luggage: "" }),
          spiritualArrangements: safeParseArray(data.spiritual_arrangements),
          inclusions: safeParseArray(data.inclusions),
          exclusions: safeParseArray(data.exclusions),
          pricing: safeParseObject(data.pricing, { doubleSharing: "", singleSupplement: "", child5to12: "", groupDiscount: "", earlyBird: "" }),
          gallery: safeParseGallery(data.gallery),
          isDraft: data.isDraft || false,
          trip_type: data.trip_type || 'domestic',
          total_capacity: data.total_capacity || 50
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

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const saveTour = async (isDraft: boolean = false) => {
    if (!tourData.name || !tourData.duration || !tourData.cost) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
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
        isDraft: isDraft,
        trip_type: tourData.trip_type,
        total_capacity: tourData.total_capacity
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

      return true;
    } catch (error) {
      console.error('Error saving tour:', error);
      toast({
        title: "Error",
        description: "Failed to save tour",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tourData,
    setTourData,
    loading,
    saveTour
  };
};
