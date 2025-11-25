
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReCaptcha, { ReCaptchaRef } from "./ReCaptcha";

interface BookingFormProps {
  tourId: string;
  tourName: string;
  onClose: () => void;
}

const BookingForm = ({ tourId, tourName, onClose }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    mobileNumber: "",
    numberOfPeople: 1
  });
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      toast({
        title: "reCAPTCHA Required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // First, verify reCAPTCHA
      const recaptchaResponse = await fetch(
        "https://kcwybfzphlrsnxxfhvpq.functions.supabase.co/send-email",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "verify-recaptcha",
            recaptchaToken: recaptchaToken,
          }),
        }
      );

      if (!recaptchaResponse.ok) {
        throw new Error("reCAPTCHA verification failed");
      }

      const recaptchaResult = await recaptchaResponse.json();
      
      if (!recaptchaResult.success) {
        throw new Error("reCAPTCHA verification failed");
      }

      const { error } = await supabase
        .from('bookings')
        .insert({
          tour_id: tourId,
          customer_name: formData.customerName,
          email: formData.email,
          mobile_number: formData.mobileNumber,
          number_of_people: formData.numberOfPeople
        });

      if (error) throw error;

      // Send booking notification email
      await fetch(
        "https://kcwybfzphlrsnxxfhvpq.functions.supabase.co/send-email",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "booking",
            subject: "New Booking Request",
            name: formData.customerName,
            email: formData.email,
            phone: formData.mobileNumber,
            message: `Tour: ${tourName}\nNumber of People: ${formData.numberOfPeople}`,
          }),
        }
      );

      toast({
        title: "Booking Request Submitted!",
        description: "We will call you shortly to confirm your booking and collect payment.",
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking request. Please try again.",
        variant: "destructive"
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardDescription>{tourName}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="mobileNumber">Mobile Number *</Label>
            <Input
              id="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
              required
              placeholder="+91 98765 43210"
            />
          </div>
          
          <div>
            <Label htmlFor="numberOfPeople">Number of People</Label>
            <Input
              id="numberOfPeople"
              type="number"
              min="1"
              value={formData.numberOfPeople}
              onChange={(e) => setFormData({...formData, numberOfPeople: parseInt(e.target.value)})}
              required
            />
          </div>
          
          <ReCaptcha
            ref={recaptchaRef}
            onVerify={handleRecaptchaChange}
            onExpired={() => setRecaptchaToken(null)}
            onError={() => setRecaptchaToken(null)}
          />
          
          <div className="flex space-x-2 pt-4">
            <Button 
              type="submit" 
              className="btn-temple flex-1" 
              disabled={loading || !recaptchaToken}
            >
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
        
        <div className="mt-4 p-3 bg-temple-cream rounded-lg">
          <p className="text-sm text-gray-600">
            📞 We will call you within 24 hours to confirm your booking details and arrange payment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
