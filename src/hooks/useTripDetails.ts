
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

        // Fetch tour data - only published tours (isDraft = false)
        const { data: tour, error: tourError } = await supabase
          .from('tours')
          .select('*')
          .eq('slug', slug)
          .eq('isDraft', false)
          .single();

        console.log('Supabase response:', { tour, tourError });

        if (tourError) {
          console.error('Supabase error:', tourError);
          setError('Tour not found');
          return;
        }

        if (!tour) {
          console.log('No tour found for slug:', slug);
          setError('Tour not found');
          return;
        }

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
          highlights: Array.isArray(tour.highlights) ? tour.highlights as string[] : [],
          itinerary: Array.isArray(tour.itinerary) ? tour.itinerary as TripDetails['itinerary'] : [],
          accommodation: tour.accommodation && typeof tour.accommodation === 'object' && !Array.isArray(tour.accommodation) ? 
            tour.accommodation as TripDetails['accommodation'] : 
            { hotels: [], roomType: null, amenities: [] },
          meals: tour.meals && typeof tour.meals === 'object' && !Array.isArray(tour.meals) ? 
            tour.meals as TripDetails['meals'] : 
            { included: '', special: null, note: null },
          transport: tour.transport && typeof tour.transport === 'object' && !Array.isArray(tour.transport) ? 
            tour.transport as TripDetails['transport'] : 
            { pickup: '', drop: '', vehicle: '', luggage: null },
          spiritualArrangements: Array.isArray(tour.spiritual_arrangements) ? tour.spiritual_arrangements as string[] : [],
          inclusions: Array.isArray(tour.inclusions) ? tour.inclusions as string[] : [],
          exclusions: Array.isArray(tour.exclusions) ? tour.exclusions as string[] : [],
          pricing: tour.pricing && typeof tour.pricing === 'object' && !Array.isArray(tour.pricing) ? 
            tour.pricing as TripDetails['pricing'] : 
            { doubleSharing: '', singleSupplement: null, child5to12: null, groupDiscount: null, earlyBird: null }
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
