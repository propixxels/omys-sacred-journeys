
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      city: "Mumbai",
      rating: 5,
      comment: "Absolutely amazing experience! Every detail was perfectly arranged and the destinations were breathtaking.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Rajesh Kumar",
      city: "Delhi",
      rating: 5,
      comment: "Professional service with excellent guides and comfortable accommodations. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Meera Patel",
      city: "Ahmedabad",
      rating: 5,
      comment: "From adventure trips to cultural tours, they offer the best travel experiences in India!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-temple font-bold text-orange-600 mb-4">
            What Our Travelers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-orange-600">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.city}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
