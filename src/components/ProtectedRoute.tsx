
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAdmin, loading, user } = useAuth();

  // Show loading while auth is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-50 to-temple-cream">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-temple-maroon"></div>
          <div className="text-xl text-temple-maroon">Verifying access...</div>
        </div>
      </div>
    );
  }

  // If not loading and not admin, redirect to login
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  // User is admin and not loading, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
