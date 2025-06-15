
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface CallToActionSectionProps {
  onEnquiryClick: () => void;
}

const CallToActionSection = ({ onEnquiryClick }: CallToActionSectionProps) => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6 text-white">
          <h2 className="text-4xl font-temple font-bold">
            Ready to Begin Your Adventure?
          </h2>
          <p className="text-xl">
            Let us know your travel interests — we'll guide you personally through your perfect journey.
          </p>
          <Button 
            onClick={onEnquiryClick}
            className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-4 h-auto transition-all duration-300 transform hover:scale-105"
          >
            <Users className="w-5 h-5 mr-2" />
            Enquire Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
