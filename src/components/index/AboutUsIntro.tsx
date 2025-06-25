
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUsIntro = () => (
  <section className="py-16 bg-white relative">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-4xl font-temple font-bold text-orange-600">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Omy Travels is a trusted name in travel experiences across India. From ancient temples to pristine beaches, 
            royal heritage to mountain adventures - we curate diverse, comfortable, and memorable journeys for all types of travelers.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Founded with passion for travel and dedication to service, our mission is to make India's incredible destinations 
            accessible, enjoyable, and transformative for every traveler who journeys with us.
          </p>
          <Button 
            asChild
            variant="outline" 
            className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3"
          >
            <Link to="/about">Read Full Story</Link>
          </Button>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="/lovable-uploads/4feb4f58-15a9-4299-9bb8-4489cc721530.png"
              alt="Taj Mahal through ornate archway"
              className="rounded-lg shadow-lg"
            />
            <img 
              src="/lovable-uploads/b7af6d52-1221-455c-aff3-82751d40b460.png"
              alt="Pristine mountain lake landscape"
              className="rounded-lg shadow-lg mt-8"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 animate-gentle-bounce"></div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutUsIntro;
