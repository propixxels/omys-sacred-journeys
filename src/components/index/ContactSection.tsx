
import { Users } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-temple font-bold text-orange-600 mb-4">
            Visit Us or Reach Out Anytime
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-temple font-semibold text-orange-600 text-lg">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span>+91 73488 69099</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span>connect@omytravels.com</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-temple font-semibold text-orange-600 text-lg">Office Hours</h4>
                <div className="space-y-2">
                  <p className="text-gray-600">9am to 6pm</p>
                  <p className="text-gray-600">Sunday closed</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-temple font-semibold text-orange-600 text-lg">Office Address</h4>
              <p className="text-gray-600">
                Dhundasi Nagar Rd<br />
                Sirsi, Karnataka 581401
              </p>
            </div>
          </div>

          <div className="rounded-lg h-80 overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.123456789!2d74.8339!3d14.6243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM3JzI3LjUiTiA3NMKwNTAnMDIuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Omy Travels Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
