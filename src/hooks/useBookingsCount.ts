
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
      // --- EDIT: Added this 'else' block ---
      // This resets the count to 0 if the tourId is ever removed
      // (e.g., navigating away or parent component is still loading).
      // This prevents showing a stale count from a previous tour.
      setConfirmedBookingsCount(0);
      // --- End of Edit ---
    }
  }, [tourId]);

  const fetchConfirmedBookings = async () => {
    // --- EDIT: Added this guard clause ---
    // This is a safety check to ensure the function doesn't run
    // if tourId is somehow null or undefined.
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

      // --- CRITICAL FIX: Robust sum calculation ---
      // This is the primary fix for the Safari bug.
      // We explicitly cast `booking.number_of_people` to a Number using `Number()`.
      // The original code `(sum + (booking.number_of_people || 0))`
      // could fail if `number_of_people` was a string (e.g., "18"),
      // leading to string concatenation or type errors in some browsers.
      // This new code ensures we are always performing math with numbers.
      const totalConfirmed = data?.reduce((sum, booking) => {
        // Explicitly convert to a number. If it's null, undefined, or NaN, it becomes 0.
        const numPeople = Number(booking.number_of_people) || 0;
        return sum + numPeople;
      }, 0) || 0; // The final '|| 0' handles if 'data' itself is null.
      // --- End of Critical Fix ---

      setConfirmedBookingsCount(totalConfirmed);
    } catch (error) {
      setConfirmedBookingsCount(0); // Reset count on error
    } finally {
      setLoading(false);
    }
  };

  return { confirmedBookingsCount, loading };
};
