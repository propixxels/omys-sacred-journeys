
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TripDetails {
  id: string;
  name: string;
  duration: string;
  cost: number;
  destinations: string;
  transport_mode: string;
  departure_date: string;
  description: string | null;
  slug: string | null;
  image_url: string | null;
  rating: number | null;
  pilgrims_count: number | null;
  next_departure: string | null;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  accommodation: {
    hotels: string[];
    roomType: string | null;
    amenities: string[];
  };
  meals: {
    included: string;
    special: string | null;
    note: string | null;
  };
  transport: {
    pickup: string;
    drop: string;
    vehicle: string;
    luggage: string | null;
  };
  spiritualArrangements: string[];
  inclusions: string[];
  exclusions: string[];
  pricing: {
    doubleSharing: string;
    singleSupplement: string | null;
    child5to12: string | null;
    groupDiscount: string | null;
    earlyBird: string | null;
  };
  gallery: string[];
  trip_type: 'domestic' | 'international';
  total_capacity: number;
  confirmed_bookings: number;
  available_seats: number;
}

export const useTripDetails = (slug: string) => {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchTripDetails = async () => {
      try {
        console.log('Fetching trip details for slug:', slug);
        setLoading(true);
        setError(null);

        // Fetch tour data - include both published and draft tours (no isDraft filter)
        const { data: tour, error: tourError } = await supabase
          .from('tours')
          .select('*')
          .eq('slug', slug)
          .single();

        console.log('Supabase response:', { tour, tourError });

        if (tourError) {
          console.error('Supabase error:', tourError);
          if (tourError.code === 'PGRST116') {
            setError('Tour not found');
          } else {
            setError('Failed to load tour');
          }
          return;
        }

        if (!tour) {
          console.log('No tour found for slug:', slug);
          setError('Tour not found');
          return;
        }

        // Helper function to safely parse JSON fields
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

        const tripData: TripDetails = {
          id: tour.id,
          name: tour.name,
          duration: tour.duration,
          cost: tour.cost,
          destinations: tour.destinations,
          transport_mode: tour.transport_mode,
          departure_date: tour.departure_date,
          description: tour.description,
          slug: tour.slug,
          image_url: tour.image_url,
          rating: tour.rating,
          pilgrims_count: tour.pilgrims_count,
          next_departure: tour.next_departure,
          highlights: safeParseArray(tour.highlights),
          itinerary: safeParseArray(tour.itinerary),
          accommodation: safeParseObject(tour.accommodation, { hotels: [], roomType: null, amenities: [] }),
          meals: safeParseObject(tour.meals, { included: '', special: null, note: null }),
          transport: safeParseObject(tour.transport, { pickup: '', drop: '', vehicle: '', luggage: null }),
          spiritualArrangements: safeParseArray(tour.spiritual_arrangements),
          inclusions: safeParseArray(tour.inclusions),
          exclusions: safeParseArray(tour.exclusions),
          pricing: safeParseObject(tour.pricing, { doubleSharing: '', singleSupplement: null, child5to12: null, groupDiscount: null, earlyBird: null }),
          gallery: safeParseArray(tour.gallery || []),
          trip_type: (tour.trip_type as 'domestic' | 'international') || 'domestic',
          total_capacity: tour.total_capacity || 50,
          confirmed_bookings: tour.confirmed_bookings || 0,
          available_seats: tour.available_seats || 0
        };

        console.log('Processed trip data:', tripData);
        setTripDetails(tripData);
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError('Failed to load trip details');
        toast({
          title: "Error",
          description: "Failed to load trip details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [slug, toast]);

  return { tripDetails, loading, error };
};
