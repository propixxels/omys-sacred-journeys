
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import ContactForm from "@/components/contact/ContactForm";
import ContactMapSection from "@/components/contact/ContactMapSection";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50">
      <ContactHero />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="w-full">
              <ContactInfoCards />
            </div>
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <ContactMapSection />
    </div>
  );
};

export default Contact;
