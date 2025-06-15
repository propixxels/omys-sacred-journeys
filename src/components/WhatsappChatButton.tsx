
import React from "react";

const phoneNumber = "917348869099";
const prefilledMessage = "Hi! I'm interested in your tour packages. Could you please provide more information?";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledMessage)}`;

const WhatsappChatButton = () => (
  <div className="fixed right-6 bottom-6 z-[9999]">
    {/* Optional pulse animation */}
    <div className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-15 pointer-events-none"></div>
    <div className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full animate-[pulse_3s_ease-in-out_infinite] opacity-10 pointer-events-none"></div>
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 cursor-pointer"
    >
      <img
        src="/lovable-uploads/8acb597e-cc8e-447a-89e7-75d37af60313.png"
        alt="WhatsApp"
        className="w-9 h-9 object-contain"
      />
    </a>
  </div>
);

export default WhatsappChatButton;

