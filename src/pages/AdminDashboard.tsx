
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users, Calendar, MapPin, Star, Eye, LogOut, Plane, Bus, Loader, Archive } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
  draft: boolean;
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
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAddTourOpen, setIsAddTourOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);
  
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
  }, [showDrafts]);

  const fetchTours = async () => {
    try {
      console.log('Fetching tours...');
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('draft', showDrafts)
        .order('departure_date', { ascending: true });

      console.log('Tours response:', { data, error });

      if (error) throw error;
      
      // Transform the data to include draft property
      const transformedTours = (data || []).map(tour => ({
        ...tour,
        draft: tour.draft ?? false
      })) as Tour[];
      
      setTours(transformedTours);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive"
      });
    }
  };

  const fetchBookings = async () => {
    try {
      console.log('Fetching bookings...');
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          tours!inner (name)
        `)
        .order('booking_date', { ascending: false });

      console.log('Bookings response:', { data, error });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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

    setActionLoading('adding');

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
          description: newTour.description,
          draft: false
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
      console.error('Error adding tour:', error);
      toast({
        title: "Error",
        description: "Failed to add tour",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateTour = async () => {
    if (!editingTour) return;

    setActionLoading(`updating-${editingTour.id}`);

    try {
      const { error } = await supabase
        .from('tours')
        .update({
          name: editingTour.name,
          duration: editingTour.duration,
          transport_mode: editingTour.transport_mode,
          destinations: editingTour.destinations,
          departure_date: editingTour.departure_date,
          cost: editingTour.cost,
          cost_details: editingTour.cost_details,
          description: editingTour.description
        })
        .eq('id', editingTour.id);

      if (error) throw error;

      setEditingTour(null);
      fetchTours();

      toast({
        title: "Success",
        description: "Tour updated successfully!"
      });
    } catch (error) {
      console.error('Error updating tour:', error);
      toast({
        title: "Error",
        description: "Failed to update tour",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleMoveToDraft = async (id: string) => {
    setActionLoading(`moving-${id}`);

    try {
      const { error } = await supabase
        .from('tours')
        .update({ draft: true })
        .eq('id', id);

      if (error) throw error;
      
      fetchTours();
      toast({
        title: "Success",
        description: "Tour moved to drafts!"
      });
    } catch (error) {
      console.error('Error moving tour to draft:', error);
      toast({
        title: "Error",
        description: "Failed to move tour to drafts",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteTour = async (id: string) => {
    setActionLoading(`deleting-${id}`);

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
      console.error('Error deleting tour:', error);
      toast({
        title: "Error",
        description: "Failed to delete tour",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handlePublishTour = async (id: string) => {
    setActionLoading(`publishing-${id}`);

    try {
      const { error } = await supabase
        .from('tours')
        .update({ draft: false })
        .eq('id', id);

      if (error) throw error;
      
      fetchTours();
      toast({
        title: "Success",
        description: "Tour published successfully!"
      });
    } catch (error) {
      console.error('Error publishing tour:', error);
      toast({
        title: "Error",
        description: "Failed to publish tour",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    setActionLoading(`booking-${bookingId}`);

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
      console.error('Error updating booking status:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const totalRevenue = bookings
    .filter(booking => booking.status === 'confirmed')
    .reduce((sum, booking) => {
      const tour = tours.find(t => t.id === booking.tour_id);
      return sum + (tour ? tour.cost * booking.number_of_people : 0);
    }, 0);

  const totalBookings = bookings.length;
  const activeTours = tours.filter(t => !t.draft).length;
  const draftTours = tours.filter(t => t.draft).length;

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
            <Button 
              onClick={() => navigate('/add-tour')}
              className="btn-temple"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Tour
            </Button>
            
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
              <p className="text-sm text-gray-600 mt-1">Published tours</p>
            </CardContent>
          </Card>

          <Card className="card-temple">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Draft Tours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">{draftTours}</div>
              <p className="text-sm text-gray-600 mt-1">Unpublished tours</p>
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
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  variant={!showDrafts ? "default" : "outline"}
                  onClick={() => setShowDrafts(false)}
                >
                  Published Tours ({activeTours})
                </Button>
                <Button
                  variant={showDrafts ? "default" : "outline"}
                  onClick={() => setShowDrafts(true)}
                >
                  Draft Tours ({draftTours})
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <Card key={tour.id} className="card-temple">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-temple text-temple-maroon">
                        {tour.name}
                      </CardTitle>
                      <div className="flex space-x-1">
                        <Badge variant="outline" className="border-saffron-600 text-saffron-600">
                          {tour.transport_mode === 'bus' ? (
                            <><Bus className="w-3 h-3 mr-1" /> Bus</>
                          ) : (
                            <><Plane className="w-3 h-3 mr-1" /> Flight</>
                          )}
                        </Badge>
                        {tour.draft && (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
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
                      
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => setEditingTour(tour)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Tour</DialogTitle>
                              </DialogHeader>
                              {editingTour && (
                                <div className="space-y-4">
                                  <div>
                                    <Label>Tour Name</Label>
                                    <Input
                                      value={editingTour.name}
                                      onChange={(e) => setEditingTour({...editingTour, name: e.target.value})}
                                    />
                                  </div>
                                  <div>
                                    <Label>Duration</Label>
                                    <Input
                                      value={editingTour.duration}
                                      onChange={(e) => setEditingTour({...editingTour, duration: e.target.value})}
                                    />
                                  </div>
                                  <div>
                                    <Label>Cost</Label>
                                    <Input
                                      type="number"
                                      value={editingTour.cost}
                                      onChange={(e) => setEditingTour({...editingTour, cost: parseInt(e.target.value)})}
                                    />
                                  </div>
                                  <div>
                                    <Label>Destinations</Label>
                                    <Textarea
                                      value={editingTour.destinations}
                                      onChange={(e) => setEditingTour({...editingTour, destinations: e.target.value})}
                                    />
                                  </div>
                                  <Button 
                                    onClick={handleUpdateTour}
                                    disabled={actionLoading === `updating-${editingTour.id}`}
                                    className="w-full"
                                  >
                                    {actionLoading === `updating-${editingTour.id}` ? (
                                      <><Loader className="w-4 h-4 mr-2 animate-spin" /> Updating...</>
                                    ) : (
                                      'Update Tour'
                                    )}
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {!tour.draft ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-orange-600 hover:bg-orange-50"
                              onClick={() => handleMoveToDraft(tour.id)}
                              disabled={actionLoading === `moving-${tour.id}`}
                            >
                              {actionLoading === `moving-${tour.id}` ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                <Archive className="w-4 h-4" />
                              )}
                            </Button>
                          ) : (
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 hover:bg-green-50"
                                onClick={() => handlePublishTour(tour.id)}
                                disabled={actionLoading === `publishing-${tour.id}`}
                              >
                                {actionLoading === `publishing-${tour.id}` ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  'Publish'
                                )}
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Tour</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to permanently delete "{tour.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteTour(tour.id)}
                                      disabled={actionLoading === `deleting-${tour.id}`}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      {actionLoading === `deleting-${tour.id}` ? (
                                        <><Loader className="w-4 h-4 mr-2 animate-spin" /> Deleting...</>
                                      ) : (
                                        'Delete'
                                      )}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-saffron-600" />
                </div>
                <h3 className="text-xl font-temple font-semibold text-gray-700 mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-600">
                  Bookings will appear here once customers start booking tours.
                </p>
              </div>
            ) : (
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
                                disabled={actionLoading === `booking-${booking.id}`}
                              >
                                {actionLoading === `booking-${booking.id}` ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  'Confirm'
                                )}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                                disabled={actionLoading === `booking-${booking.id}`}
                              >
                                {actionLoading === `booking-${booking.id}` ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  'Cancel'
                                )}
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
