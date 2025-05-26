import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // If not logged in, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  
  // Check if user has the required role
  if (!allowedRoles.includes(userRole)) {
    // Redirect to their appropriate dashboard based on role
    return <Navigate to={`/${userRole}`} replace />;
  }
  
  // If user is authenticated and has the correct role, render the protected component
  return children;
};

export default ProtectedRoute;