
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

const heroSlides: Slide[] = [
  {
    image: "/lovable-uploads/2a6ac881-f42d-4425-b012-5a8a6b2eb405.png",
    title: "Kashmir Valley Paradise",
    subtitle: "Experience the breathtaking beauty of Dal Lake and snow-capped mountains"
  },
  {
    image: "/lovable-uploads/4a3e3a77-7138-41d9-9ace-0be679cf17b1.png",
    title: "Himalayan Cable Car Adventure",
    subtitle: "Soar above the snow-covered peaks and valleys of the mighty Himalayas"
  },
  {
    image: "/lovable-uploads/572bb5b4-4dfe-4a34-a028-22fd25e6982e.png",
    title: "Sacred Temple Heritage",
    subtitle: "Discover ancient temples and spiritual heritage across India"
  },
  {
    image: "/lovable-uploads/403044bc-1455-4904-b5da-f626095cc624.png",
    title: "Coastal Paradise Retreat",
    subtitle: "Relax at pristine beaches and tropical backwaters of South India"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation arrows - moved to bottom right */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-20 hidden md:flex">
        <button
          onClick={prevSlide}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:pl-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-temple font-bold text-left mb-4 md:mb-6 text-white drop-shadow-2xl">
              Incredible Journeys
              <span className="block text-temple-gold">Await You</span>
            </h1>
            <p className="text-lg md:text-2xl text-left mb-6 md:mb-8 text-white/90 max-w-2xl leading-relaxed drop-shadow-lg">
              Discover India's diverse beauty - from majestic temples to pristine beaches, royal palaces to mountain adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button 
                size="lg" 
                className="btn-temple text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/trips">Explore All Tours</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-xl"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-orange-500 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
