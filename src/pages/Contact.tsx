import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSent(false);

    try {
      const resp = await fetch(
        "https://kcwybfzphlrsnxxfhvpq.functions.supabase.co/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        }
      );

      const res = await resp.json();

      if (resp.ok && res.success) {
        setSent(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(res?.error || "Unable to send message.");
      }
    } catch (err: any) {
      alert("Failed to send: " + (err?.message ?? "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      {/* Standardized Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        
        {/* Regular Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 mandala-bg opacity-10" />
        
        {/* Content */}
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

      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-temple font-bold text-temple-maroon mb-6">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  We're here to assist you with all your travel needs. 
                  Reach out to us for personalized tour experiences and expert guidance for your perfect getaway.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {/* Phone */}
                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-temple-maroon mb-1">Phone</h3>
                        <p className="text-gray-700 font-medium">+91 73488 69099</p>
                        <p className="text-sm text-gray-500">24/7 Travel Support</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-temple-maroon mb-1">Email</h3>
                        <p className="text-gray-700 font-medium">connect@omytravels.com</p>
                        <p className="text-sm text-gray-500">Quick Response</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-temple-maroon mb-1">Address</h3>
                        <p className="text-gray-700">Dhundasi Nagar Rd</p>
                        <p className="text-gray-700">Sirsi, Karnataka 581401</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Working Hours */}
                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-temple-maroon mb-1">Working Hours</h3>
                        <p className="text-gray-700">9am to 6pm</p>
                        <p className="text-sm text-gray-500">Sunday closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-temple text-temple-maroon">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {sent ? (
                    <div className="text-green-700 font-semibold py-6 text-center">Thank you! Your message has been sent.</div>
                  ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({...formData, name: e.target.value})
                          }
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({...formData, phone: e.target.value})
                          }
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Tell us about your travel plans and preferences..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-temple-maroon to-orange-700 hover:from-temple-maroon/90 hover:to-orange-700/90"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-temple font-bold text-temple-maroon mb-4">
              Find Us
            </h2>
            <p className="text-gray-600 text-lg">
              Visit our office in Sirsi, Karnataka for personalized travel consultation
            </p>
          </div>
          
          {/* Embedded Google Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.5234567890123!2d74.83456789!3d14.62123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM3JzE2LjQiTiA3NMKwNTAnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Omy Travels Location - Sirsi, Karnataka"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
