
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
    if (!slug) return;

    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch main tour data
        const { data: tour, error: tourError } = await supabase
          .from('tours')
          .select('*')
          .eq('slug', slug)
          .single();

        if (tourError || !tour) {
          setError('Tour not found');
          return;
        }

        // Fetch all related data
        const [
          { data: highlights },
          { data: itinerary },
          { data: accommodation },
          { data: meals },
          { data: transport },
          { data: spiritualArrangements },
          { data: inclusions },
          { data: exclusions },
          { data: pricing }
        ] = await Promise.all([
          supabase.from('tour_highlights').select('*').eq('tour_id', tour.id),
          supabase.from('tour_itinerary').select('*').eq('tour_id', tour.id).order('day_number'),
          supabase.from('tour_accommodation').select('*').eq('tour_id', tour.id).single(),
          supabase.from('tour_meals').select('*').eq('tour_id', tour.id).single(),
          supabase.from('tour_transport').select('*').eq('tour_id', tour.id).single(),
          supabase.from('tour_spiritual_arrangements').select('*').eq('tour_id', tour.id),
          supabase.from('tour_inclusions').select('*').eq('tour_id', tour.id),
          supabase.from('tour_exclusions').select('*').eq('tour_id', tour.id),
          supabase.from('tour_pricing').select('*').eq('tour_id', tour.id).single()
        ]);

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
          highlights: highlights?.map(h => h.highlight) || [],
          itinerary: itinerary?.map(item => ({
            day: item.day_number,
            title: item.title,
            activities: item.activities
          })) || [],
          accommodation: {
            hotels: accommodation?.hotels || [],
            roomType: accommodation?.room_type || null,
            amenities: accommodation?.amenities || []
          },
          meals: {
            included: meals?.included || '',
            special: meals?.special || null,
            note: meals?.note || null
          },
          transport: {
            pickup: transport?.pickup || '',
            drop: transport?.drop_location || '',
            vehicle: transport?.vehicle || '',
            luggage: transport?.luggage || null
          },
          spiritualArrangements: spiritualArrangements?.map(s => s.arrangement) || [],
          inclusions: inclusions?.map(i => i.inclusion) || [],
          exclusions: exclusions?.map(e => e.exclusion) || [],
          pricing: {
            doubleSharing: pricing?.double_sharing || '',
            singleSupplement: pricing?.single_supplement || null,
            child5to12: pricing?.child_5_to_12 || null,
            groupDiscount: pricing?.group_discount || null,
            earlyBird: pricing?.early_bird || null
          }
        };

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
