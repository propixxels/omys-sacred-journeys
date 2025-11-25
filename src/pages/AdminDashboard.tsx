import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users, Calendar, MapPin, Star, Eye, LogOut, Plane, Bus, Loader, Archive, Phone, Mail, CreditCard, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BookingEditor from "@/components/BookingEditor";
import BookingFilters, { BookingFilters as BookingFiltersType } from "@/components/BookingFilters";
import type { Tables } from "@/integrations/supabase/types";

type Tour = Tables<'tours'>;

type Booking = Tables<'bookings'> & {
  tours: {
    id: string;
    name: string;
    cost: number;
    destinations: string;
    departure_date: string;
  };
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingEditor, setShowBookingEditor] = useState(false);

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, [showDrafts]);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('isDraft', showDrafts)
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
          tours!inner (
            id,
            name,
            cost,
            destinations,
            departure_date
          )
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

  const handleMoveToDraft = async (id: string) => {
    setActionLoading(`moving-${id}`);

    try {
      const { error } = await supabase
        .from('tours')
        .update({ isDraft: true })
        .eq('id', id);

      if (error) throw error;
      
      fetchTours();
      toast({
        title: "Success",
        description: "Tour moved to drafts!"
      });
    } catch (error) {
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
        .update({ isDraft: false })
        .eq('id', id);

      if (error) throw error;
      
      fetchTours();
      toast({
        title: "Success",
        description: "Tour published successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish tour",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleQuickStatusUpdate = async (bookingId: string, newStatus: string) => {
    setActionLoading(`booking-${bookingId}`);

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: newStatus,
          last_modified_by: 'Admin',
          last_modified_at: new Date().toISOString()
        })
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
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    setActionLoading(`deleting-booking-${bookingId}`);

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;
      
      fetchBookings();
      toast({
        title: "Success",
        description: "Booking deleted successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleFiltersChange = (filters: BookingFiltersType) => {
    let filtered = [...bookings];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.customer_name?.toLowerCase().includes(searchLower) ||
        booking.email?.toLowerCase().includes(searchLower) ||
        booking.mobile_number?.includes(filters.search)
      );
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    // Payment status filter
    if (filters.paymentStatus && filters.paymentStatus !== 'all') {
      filtered = filtered.filter(booking => booking.payment_status === filters.paymentStatus);
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(booking => 
        new Date(booking.booking_date) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(booking => 
        new Date(booking.booking_date) <= new Date(filters.dateTo)
      );
    }

    setFilteredBookings(filtered);
  };

  const openBookingEditor = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingEditor(true);
  };

  const closeBookingEditor = () => {
    setSelectedBooking(null);
    setShowBookingEditor(false);
  };

  const totalRevenue = bookings
    .filter(booking => booking.status === 'confirmed')
    .reduce((sum, booking) => {
      return sum + ((booking.payment_amount || 0) - (booking.discount_amount || 0));
    }, 0);

  const totalBookings = bookings.length;
  const activeTours = tours.filter(t => !t.isDraft).length;
  const draftTours = tours.filter(t => t.isDraft).length;

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
                        {tour.isDraft && (
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
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => navigate(`/edit-tour/${tour.id}`)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>

                          {!tour.isDraft ? (
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

          {/* Enhanced Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <BookingFilters 
              onFiltersChange={handleFiltersChange}
              totalCount={bookings.length}
              filteredCount={filteredBookings.length}
            />

            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-saffron-600" />
                </div>
                <h3 className="text-xl font-temple font-semibold text-gray-700 mb-2">
                  {bookings.length === 0 ? 'No bookings yet' : 'No bookings match your filters'}
                </h3>
                <p className="text-gray-600">
                  {bookings.length === 0 
                    ? 'Bookings will appear here once customers start booking tours.'
                    : 'Try adjusting your search criteria or filters.'
                  }
                </p>
              </div>
            ) : (
              <Card className="card-temple">
                <CardHeader>
                  <CardTitle>Booking Management</CardTitle>
                  <CardDescription>
                    Comprehensive booking management with enhanced features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Tour</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{booking.customer_name}</div>
                              <div className="text-sm text-gray-600 flex items-center space-x-2">
                                <Mail className="w-3 h-3" />
                                <span>{booking.email}</span>
                              </div>
                              <div className="text-sm text-gray-600 flex items-center space-x-2">
                                <Phone className="w-3 h-3" />
                                <span>{booking.mobile_number}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{booking.tours.name}</div>
                              <div className="text-sm text-gray-600">
                                {booking.tours.destinations}
                              </div>
                              <div className="text-sm text-gray-600">
                                Departure: {new Date(booking.tours.departure_date).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{booking.number_of_people} person{booking.number_of_people > 1 ? 's' : ''}</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                Booked: {new Date(booking.booking_date).toLocaleDateString()}
                              </div>
                              {booking.special_requests && (
                                <div className="text-sm text-blue-600">
                                  Special requests noted
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                booking.status === 'confirmed' ? 'default' : 
                                booking.status === 'cancelled' ? 'destructive' : 
                                booking.status === 'completed' ? 'secondary' : 'outline'
                              }
                              className={
                                booking.status === 'confirmed' 
                                  ? 'bg-green-500 hover:bg-green-600' 
                                  : booking.status === 'cancelled'
                                  ? 'bg-red-500 hover:bg-red-600'
                                  : booking.status === 'completed'
                                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge 
                                variant={
                                  booking.payment_status === 'paid' ? 'default' : 
                                  booking.payment_status === 'partial' ? 'secondary' : 'outline'
                                }
                                className={
                                  booking.payment_status === 'paid' 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : booking.payment_status === 'partial'
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                }
                              >
                                <CreditCard className="w-3 h-3 mr-1" />
                                {booking.payment_status || 'pending'}
                              </Badge>
                              {booking.payment_amount > 0 && (
                                <div className="text-sm font-medium">
                                  ₹{booking.payment_amount?.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => openBookingEditor(booking)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this booking for {booking.customer_name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      {actionLoading === `deleting-booking-${booking.id}` ? (
                                        <Loader className="w-3 h-3 animate-spin" />
                                      ) : (
                                        'Delete'
                                      )}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              
                              {booking.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="btn-temple"
                                    onClick={() => handleQuickStatusUpdate(booking.id, 'confirmed')}
                                    disabled={actionLoading === `booking-${booking.id}`}
                                  >
                                    {actionLoading === `booking-${booking.id}` ? (
                                      <Loader className="w-3 h-3 animate-spin" />
                                    ) : (
                                      'Confirm'
                                    )}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-red-600 hover:bg-red-50"
                                    onClick={() => handleQuickStatusUpdate(booking.id, 'cancelled')}
                                    disabled={actionLoading === `booking-${booking.id}`}
                                  >
                                    {actionLoading === `booking-${booking.id}` ? (
                                      <Loader className="w-3 h-3 animate-spin" />
                                    ) : (
                                      'Cancel'
                                    )}
                                  </Button>
                                </>
                              )}
                              
                              {booking.internal_notes && (
                                <Badge variant="outline" className="text-xs">
                                  <FileText className="w-3 h-3" />
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Booking Editor Modal */}
        <BookingEditor
          booking={selectedBooking}
          isOpen={showBookingEditor}
          onClose={closeBookingEditor}
          onUpdate={() => {
            fetchBookings();
            closeBookingEditor();
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
