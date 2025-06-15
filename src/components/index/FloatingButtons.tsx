
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const FloatingButtons = () => {
  const openWhatsApp = () => {
    const phoneNumber = "917348869099"; // Remove + and spaces for WhatsApp URL
    const message = "Hi! I'm interested in your tour packages. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button - Fixed to viewport */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Pulse animation backgrounds */}
        <div className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full animate-[ping_4s_ease-in-out_infinite] opacity-15"></div>
        <div className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full animate-[pulse_4s_ease-in-out_infinite] opacity-10"></div>
        
        {/* WhatsApp button - simplified structure */}
        <button
          onClick={openWhatsApp}
          className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center border-0 cursor-pointer"
          title="Chat with us on WhatsApp"
        >
          <img 
            src="/lovable-uploads/8acb597e-cc8e-447a-89e7-75d37af60313.png" 
            alt="WhatsApp" 
            className="w-10 h-10 object-contain"
          />
        </button>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <Button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </Button>
      </div>
    </>
  );
};

export default FloatingButtons;
