
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users, Calendar, MapPin, Star, Eye, LogOut, Plane, Bus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Tour {
  id: string;
  name: string;
  duration: string;
  transport_mode: string;
  destinations: string;
  departure_date: string;
  cost: number;
  cost_details: string;
  description?: string;
}

interface Booking {
  id: string;
  tour_id: string;
  customer_name: string;
  email: string;
  mobile_number: string;
  number_of_people: number;
  booking_date: string;
  status: string;
  notes?: string;
  tours: {
    name: string;
  };
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAddTourOpen, setIsAddTourOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [newTour, setNewTour] = useState({
    name: "",
    duration: "",
    transport_mode: "bus",
    destinations: "",
    departure_date: "",
    cost: "",
    cost_details: "",
    description: ""
  });

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('departure_date', { ascending: true });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive"
      });
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          tours (name)
        `)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTour = async () => {
    if (!newTour.name || !newTour.duration || !newTour.cost) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('tours')
        .insert({
          name: newTour.name,
          duration: newTour.duration,
          transport_mode: newTour.transport_mode,
          destinations: newTour.destinations,
          departure_date: newTour.departure_date,
          cost: parseInt(newTour.cost),
          cost_details: newTour.cost_details,
          description: newTour.description
        });

      if (error) throw error;

      setNewTour({
        name: "",
        duration: "",
        transport_mode: "bus",
        destinations: "",
        departure_date: "",
        cost: "",
        cost_details: "",
        description: ""
      });
      setIsAddTourOpen(false);
      fetchTours();

      toast({
        title: "Success",
        description: "Tour added successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tour",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTour = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchTours();
      toast({
        title: "Success",
        description: "Tour deleted successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tour",
        variant: "destructive"
      });
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;
      
      fetchBookings();
      toast({
        title: "Success",
        description: `Booking status updated to ${newStatus}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    }
  };

  const totalRevenue = bookings
    .filter(booking => booking.status === 'confirmed')
    .reduce((sum, booking) => {
      const tour = tours.find(t => t.id === booking.tour_id);
      return sum + (tour ? tour.cost * booking.number_of_people : 0);
    }, 0);

  const totalBookings = bookings.length;
  const activeTours = tours.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-temple font-bold text-temple-maroon">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Manage your tours and bookings
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Dialog open={isAddTourOpen} onOpenChange={setIsAddTourOpen}>
              <DialogTrigger asChild>
                <Button className="btn-temple">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Tour
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-temple text-temple-maroon">Add New Tour</DialogTitle>
                  <DialogDescription>
                    Create a new pilgrimage tour package
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Tour Name *</Label>
                    <Input
                      id="name"
                      value={newTour.name}
                      onChange={(e) => setNewTour({...newTour, name: e.target.value})}
                      placeholder="e.g., Kedarnath Yatra"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      value={newTour.duration}
                      onChange={(e) => setNewTour({...newTour, duration: e.target.value})}
                      placeholder="e.g., 7 Days / 6 Nights"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transport_mode">Transport Mode *</Label>
                    <select
                      id="transport_mode"
                      value={newTour.transport_mode}
                      onChange={(e) => setNewTour({...newTour, transport_mode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="bus">Bus</option>
                      <option value="flight">Flight</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="destinations">Destinations *</Label>
                    <Textarea
                      id="destinations"
                      value={newTour.destinations}
                      onChange={(e) => setNewTour({...newTour, destinations: e.target.value})}
                      placeholder="List of destinations separated by commas"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="departure_date">Departure Date *</Label>
                    <Input
                      id="departure_date"
                      type="date"
                      value={newTour.departure_date}
                      onChange={(e) => setNewTour({...newTour, departure_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost">Cost (₹) *</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={newTour.cost}
                      onChange={(e) => setNewTour({...newTour, cost: e.target.value})}
                      placeholder="e.g., 25999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost_details">Cost Details</Label>
                    <Input
                      id="cost_details"
                      value={newTour.cost_details}
                      onChange={(e) => setNewTour({...newTour, cost_details: e.target.value})}
                      placeholder="e.g., GST inclusive + Airfare separately"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTour.description}
                      onChange={(e) => setNewTour({...newTour, description: e.target.value})}
                      placeholder="Brief description of the tour"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddTour} className="btn-temple flex-1">
                      Add Tour
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddTourOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-temple">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Confirmed Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-1">From confirmed bookings</p>
            </CardContent>
          </Card>

          <Card className="card-temple">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">{totalBookings}</div>
              <p className="text-sm text-gray-600 mt-1">All booking requests</p>
            </CardContent>
          </Card>

          <Card className="card-temple">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Tours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">{activeTours}</div>
              <p className="text-sm text-gray-600 mt-1">Packages available</p>
            </CardContent>
          </Card>

          <Card className="card-temple">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Awaiting confirmation</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tours" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tours" className="font-medium">Manage Tours</TabsTrigger>
            <TabsTrigger value="bookings" className="font-medium">Manage Bookings</TabsTrigger>
          </TabsList>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <Card key={tour.id} className="card-temple">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-temple text-temple-maroon">
                        {tour.name}
                      </CardTitle>
                      <Badge variant="outline" className="border-saffron-600 text-saffron-600">
                        {tour.transport_mode === 'bus' ? (
                          <><Bus className="w-3 h-3 mr-1" /> Bus</>
                        ) : (
                          <><Plane className="w-3 h-3 mr-1" /> Flight</>
                        )}
                      </Badge>
                    </div>
                    <CardDescription>{tour.duration}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center space-x-1 mb-2">
                        <MapPin className="w-4 h-4 text-saffron-600" />
                        <span className="line-clamp-2">{tour.destinations}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-temple-gold" />
                        <span>{new Date(tour.departure_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-lg font-bold text-saffron-600 mb-2">
                        ₹{tour.cost.toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-500 mb-4">{tour.cost_details}</p>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteTour(tour.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="card-temple">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div>
                        <h3 className="font-temple font-semibold text-temple-maroon">
                          {booking.customer_name}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-sm text-gray-600">{booking.mobile_number}</p>
                      </div>

                      <div>
                        <p className="font-medium">{booking.tours.name}</p>
                        <p className="text-sm text-gray-600">
                          {booking.number_of_people} person{booking.number_of_people > 1 ? 's' : ''}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Booking Date</p>
                        <p className="font-medium">
                          {new Date(booking.booking_date).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <Badge 
                          variant={booking.status === 'confirmed' ? 'default' : booking.status === 'cancelled' ? 'destructive' : 'secondary'}
                          className={
                            booking.status === 'confirmed' 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : booking.status === 'cancelled'
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="col-span-2 flex space-x-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="btn-temple"
                              onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                            >
                              Confirm
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
