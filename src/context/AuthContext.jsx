import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token expired, log out user
          handleLogout();
        } else {
          setCurrentUser(decoded);
          setUserRole(decoded.role);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        handleLogout();
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password, role) => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: '123456',
        name: role === 'patient' ? 'John Doe' : 
              role === 'doctor' ? 'Dr. Jane Smith' : 'Admin User',
        email,
        role
      };
      
      // Create a mock token (in real app, this would come from the server)
      const token = 'mock_token_' + role;
      localStorage.setItem('token', token);
      
      setCurrentUser(mockUser);
      setUserRole(role);
      
      // Redirect based on role
      navigate(`/${role}`);
      return true;
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData, role) => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      const mockUser = {
        id: '123456',
        name: userData.name,
        email: userData.email,
        role
      };
      
      // Create a mock token (in real app, this would come from the server)
      const token = 'mock_token_' + role;
      localStorage.setItem('token', token);
      
      setCurrentUser(mockUser);
      setUserRole(role);
      
      // Redirect based on role
      navigate(`/${role}`);
      return true;
    } catch (err) {
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUserRole(null);
    navigate('/auth');
  };

  const checkPermission = (allowedRoles) => {
    if (!userRole) return false;
    return allowedRoles.includes(userRole);
  };

  const value = {
    currentUser,
    userRole,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    checkPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};