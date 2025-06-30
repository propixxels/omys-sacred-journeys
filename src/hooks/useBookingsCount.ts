
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useBookingsCount = (tourId?: string) => {
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tourId) {
      fetchConfirmedBookings();
    }
  }, [tourId]);

  const fetchConfirmedBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('number_of_people')
        .eq('tour_id', tourId)
        .eq('status', 'confirmed');

      if (error) throw error;

      const totalConfirmed = data?.reduce((sum, booking) => sum + (booking.number_of_people || 0), 0) || 0;
      setConfirmedBookingsCount(totalConfirmed);
    } catch (error) {
      console.error('Error fetching confirmed bookings:', error);
      setConfirmedBookingsCount(0);
    } finally {
      setLoading(false);
    }
  };

  return { confirmedBookingsCount, loading };
};
