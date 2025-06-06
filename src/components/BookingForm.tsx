
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingFormProps {
  tourId: string;
  onSuccess: () => void;
}

const BookingForm = ({ tourId, onSuccess }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    mobileNumber: "",
    numberOfPeople: 1
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      toast({
        title: "Booking Request Submitted!",
        description: "We will call you shortly to confirm your booking and collect payment.",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-temple text-temple-maroon">Book Your Journey</CardTitle>
        <CardDescription>Secure your pilgrimage booking</CardDescription>
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
          
          <div className="pt-4">
            <Button type="submit" className="btn-temple w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Booking Request'}
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
