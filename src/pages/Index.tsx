
import { useState } from "react";
import HeroSection from "@/components/index/HeroSection";
import QuickValuesBar from "@/components/index/QuickValuesBar";
import AboutUsIntro from "@/components/index/AboutUsIntro";
import FeaturedToursSection from "@/components/index/FeaturedToursSection";
import WhyChooseUsSection from "@/components/index/WhyChooseUsSection";
import HowItWorksSection from "@/components/index/HowItWorksSection";
import InspirationalQuoteSection from "@/components/index/InspirationalQuoteSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";
import CallToActionSection from "@/components/index/CallToActionSection";
import NewsletterWhatsAppSection from "@/components/index/NewsletterWhatsAppSection";
import ContactSection from "@/components/index/ContactSection";
import FloatingButtons from "@/components/index/FloatingButtons";
import EnquiryForm from "@/components/EnquiryForm";

const Index = () => {
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50">
      <HeroSection />
      <QuickValuesBar />
      <AboutUsIntro />
      <FeaturedToursSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <InspirationalQuoteSection />
      <CallToActionSection onEnquiryClick={() => setIsEnquiryFormOpen(true)} />
      <NewsletterWhatsAppSection />
      <ContactSection />

      {/* Enquiry Form Modal */}
      <EnquiryForm 
        isOpen={isEnquiryFormOpen} 
        onClose={() => setIsEnquiryFormOpen(false)} 
      />

      <FloatingButtons />
    </div>
  );
};

export default Index;
