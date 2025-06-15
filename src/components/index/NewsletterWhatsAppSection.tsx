
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";

const NewsletterWhatsAppSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <h3 className="text-2xl font-temple font-bold text-orange-600 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6">
                Subscribe for special offers, early-bird discounts, and travel insights.
              </p>
              <NewsletterSignup />
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <h3 className="text-2xl font-temple font-bold text-orange-600 mb-4">
                WhatsApp Updates
              </h3>
              <p className="text-gray-600 mb-6">
                Join our WhatsApp community for instant updates on tour schedules and offers.
              </p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Users className="w-5 h-5 mr-2" />
                Join WhatsApp Group
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterWhatsAppSection;
