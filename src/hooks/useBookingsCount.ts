
/* import { useState, useEffect } from "react";
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

*/



import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useBookingsCount = (tourId?: string) => {
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tourId) {
      fetchConfirmedBookings();
    } else {
      // --- EDIT: Added this else block ---
      // Resets the count to 0 if the tourId prop is removed or becomes null.
      // This prevents displaying a stale count from a previous tour.
      setConfirmedBookingsCount(0);
      // --- End of Edit ---
    }
  }, [tourId]);

  const fetchConfirmedBookings = async () => {
    // --- EDIT: Added this guard clause ---
    // Added a check to ensure tourId exists before attempting to fetch.
    if (!tourId) return;
    // --- End of Edit ---

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('number_of_people')
        .eq('tour_id', tourId)
        .eq('status', 'confirmed');

      if (error) throw error;

      // --- EDIT: Made the sum calculation more robust ---
      // We now explicitly cast `booking.number_of_people` to a Number.
      // This fixes a potential bug in Safari where `sum + (booking.number_of_people || 0)`
      // could be treated as string concatenation (e.g., 0 + "18" = "018")
      // if the data is returned as a string.
      const totalConfirmed = data?.reduce((sum, booking) => {
        // This ensures the value is treated as a number, defaulting to 0 if it's null, undefined, or NaN.
        const numPeople = Number(booking.number_of_people) || 0;
        return sum + numPeople;
      }, 0) || 0;
      // --- End of Edit ---

      setConfirmedBookingsCount(totalConfirmed);
    } catch (error) {
      console.error('Error fetching confirmed bookings:', error);
      setConfirmedBookingsCount(0); // Good practice to reset on error
    } finally {
      setLoading(false);
    }
  };

  return { confirmedBookingsCount, loading };
};
