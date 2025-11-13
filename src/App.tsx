import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Trips from "./pages/Trips";
import TripDetail from "./pages/TripDetail";
import Terms from "./pages/Terms";
import CancellationPolicy from "./pages/CancellationPolicy";
import AdminDashboard from "./pages/AdminDashboard";
import AddTour from "./pages/AddTour";
import EditTour from "./pages/EditTour";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "./components/PageTransition";
import WhatsappChatButton from "@/components/WhatsappChatButton";

const queryClient = new QueryClient();

// Component to handle scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 relative overflow-hidden">
              <Routes>
                <Route path="/" element={<PageTransition><Index /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/trips" element={<PageTransition><Trips /></PageTransition>} />
                <Route path="/trip/:slug" element={<PageTransition><TripDetail /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                <Route path="/cancellation-policy" element={<PageTransition><CancellationPolicy /></PageTransition>} />
                <Route path="/admin-login" element={<PageTransition><AdminLogin /></PageTransition>} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <PageTransition><AdminDashboard /></PageTransition>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-tour" 
                  element={
                    <ProtectedRoute>
                      <PageTransition><AddTour /></PageTransition>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit-tour/:id" 
                  element={
                    <ProtectedRoute>
                      <PageTransition><EditTour /></PageTransition>
                    </ProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </main>
            <Footer />
          </div>
          <WhatsappChatButton />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
