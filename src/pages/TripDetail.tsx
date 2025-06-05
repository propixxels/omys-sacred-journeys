import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users, Star, Check, X, Phone, Mail } from "lucide-react";
import BookingForm from "@/components/BookingForm";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Sample trip data - in a real app, this would come from an API
  const tripData = {
    "kashi-yatra": {
      name: "Kashi Yatra – 5 Days Spiritual Journey",
      duration: "5 Nights / 6 Days",
      price: "₹12,499",
      nextDeparture: "10 June 2025",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      rating: 4.8,
      pilgrims: 245,
      highlights: [
        "Deluxe 3★ accommodation",
        "Pure Veg Meals",
        "AC Volvo transport",
        "Guided Darshan & Pooja",
        "Special Rudrabhishek"
      ],
      description: "Experience the divine energy of Kashi, one of the seven Moksha-sthalas. This sacred journey includes VIP darshans, Ganga Aarti participation, and spiritual rituals guided by expert priests.",
      itinerary: [
        {
          day: 1,
          title: "Arrival & Ganga Aarti",
          activities: [
            "Morning: Arrive Varanasi Railway Station/Airport",
            "Check-in at Hotel Ganpati Inn (3★)",
            "Afternoon: Rest and freshen up",
            "Evening: Attend Ganga Aarti at Dashashwamedh Ghat",
            "Dinner at hotel (8 PM)"
          ]
        },
        {
          day: 2,
          title: "Kashi Vishwanath & Temple Tour",
          activities: [
            "Early Morning: Ganga Snan at 5 AM",
            "Breakfast at hotel",
            "Visit Kashi Vishwanath – VIP Darshan slot at 10 AM",
            "Rudrabhishek ceremony at 11 AM",
            "Lunch: Pure vegetarian meal",
            "Afternoon: Annapurna Temple, Sankat Mochan Hanuman Temple",
            "Evening: Free time for personal prayers"
          ]
        },
        {
          day: 3,
          title: "Sarnath Excursion",
          activities: [
            "Morning: Travel to Sarnath (2 hrs by AC van)",
            "Visit Dhamek Stupa and Sarnath Museum",
            "Meditation session at Deer Park",
            "Lunch at local restaurant",
            "Return to Varanasi",
            "Evening: Boat ride on Ganga with Aarti viewing"
          ]
        },
        {
          day: 4,
          title: "Prayagraj (Allahabad) Journey",
          activities: [
            "Morning: Check-out and travel to Prayagraj (3 hrs by AC bus)",
            "Check-in at hotel",
            "Afternoon: Triveni Sangam boat ride",
            "Ganga Snan at confluence point",
            "Visit Hanuman Temple (lying Hanuman)",
            "Evening: Aarti at Triveni Sangam"
          ]
        },
        {
          day: 5,
          title: "Chitrakoot Darshan & Return",
          activities: [
            "Early morning: Travel to Chitrakoot (2 hrs)",
            "Visit Ram Ghat, Bharat Milap Temple",
            "Hanuman Dhara and Sphatik Shila",
            "Lunch at Chitrakoot",
            "Return journey to Varanasi",
            "Farewell dinner"
          ]
        },
        {
          day: 6,
          title: "Departure",
          activities: [
            "Morning: Final darshan at local temple",
            "Check-out and transfer to railway station/airport",
            "Journey concludes with divine blessings"
          ]
        }
      ],
      accommodation: {
        hotels: [
          "Hotel Ganpati Inn, Varanasi – 3★ Deluxe",
          "Ganga View Hotel, Prayagraj – 3★"
        ],
        roomType: "Double sharing / Triple sharing available",
        amenities: ["Wi-Fi", "Attached bathroom", "Hot water", "AC rooms", "Room service"]
      },
      meals: {
        included: "All meals: Breakfast, Lunch, Dinner (Pure vegetarian)",
        special: "Jain meals available on request",
        note: "Local specialties and prasadam included"
      },
      transport: {
        pickup: "Varanasi Railway Station / Airport - 10 AM onward",
        drop: "Varanasi Railway Station / Airport on last day",
        vehicle: "AC Volvo bus for intercity, Tempo Traveller for local",
        luggage: "One suitcase + one small bag per person"
      },
      spiritualArrangements: [
        "Rudrabhishek at Kashi Vishwanath",
        "Ganga Snan & Aarti at Triveni Sangam",
        "VIP darshan passes included",
        "Local pandit for temple guidance",
        "All pooja samagri provided",
        "Guided meditation sessions"
      ],
      inclusions: [
        "Accommodation as specified",
        "All meals (vegetarian)",
        "AC transport throughout",
        "Temple darshan fees & VIP passes",
        "Guided poojas and priest charges",
        "Government GST & service taxes",
        "Experienced tour manager",
        "24/7 support during yatra"
      ],
      exclusions: [
        "Personal expenses (laundry, phone calls)",
        "Tips & donations (optional)",
        "Travel insurance",
        "Airfare/train fare to Varanasi",
        "Helicopter services (if opted)",
        "Anything not mentioned in inclusions"
      ],
      pricing: {
        doubleSharing: "₹12,499",
        singleSupplement: "+ ₹2,000",
        child5to12: "₹9,999",
        groupDiscount: "5% off for groups of 5+",
        earlyBird: "₹500 discount if booked 30 days advance"
      }
    }
  };

  const trip = tripData[id as keyof typeof tripData];

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={trip.image} 
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
                  <span>Next Departure: {trip.nextDeparture}</span>
                </div>
                <div className="text-2xl font-bold text-orange-300">
                  {trip.price} per pilgrim
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
                    <span>{trip.pilgrims} pilgrims joined</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-orange-400 fill-current" />
                    <span>{trip.rating} rating</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
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

            {/* Accommodation & Meals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-temple text-temple-maroon">Accommodation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trip.accommodation.hotels.map((hotel, index) => (
                    <div key={index} className="font-medium text-gray-700">{hotel}</div>
                  ))}
                  <p className="text-sm text-gray-600">{trip.accommodation.roomType}</p>
                  <div className="flex flex-wrap gap-2">
                    {trip.accommodation.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-temple text-temple-maroon">Meals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium text-gray-700">{trip.meals.included}</p>
                  <p className="text-sm text-gray-600">{trip.meals.special}</p>
                  <p className="text-sm text-gray-600">{trip.meals.note}</p>
                </CardContent>
              </Card>
            </div>

            {/* Spiritual Arrangements */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-temple text-temple-maroon">Spiritual Experiences & Poojas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trip.spiritualArrangements.map((arrangement, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-saffron-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{arrangement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

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
                    <div key={index} className="bg-saffron-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-temple-gold fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 italic mb-3">"{testimonial.comment}"</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-saffron-500 to-temple-maroon rounded-full flex items-center justify-center text-white text-xs font-semibold">
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
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Single Occupancy</span>
                    <span>{trip.pricing.singleSupplement}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Child (5-12 yrs)</span>
                    <span>{trip.pricing.child5to12}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">{trip.pricing.groupDiscount}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">{trip.pricing.earlyBird}</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg py-6 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book This Yatra
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Secure payment • 50% advance</p>
                  <div className="flex justify-center space-x-2">
                    {["Razorpay", "UPI", "Cards"].map((method) => (
                      <Badge key={method} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
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
                  connect@omytravels.com
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
              Book Your Pilgrimage
            </DialogTitle>
          </DialogHeader>
          <BookingForm
            tourId={id || ""}
            tourName={trip.name}
            onClose={() => setIsBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripDetail;
