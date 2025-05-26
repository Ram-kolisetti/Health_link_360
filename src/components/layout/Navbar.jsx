import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle role switch
  const handleRoleSwitch = (role) => {
    // In a real app, this would involve an API call to check permissions
    // For demo purposes, we'll just navigate to the selected role's dashboard
    navigate(`/${role}`);
    setIsRoleSwitcherOpen(false);
  };

  // Animation variants
  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const roleSwitcherVariants = {
    closed: { opacity: 0, y: -10, height: 0 },
    open: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.3 } }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              HL
            </motion.div>
            <span className="text-xl font-display font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              HealthLink360
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              <>
                {/* Navigation based on user role */}
                {userRole === 'patient' && (
                  <>
                    <NavLink to="/patient">Dashboard</NavLink>
                    <NavLink to="/patient/book-appointment">Book Appointment</NavLink>
                    <NavLink to="/patient/health-records">Health Records</NavLink>
                    <NavLink to="/patient/e-prescription">E-Prescription</NavLink>
                    <NavLink to="/patient/emergency-qr">Emergency QR</NavLink>
                  </>
                )}

                {userRole === 'doctor' && (
                  <>
                    <NavLink to="/doctor">Dashboard</NavLink>
                    <NavLink to="/doctor/patient-search">Search Patient</NavLink>
                    <NavLink to="/doctor/add-diagnosis">Add Diagnosis</NavLink>
                    <NavLink to="/doctor/live-chat">Live Chat</NavLink>
                  </>
                )}

                {userRole === 'admin' && (
                  <>
                    <NavLink to="/admin">Dashboard</NavLink>
                    <NavLink to="/admin/appointment-manager">Appointments</NavLink>
                    <NavLink to="/admin/doctor-scheduling">Scheduling</NavLink>
                    <NavLink to="/admin/financial-tracking">Finances</NavLink>
                    <NavLink to="/admin/hospital-reports">Reports</NavLink>
                  </>
                )}

                {/* Role Switcher */}
                <div className="relative">
                  <button 
                    onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <span className="capitalize">{userRole}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isRoleSwitcherOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isRoleSwitcherOpen && (
                      <motion.div 
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={roleSwitcherVariants}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20"
                      >
                        <div className="py-1">
                          <button 
                            onClick={() => handleRoleSwitch('patient')}
                            className={`block w-full text-left px-4 py-2 text-sm ${userRole === 'patient' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            Patient Portal
                          </button>
                          <button 
                            onClick={() => handleRoleSwitch('doctor')}
                            className={`block w-full text-left px-4 py-2 text-sm ${userRole === 'doctor' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            Doctor Dashboard
                          </button>
                          <button 
                            onClick={() => handleRoleSwitch('admin')}
                            className={`block w-full text-left px-4 py-2 text-sm ${userRole === 'admin' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            Admin Panel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative ml-3">
                  <button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={logout}
                  >
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <Link 
                  to="/auth" 
                  className="btn-primary"
                >
                  Sign In
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white shadow-xl fixed inset-y-0 right-0 w-64 z-50 overflow-y-auto"
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-primary-600">Menu</span>
                <button 
                  className="rounded-md p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <nav className="p-4">
              {currentUser ? (
                <>
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Logged in as</p>
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-primary-600 capitalize">{userRole}</p>
                  </div>

                  {/* Role Switcher */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Switch Role</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => handleRoleSwitch('patient')}
                        className={`p-2 text-xs rounded ${userRole === 'patient' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        Patient
                      </button>
                      <button 
                        onClick={() => handleRoleSwitch('doctor')}
                        className={`p-2 text-xs rounded ${userRole === 'doctor' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        Doctor
                      </button>
                      <button 
                        onClick={() => handleRoleSwitch('admin')}
                        className={`p-2 text-xs rounded ${userRole === 'admin' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Navigation</p>
                    
                    {userRole === 'patient' && (
                      <>
                        <MobileNavLink to="/patient">Dashboard</MobileNavLink>
                        <MobileNavLink to="/patient/book-appointment">Book Appointment</MobileNavLink>
                        <MobileNavLink to="/patient/health-records">Health Records</MobileNavLink>
                        <MobileNavLink to="/patient/e-prescription">E-Prescription</MobileNavLink>
                        <MobileNavLink to="/patient/notifications">Notifications</MobileNavLink>
                        <MobileNavLink to="/patient/emergency-qr">Emergency QR</MobileNavLink>
                      </>
                    )}

                    {userRole === 'doctor' && (
                      <>
                        <MobileNavLink to="/doctor">Dashboard</MobileNavLink>
                        <MobileNavLink to="/doctor/patient-search">Search Patient</MobileNavLink>
                        <MobileNavLink to="/doctor/add-diagnosis">Add Diagnosis</MobileNavLink>
                        <MobileNavLink to="/doctor/live-chat">Live Chat</MobileNavLink>
                      </>
                    )}

                    {userRole === 'admin' && (
                      <>
                        <MobileNavLink to="/admin">Dashboard</MobileNavLink>
                        <MobileNavLink to="/admin/appointment-manager">Appointments</MobileNavLink>
                        <MobileNavLink to="/admin/doctor-scheduling">Scheduling</MobileNavLink>
                        <MobileNavLink to="/admin/financial-tracking">Finances</MobileNavLink>
                        <MobileNavLink to="/admin/hospital-reports">Reports</MobileNavLink>
                      </>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button 
                      onClick={logout}
                      className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <MobileNavLink to="/about">About Us</MobileNavLink>
                  <MobileNavLink to="/contact">Contact</MobileNavLink>
                  <Link 
                    to="/auth" 
                    className="block w-full text-center btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop NavLink component with active state
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <Link 
      to={to} 
      className={`relative px-1 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
    >
      {children}
      {isActive && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <Link 
      to={to} 
      className={`block px-4 py-2 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
    >
      {children}
    </Link>
  );
};

export default Navbar;