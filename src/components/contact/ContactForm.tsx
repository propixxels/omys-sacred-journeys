import React, { useState, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReCaptcha, { ReCaptchaRef } from "../ReCaptcha";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const handleRecaptchaChange = (token: string | null) => {
    console.log('reCAPTCHA token received:', token ? 'Token received' : 'No token');
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If no token, try to execute reCAPTCHA
    if (!recaptchaToken) {
      console.log('No reCAPTCHA token, executing...');
      recaptchaRef.current?.execute();
      toast({
        title: "Verifying Security",
        description: "Please wait while we verify your request...",
      });
      return;
    }

    setIsSubmitting(true);
    setSent(false);
    
    console.log("Submitting contact form with data:", formData);
    console.log("reCAPTCHA token length:", recaptchaToken.length);
    
    try {
      const resp = await fetch(
        "https://kcwybfzphlrsnxxfhvpq.functions.supabase.co/send-email",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "contact",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            recaptchaToken: recaptchaToken,
          }),
        }
      );
      
      console.log("Response status:", resp.status);
      const res = await resp.json();
      console.log("Response data:", res);
      
      if (resp.ok && res.success) {
        setSent(true);
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you shortly.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        throw new Error(res?.error || "Unable to send message.");
      }
    } catch (err: any) {
      console.error("Contact form submission error:", err);
      toast({
        title: "Failed to send",
        description: err?.message ?? "Unknown error",
        variant: "destructive",
      });
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      // Try to get a new token
      setTimeout(() => {
        recaptchaRef.current?.execute();
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-orange-200 shadow-lg">
      <CardContent className="p-6">
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
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="mt-1"
                placeholder="Tell us about your travel plans and preferences..."
              />
            </div>
            
            <ReCaptcha
              ref={recaptchaRef}
              onVerify={handleRecaptchaChange}
              onExpired={() => {
                console.log('reCAPTCHA expired');
                setRecaptchaToken(null);
              }}
              onError={() => {
                console.log('reCAPTCHA error');
                setRecaptchaToken(null);
              }}
              action="contact_form"
            />
            
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
  );
};

export default ContactForm;
