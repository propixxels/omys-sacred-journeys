
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <ContactInfoCards />
            </div>
            <div className="w-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl font-temple font-bold text-temple-maroon">
                  Send us a Message
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're here to assist you with all your travel needs.
                </p>
              </div>
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
