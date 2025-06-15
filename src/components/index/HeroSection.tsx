
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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Sacred Kashi Darshan",
    subtitle: "Experience the spiritual heart of India at the holy city of Varanasi"
  },
  {
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Divine Kedarnath Yatra",
    subtitle: "Journey to the sacred Himalayan temple of Lord Shiva"
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Kodachadri Hill Trek",
    subtitle: "Discover the pristine beauty of Western Ghats peaks"
  },
  {
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Kumta Om Beach Bliss",
    subtitle: "Relax at the serene beaches of Karnataka's coastline"
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

      {/* Navigation arrows positioned to avoid overlaps */}
      <div className="absolute bottom-32 md:bottom-20 left-1/2 transform -translate-x-1/2 md:left-auto md:right-20 md:transform-none z-20 flex gap-2">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} className="md:w-5 md:h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={16} className="md:w-5 md:h-5" />
        </button>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl ml-8 md:ml-16">
            <h1 className="text-4xl md:text-7xl font-temple font-bold text-left mb-4 md:mb-6 text-white drop-shadow-2xl">
              Incredible Journeys
              <span className="block text-temple-gold">Await You</span>
            </h1>
            <p className="text-lg md:text-2xl text-left mb-6 md:mb-8 text-white/90 max-w-2xl leading-relaxed drop-shadow-lg">
              Discover India's diverse beauty - from majestic temples to pristine beaches, royal palaces to mountain adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
