
import React from "react";

const ContactHero = () => (
  <div className="relative h-[600px] overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
      }}
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="absolute inset-0 mandala-bg opacity-10" />
    <div className="relative z-10 h-full flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-temple font-bold text-white mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
            Get in touch with us for your next travel adventure. We're here to help you plan 
            the perfect journey across incredible India.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactHero;
