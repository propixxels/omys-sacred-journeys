
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Phone, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReCaptcha, { ReCaptchaRef } from "./ReCaptcha";

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For reCAPTCHA v3, execute it before submission if no token exists
    if (!recaptchaToken) {
      recaptchaRef.current?.execute();
      toast({
        title: "Verifying Security",
        description: "Please wait while we verify your request...",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://kcwybfzphlrsnxxfhvpq.functions.supabase.co/send-email",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "enquiry",
            name: formData.name,
            email: formData.email,
            phone: formData.mobile,
            message: formData.message,
            recaptchaToken: recaptchaToken,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Enquiry Submitted Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        
        // Reset form and close
        setFormData({ name: '', mobile: '', email: '', message: '' });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        onClose();
      } else {
        throw new Error(result.error || "Failed to submit enquiry");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit enquiry. Please try again.",
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-temple font-bold text-orange-600 text-center">
            Plan Your Perfect Journey
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" />
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-gray-700 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              Mobile Number *
            </Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              required
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-700 font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-500" />
              Your Message (Optional)
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your travel preferences, dates, or any specific requirements..."
              rows={4}
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 resize-none"
            />
          </div>

          <ReCaptcha
            ref={recaptchaRef}
            onVerify={handleRecaptchaChange}
            onExpired={() => setRecaptchaToken(null)}
            onError={() => setRecaptchaToken(null)}
            action="enquiry_submit"
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryForm;
