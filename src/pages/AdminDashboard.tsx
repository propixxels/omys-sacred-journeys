
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users, Calendar, MapPin, Star, Eye } from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [tours, setTours] = useState([
    {
      id: 1,
      name: "Kashi Yatra",
      duration: "5 Days / 4 Nights",
      price: 12499,
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
      description: "Experience Ganga Aarti & VIP Darshan at the sacred city of Varanasi",
      status: "Active",
      bookings: 245,
      rating: 4.8,
      nextDeparture: "2025-06-10"
    },
    {
      id: 2,
      name: "Ujjain Mahakaleshwar",
      duration: "3 Days / 2 Nights",
      price: 8999,
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
      description: "Witness the divine Bhasma Aarti at one of the 12 Jyotirlingas",
      status: "Active",
      bookings: 189,
      rating: 4.9,
      nextDeparture: "2025-06-15"
    },
    {
      id: 3,
      name: "Dwarka Darshan",
      duration: "4 Days / 3 Nights",
      price: 15999,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      description: "Visit Krishna's divine city and experience spiritual bliss",
      status: "Active",
      bookings: 167,
      rating: 4.7,
      nextDeparture: "2025-06-20"
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      tourName: "Kashi Yatra",
      customerName: "Ritu Sharma",
      email: "ritu.sharma@email.com",
      phone: "+91 98765 43210",
      pilgrims: 2,
      totalAmount: 24998,
      bookingDate: "2024-05-15",
      departure: "2025-06-10",
      status: "Confirmed",
      paymentStatus: "Paid"
    },
    {
      id: 2,
      tourName: "Ujjain Mahakaleshwar",
      customerName: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 87654 32109",
      pilgrims: 4,
      totalAmount: 35996,
      bookingDate: "2024-05-18",
      departure: "2025-06-15",
      status: "Pending",
      paymentStatus: "Partial"
    },
    {
      id: 3,
      tourName: "Dwarka Darshan",
      customerName: "Meera Patel",
      email: "meera.patel@email.com",
      phone: "+91 76543 21098",
      pilgrims: 1,
      totalAmount: 15999,
      bookingDate: "2024-05-20",
      departure: "2025-06-20",
      status: "Confirmed",
      paymentStatus: "Paid"
    }
  ]);

  const [isAddTourOpen, setIsAddTourOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  
  const [newTour, setNewTour] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
    image: "",
    nextDeparture: ""
  });

  const handleAddTour = () => {
    if (!newTour.name || !newTour.duration || !newTour.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const tour = {
      id: tours.length + 1,
      name: newTour.name,
      duration: newTour.duration,
      price: parseInt(newTour.price),
      description: newTour.description,
      image: newTour.image || "https://images.unsplash.com/photo-1466442929976-97f336a657be",
      status: "Active",
      bookings: 0,
      rating: 0,
      nextDeparture: newTour.nextDeparture
    };

    setTours([...tours, tour]);
    setNewTour({
      name: "",
      duration: "",
      price: "",
      description: "",
      image: "",
      nextDeparture: ""
    });
    setIsAddTourOpen(false);

    toast({
      title: "Success",
      description: "Tour added successfully!"
    });
  };

  const handleDeleteTour = (id: number) => {
    setTours(tours.filter(tour => tour.id !== id));
    toast({
      title: "Success",
      description: "Tour deleted successfully!"
    });
  };

  const handleUpdateBookingStatus = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
    
    toast({
      title: "Success",
      description: `Booking status updated to ${newStatus}`
    });
  };

  const totalRevenue = bookings
    .filter(booking => booking.paymentStatus === "Paid")
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const totalBookings = bookings.length;
  const activeTours = tours.filter(tour => tour.status === "Active").length;

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
          
          <Dialog open={isAddTourOpen} onOpenChange={setIsAddTourOpen}>
            <DialogTrigger asChild>
              <Button className="btn-temple">
                <Plus className="w-4 h-4 mr-2" />
                Add New Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
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
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newTour.price}
                    onChange={(e) => setNewTour({...newTour, price: e.target.value})}
                    placeholder="e.g., 25999"
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
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newTour.image}
                    onChange={(e) => setNewTour({...newTour, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="departure">Next Departure</Label>
                  <Input
                    id="departure"
                    type="date"
                    value={newTour.nextDeparture}
                    onChange={(e) => setNewTour({...newTour, nextDeparture: e.target.value})}
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-temple">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-temple">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">{totalBookings}</div>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
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
              <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-temple-maroon">4.8</div>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-temple-gold fill-current" />
                <span className="text-sm text-gray-600 ml-1">Excellent</span>
              </div>
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
                  <div className="relative">
                    <img 
                      src={tour.image} 
                      alt={tour.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <Badge 
                      className={`absolute top-4 right-4 ${
                        tour.status === 'Active' 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {tour.status}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-temple text-temple-maroon">
                        {tour.name}
                      </CardTitle>
                      <span className="text-lg font-bold text-saffron-600">
                        ₹{tour.price.toLocaleString()}
                      </span>
                    </div>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{tour.duration}</span>
                      <span>{tour.bookings} bookings</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-temple-gold fill-current" />
                        <span>{tour.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(tour.nextDeparture).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
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
                          {booking.customerName}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                      </div>

                      <div>
                        <p className="font-medium">{booking.tourName}</p>
                        <p className="text-sm text-gray-600">
                          {booking.pilgrims} pilgrim{booking.pilgrims > 1 ? 's' : ''}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                        <Badge 
                          variant={booking.paymentStatus === 'Paid' ? 'default' : 'secondary'}
                          className={
                            booking.paymentStatus === 'Paid' 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-orange-500 hover:bg-orange-600 text-white'
                          }
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Departure</p>
                        <p className="font-medium">
                          {new Date(booking.departure).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <Badge 
                          variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                          className={
                            booking.status === 'Confirmed' 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="flex space-x-2">
                        {booking.status === 'Pending' && (
                          <Button 
                            size="sm" 
                            className="btn-temple"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'Confirmed')}
                          >
                            Confirm
                          </Button>
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
