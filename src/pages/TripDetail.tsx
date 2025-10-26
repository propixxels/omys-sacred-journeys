import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users, Star, Check, X, Phone, Mail, Image as ImageIcon } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { useTripDetails } from "@/hooks/useTripDetails";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

const TripDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState<number>(0);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const isMobile = useIsMobile();
  
  const { tripDetails: trip, loading, error } = useTripDetails(slug || '');

  // Fetch confirmed bookings count directly with explicit type handling
  useEffect(() => {
    const fetchBookingsCount = async () => {
      // Only fetch if we have a valid trip ID
      if (!trip?.id) {
        setConfirmedBookingsCount(0);
        return;
      }

      try {
        setBookingsLoading(true);
        console.log('Fetching bookings for tour:', trip.id);
        
        const { data, error: queryError } = await supabase
          .from('bookings')
          .select('number_of_people')
          .eq('tour_id', trip.id)
          .eq('status', 'confirmed');

        if (queryError) {
          console.error('Error fetching bookings:', queryError);
          setConfirmedBookingsCount(0);
          return;
        }

        // Explicitly calculate total with type safety
        let total = 0;
        if (data && Array.isArray(data)) {
          for (const booking of data) {
            const numPeople = parseInt(String(booking.number_of_people || 0), 10);
            if (!isNaN(numPeople)) {
              total = total + numPeople;
            }
          }
        }
        
        console.log('Confirmed bookings count:', total);
        setConfirmedBookingsCount(total);
      } catch (err) {
        console.error('Exception fetching bookings:', err);
        setConfirmedBookingsCount(0);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookingsCount();
  }, [trip?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-xl font-temple text-temple-maroon">Loading trip details...</div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  // Sample static data for FAQs and testimonials
  const faqs = [
    {
      question: "Is this trip suitable for senior citizens?",
      answer: "Yes, we arrange minimal walking and wheelchair assistance on request. All vehicles are AC and comfortable."
    },
    {
      question: "Can I request Jain or special dietary meals?",
      answer: "Yes—inform us 7 days before departure. Jain meals and other dietary requirements can be arranged."
    },
    {
      question: "What is the cancellation policy?",
      answer: "50% refund if canceled 15–10 days prior; 25% refund 10-7 days prior; no refund within 7 days of departure."
    },
    {
      question: "Do you arrange VIP passes at temples?",
      answer: "Yes, VIP darshan passes are included in the package. Special arrangements can be made for additional fees."
    },
    {
      question: "Is travel insurance included?",
      answer: "No, travel insurance is not included. We strongly recommend purchasing travel insurance separately."
    }
  ];

  const testimonials = [
    {
      name: "Ritu S.",
      city: "Mumbai",
      rating: 5,
      comment: "Absolutely life-changing experience! The guide made every ritual so special."
    },
    {
      name: "Mohan K.",
      city: "Chennai",
      rating: 5,
      comment: "Perfect organization from start to finish. Felt blessed throughout the journey."
    },
    {
      name: "Priya M.",
      city: "Pune",
      rating: 5,
      comment: "The spiritual arrangements were authentic and deeply moving. Highly recommended!"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate availability with explicit type handling
  const totalCapacity = parseInt(String(trip?.total_capacity || 0), 10);
  const confirmedCount = parseInt(String(confirmedBookingsCount), 10);
  const remainingSeats = totalCapacity - confirmedCount;
  
  console.log('Booking stats:', { totalCapacity, confirmedCount, remainingSeats });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={trip.image_url || "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"} 
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white space-y-4">
              <h1 className="text-4xl md:text-5xl font-temple font-bold">
                {trip.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Next Departure: {trip.next_departure ? formatDate(trip.next_departure) : formatDate(trip.departure_date)}</span>
                </div>
                <div className="text-2xl font-bold text-orange-300">
                  ₹{trip.cost.toLocaleString()} per person
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsBookingOpen(true)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights Bar */}
      <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {trip.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2 text-temple-maroon font-medium">
                <Check className="w-4 h-4 text-orange-600" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-temple text-temple-maroon">Trip Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">{trip.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{confirmedCount} people confirmed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-orange-400 fill-current" />
                    <span>{trip.rating || 0} rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant={remainingSeats > 10 ? "default" : remainingSeats > 0 ? "secondary" : "destructive"}>
                      {remainingSeats > 0 ? `${remainingSeats} seats available` : 'Fully booked'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            {trip.itinerary.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-temple text-temple-maroon">Day-by-Day Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {trip.itinerary.map((day) => (
                      <AccordionItem key={day.day} value={`day-${day.day}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {day.day}
                            </div>
                            <span className="font-temple font-semibold text-temple-maroon">
                              Day {day.day}: {day.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 ml-11">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* Accommodation & Meals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trip.accommodation.hotels.length > 0 && (
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-temple text-temple-maroon">Accommodation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {trip.accommodation.hotels.map((hotel, index) => (
                      <div key={index} className="font-medium text-gray-700">{hotel}</div>
                    ))}
                    {trip.accommodation.roomType && (
                      <p className="text-sm text-gray-600">{trip.accommodation.roomType}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {trip.accommodation.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {trip.meals.included && (
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-temple text-temple-maroon">Meals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium text-gray-700">{trip.meals.included}</p>
                    {trip.meals.special && (
                      <p className="text-sm text-gray-600">{trip.meals.special}</p>
                    )}
                    {trip.meals.note && (
                      <p className="text-sm text-gray-600">{trip.meals.note}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Spiritual Arrangements */}
            {trip.spiritualArrangements.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-temple text-temple-maroon">Spiritual Experiences & Poojas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trip.spiritualArrangements.map((arrangement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{arrangement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trip.inclusions.length > 0 && (
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-temple text-green-700 flex items-center space-x-2">
                      <Check className="w-5 h-5" />
                      <span>Inclusions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {trip.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {trip.exclusions.length > 0 && (
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl border-red-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-temple text-red-700 flex items-center space-x-2">
                      <X className="w-5 h-5" />
                      <span>Exclusions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {trip.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Gallery Section */}
            {trip.gallery && trip.gallery.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-temple text-temple-maroon flex items-center space-x-2">
                    <ImageIcon className="w-6 h-6" />
                    <span>Tour Gallery</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {trip.gallery.map((imageUrl, index) => (
                      <div 
                        key={index} 
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedGalleryImage(imageUrl)}
                      >
                        <img 
                          src={imageUrl} 
                          alt={`${trip.name} gallery ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* FAQs */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-temple text-temple-maroon">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-temple text-temple-maroon">What Our Pilgrims Say</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-orange-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 italic mb-3">"{testimonial.comment}"</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-temple-maroon">{testimonial.name}</p>
                          <p className="text-xs text-gray-500">{testimonial.city}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-temple text-temple-maroon">Price & Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Per Person (Double Sharing)</span>
                    <span className="font-bold text-orange-600">{trip.pricing.doubleSharing}</span>
                  </div>
                  {trip.pricing.singleSupplement && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Single Occupancy</span>
                      <span>{trip.pricing.singleSupplement}</span>
                    </div>
                  )}
                  {trip.pricing.child5to12 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Child (5-12 yrs)</span>
                      <span>{trip.pricing.child5to12}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Availability Info */}
                <div className="space-y-2">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Available Seats</span>
                      <Badge variant={remainingSeats > 10 ? "default" : remainingSeats > 0 ? "secondary" : "destructive"}>
                        {remainingSeats > 0 ? remainingSeats : 'Sold Out'}
                      </Badge>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Total capacity: {totalCapacity} | Confirmed: {confirmedCount}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {trip.pricing.groupDiscount && (
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">{trip.pricing.groupDiscount}</p>
                    </div>
                  )}
                  {trip.pricing.earlyBird && (
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">{trip.pricing.earlyBird}</p>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg py-6 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsBookingOpen(true)}
                  disabled={remainingSeats <= 0}
                >
                  {remainingSeats > 0 ? 'Book Now' : 'Fully Booked'}
                </Button>

              {/*   <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Secure payment • 50% advance</p>
                  <div className="flex justify-center space-x-2">
                   {["UPI", "Cash", "Cards"].map((method) => (
                     <Badge key={method} variant="outline" className="text-xs">
                       {method}
                     </Badge>
                    ))}
                  </div> 
               </div>*/}
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-temple text-temple-maroon">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Call +91 73488 69099
                </Button>
                <Button variant="outline" className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50">
                  <Mail className="w-4 h-4 mr-2" />
                  connect@omytravels.in
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  24/7 Yatra Support Available
                </p>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-orange-400 fill-current" />
                  <span className="text-sm font-medium">2,000+ Happy Pilgrims</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Secure & Trusted</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">9+ Years Experience</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-temple text-temple-maroon">
              Book Your Journey
            </DialogTitle>
          </DialogHeader>
          <BookingForm
            tourId={trip.id}
            tourName={trip.name}
            onClose={() => setIsBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Gallery Image Modal */}
      <Dialog open={!!selectedGalleryImage} onOpenChange={() => setSelectedGalleryImage(null)}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-temple text-temple-maroon">
              {trip.name} - Gallery
            </DialogTitle>
          </DialogHeader>
          {selectedGalleryImage && (
            <div className="flex justify-center">
              <img 
                src={selectedGalleryImage} 
                alt="Gallery image"
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripDetail;
