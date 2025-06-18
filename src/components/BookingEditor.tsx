
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, User, CreditCard, FileText, Phone, Mail, MapPin, Users, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<'bookings'> & {
  tours: {
    id: string;
    name: string;
    cost: number;
    destinations: string;
    departure_date: string;
  };
};

type Tour = Tables<'tours'>;

interface BookingEditorProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const BookingEditor = ({ booking, isOpen, onClose, onUpdate }: BookingEditorProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    mobile_number: '',
    number_of_people: 1,
    tour_id: '',
    status: 'pending',
    payment_status: 'pending',
    payment_amount: 0,
    discount_amount: 0,
    special_requests: '',
    internal_notes: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    dietary_requirements: ''
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        customer_name: booking.customer_name || '',
        email: booking.email || '',
        mobile_number: booking.mobile_number || '',
        number_of_people: booking.number_of_people || 1,
        tour_id: booking.tour_id || '',
        status: booking.status || 'pending',
        payment_status: booking.payment_status || 'pending',
        payment_amount: booking.payment_amount || 0,
        discount_amount: booking.discount_amount || 0,
        special_requests: booking.special_requests || '',
        internal_notes: booking.internal_notes || '',
        emergency_contact_name: booking.emergency_contact_name || '',
        emergency_contact_phone: booking.emergency_contact_phone || '',
        dietary_requirements: booking.dietary_requirements || ''
      });
    }
  }, [booking]);

  useEffect(() => {
    if (isOpen) {
      fetchTours();
    }
  }, [isOpen]);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('isDraft', false)
        .order('departure_date', { ascending: true });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive"
      });
    }
  };

  const calculateTotalAmount = () => {
    const selectedTour = tours.find(t => t.id === formData.tour_id);
    if (selectedTour) {
      return (selectedTour.cost * formData.number_of_people) - formData.discount_amount;
    }
    return formData.payment_amount - formData.discount_amount;
  };

  const handleSave = async () => {
    if (!booking) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          ...formData,
          last_modified_by: 'Admin',
          last_modified_at: new Date().toISOString()
        })
        .eq('id', booking.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking updated successfully"
      });
      
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addPayment = async () => {
    if (!booking || !formData.payment_amount) return;

    try {
      const { error } = await supabase
        .from('booking_payments')
        .insert({
          booking_id: booking.id,
          amount: formData.payment_amount,
          payment_method: 'cash',
          notes: `Payment added via admin dashboard`
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Payment added successfully"
      });
    } catch (error) {
      console.error('Error adding payment:', error);
      toast({
        title: "Error",
        description: "Failed to add payment",
        variant: "destructive"
      });
    }
  };

  if (!booking) return null;

  const selectedTour = tours.find(t => t.id === formData.tour_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Edit Booking - {booking.customer_name}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Customer Details</TabsTrigger>
            <TabsTrigger value="booking">Booking Info</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Customer Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer_name">Customer Name</Label>
                    <Input
                      id="customer_name"
                      value={formData.customer_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mobile_number">Mobile Number</Label>
                    <Input
                      id="mobile_number"
                      value={formData.mobile_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobile_number: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                    <Input
                      id="emergency_contact_name"
                      value={formData.emergency_contact_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                    <Input
                      id="emergency_contact_phone"
                      value={formData.emergency_contact_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dietary_requirements">Dietary Requirements</Label>
                    <Input
                      id="dietary_requirements"
                      value={formData.dietary_requirements}
                      onChange={(e) => setFormData(prev => ({ ...prev, dietary_requirements: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="special_requests">Special Requests</Label>
                  <Textarea
                    id="special_requests"
                    value={formData.special_requests}
                    onChange={(e) => setFormData(prev => ({ ...prev, special_requests: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Booking Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tour_id">Tour</Label>
                    <Select value={formData.tour_id} onValueChange={(value) => setFormData(prev => ({ ...prev, tour_id: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tour" />
                      </SelectTrigger>
                      <SelectContent>
                        {tours.map((tour) => (
                          <SelectItem key={tour.id} value={tour.id}>
                            {tour.name} - ₹{tour.cost.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="number_of_people">Number of People</Label>
                    <Input
                      id="number_of_people"
                      type="number"
                      min="1"
                      value={formData.number_of_people}
                      onChange={(e) => setFormData(prev => ({ ...prev, number_of_people: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Booking Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Booking Date</Label>
                    <div className="flex items-center space-x-2 p-2 border rounded">
                      <CalendarDays className="w-4 h-4" />
                      <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {selectedTour && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Tour Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Destinations:</strong> {selectedTour.destinations}</p>
                        <p><strong>Departure:</strong> {new Date(selectedTour.departure_date).toLocaleDateString()}</p>
                        <p><strong>Cost per person:</strong> ₹{selectedTour.cost.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payment_status">Payment Status</Label>
                    <Select value={formData.payment_status} onValueChange={(value) => setFormData(prev => ({ ...prev, payment_status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="payment_amount">Payment Amount</Label>
                    <Input
                      id="payment_amount"
                      type="number"
                      value={formData.payment_amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, payment_amount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount_amount">Discount Amount</Label>
                    <Input
                      id="discount_amount"
                      type="number"
                      value={formData.discount_amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount_amount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <Button onClick={addPayment} variant="outline" size="sm">
                      Add Payment Record
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Summary</h4>
                  <div className="space-y-1 text-sm">
                    {selectedTour && (
                      <>
                        <div className="flex justify-between">
                          <span>Base Cost ({formData.number_of_people} × ₹{selectedTour.cost.toLocaleString()}):</span>
                          <span>₹{(selectedTour.cost * formData.number_of_people).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Discount:</span>
                          <span>-₹{formData.discount_amount.toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total Amount:</span>
                          <span>₹{calculateTotalAmount().toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Internal Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="internal_notes">Internal Notes (Admin Only)</Label>
                  <Textarea
                    id="internal_notes"
                    value={formData.internal_notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, internal_notes: e.target.value }))}
                    rows={6}
                    placeholder="Add internal notes about this booking..."
                  />
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Internal notes are only visible to admin users and will not be shared with customers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingEditor;
