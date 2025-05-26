import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../common/Chatbot';

const Layout = () => {
  const location = useLocation();
  const { userRole } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="page-container"
        >
          <Outlet />
        </motion.div>
      </main>
      
      <Footer />
      
      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="btn-primary rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Toggle chatbot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        
        {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
      </div>
      
      {/* Quick Access Floating Button for Mobile */}
      <div className="md:hidden fixed bottom-6 left-6 z-50">
        <div className="dropdown dropdown-top dropdown-end">
          <button className="btn-secondary rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {userRole === 'patient' && (
            <div className="dropdown-content mb-2 ml-2 p-2 shadow bg-white rounded-lg w-48">
              <Link to="/patient/book-appointment" className="block p-2 hover:bg-gray-100 rounded">Book Appointment</Link>
              <Link to="/patient/health-records" className="block p-2 hover:bg-gray-100 rounded">Health Records</Link>
              <Link to="/patient/emergency-qr" className="block p-2 hover:bg-gray-100 rounded">Emergency QR</Link>
            </div>
          )}
          
          {userRole === 'doctor' && (
            <div className="dropdown-content mb-2 ml-2 p-2 shadow bg-white rounded-lg w-48">
              <Link to="/doctor/patient-search" className="block p-2 hover:bg-gray-100 rounded">Search Patient</Link>
              <Link to="/doctor/add-diagnosis" className="block p-2 hover:bg-gray-100 rounded">Add Diagnosis</Link>
            </div>
          )}
          
          {userRole === 'admin' && (
            <div className="dropdown-content mb-2 ml-2 p-2 shadow bg-white rounded-lg w-48">
              <Link to="/admin/appointment-manager" className="block p-2 hover:bg-gray-100 rounded">Appointments</Link>
              <Link to="/admin/financial-tracking" className="block p-2 hover:bg-gray-100 rounded">Finances</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;