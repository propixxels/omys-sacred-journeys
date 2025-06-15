
export interface TourData {
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
