
import PageTransition from "@/components/PageTransition";
import TripsWithTabs from "@/components/TripsWithTabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, Star, Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Trips = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing travel experience! The arrangements were perfect and the guide was very knowledgeable about the destinations.",
      tour: "Rajasthan Heritage Tour"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Kerala backwaters trip was life-changing. Excellent organization and comfortable accommodations throughout the journey.",
      tour: "Kerala Backwaters Tour"
    },
    {
      name: "Sunita Devi",
      location: "Pune",
      rating: 4,
      comment: "Well-organized trip to Goa. The beach resorts were amazing and the group was wonderful.",
      tour: "Goa Beach Holiday"
    }
  ];

  const faqs = [
    {
      question: "What is included in the tour packages?",
      answer: "Our tour packages typically include accommodation, transportation, meals as specified, guided tours, entry fees to attractions/monuments, and sightseeing arrangements."
    },
    {
      question: "How do I book a tour?",
      answer: "You can book a tour by clicking on 'View Details' on any tour card, then filling out the booking form. Our team will contact you within 24 hours to confirm your booking."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 30 days before departure: 10% of tour cost. 15-29 days: 25% of tour cost. 7-14 days: 50% of tour cost. Less than 7 days: 75% of tour cost."
    },
    {
      question: "Are the tours suitable for elderly people?",
      answer: "Yes, we design our tours to be comfortable for all age groups. We provide special assistance for elderly travelers and ensure comfortable accommodations and transportation."
    },
    {
      question: "What should I pack for the trip?",
      answer: "Pack comfortable clothing suitable for the climate, walking shoes, personal medications, and any specific items you may need. We'll provide a detailed packing list upon booking."
    },
    {
      question: "Do you provide vegetarian food?",
      answer: "Yes, all our tours include vegetarian meals as standard. We can also accommodate special dietary requirements with prior notice."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Travel destinations"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Explore Amazing Destinations
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover incredible places and create unforgettable memories with our carefully crafted tour packages across India and beyond
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center text-white">
                <MapPin className="w-5 h-5 mr-2" />
                <span>100+ Destinations</span>
              </div>
              <div className="flex items-center text-white">
                <Clock className="w-5 h-5 mr-2" />
                <span>Expert Guided Tours</span>
              </div>
              <div className="flex items-center text-white">
                <Star className="w-5 h-5 mr-2" />
                <span>4.8/5 Rating</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
              asChild
            >
              <a href="#tours">Explore Tours</a>
            </Button>
          </div>
        </section>

        {/* Tours Section */}
        <section id="tours" className="py-8">
          <TripsWithTabs />
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                What Our Travelers Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Read testimonials from thousands of satisfied travelers who have experienced amazing journeys through our tours
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-blue-600">
                          {testimonial.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-2">"{testimonial.comment}"</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.tour}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our tour packages and booking process
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                Need Help Planning Your Trip?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our travel experts are here to help you plan the perfect getaway. Get in touch with us today!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-4">Speak with our travel experts</p>
                  <p className="text-blue-600 font-semibold">+91 9876543210</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-4">Get detailed information</p>
                  <p className="text-blue-600 font-semibold">info@travelcompany.com</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">WhatsApp</h3>
                  <p className="text-gray-600 mb-4">Quick chat support</p>
                  <p className="text-blue-600 font-semibold">+91 9876543210</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4"
                asChild
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Trips;
