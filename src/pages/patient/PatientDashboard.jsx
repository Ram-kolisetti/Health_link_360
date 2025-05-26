import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Fetch data on component mount
  useEffect(() => {
    // Simulate API calls with setTimeout
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await Promise.all([
          fetchUpcomingAppointments(),
          fetchRecentPrescriptions(),
          fetchNotifications()
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Mock data fetching functions
  const fetchUpcomingAppointments = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setUpcomingAppointments([
          {
            id: 1,
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            hospitalName: 'City General Hospital',
            date: '2023-10-15',
            time: '10:30 AM',
            status: 'confirmed'
          },
          {
            id: 2,
            doctorName: 'Dr. Michael Chen',
            specialty: 'Dermatologist',
            hospitalName: 'Westside Medical Center',
            date: '2023-10-22',
            time: '2:15 PM',
            status: 'pending'
          }
        ]);
        resolve();
      }, 800);
    });
  };
  
  const fetchRecentPrescriptions = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setRecentPrescriptions([
          {
            id: 1,
            doctorName: 'Dr. Emily Wilson',
            date: '2023-09-28',
            medications: [
              { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
              { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: 'For pain' }
            ]
          }
        ]);
        resolve();
      }, 1000);
    });
  };
  
  const fetchNotifications = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setNotifications([
          {
            id: 1,
            type: 'appointment_reminder',
            message: 'Reminder: Appointment with Dr. Sarah Johnson tomorrow at 10:30 AM',
            date: '2023-10-14',
            isRead: false
          },
          {
            id: 2,
            type: 'test_results',
            message: 'Your blood test results are now available',
            date: '2023-10-10',
            isRead: true
          }
        ]);
        resolve();
      }, 600);
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section with Greeting Animation */}
      <motion.section variants={itemVariants} className="glass-card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {getGreeting()}, {currentUser?.name || 'Patient'}
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Welcome to your health dashboard
            </motion.p>
          </div>
          
          <motion.div 
            className="flex space-x-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Link to="/patient/book-appointment" className="btn-primary">
              Book Appointment
            </Link>
            <Link to="/patient/emergency-qr" className="btn-outline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Emergency
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Quick Stats */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 flex items-center">
          <div className="rounded-full bg-primary-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Upcoming Appointments</h3>
            <p className="text-2xl font-semibold text-gray-800">{upcomingAppointments.length}</p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-center">
          <div className="rounded-full bg-secondary-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active Prescriptions</h3>
            <p className="text-2xl font-semibold text-gray-800">{recentPrescriptions.reduce((total, prescription) => total + prescription.medications.length, 0)}</p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-center">
          <div className="rounded-full bg-accent-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Notifications</h3>
            <p className="text-2xl font-semibold text-gray-800">
              {notifications.filter(notification => !notification.isRead).length}
            </p>
          </div>
        </div>
      </motion.section>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments with Calendar Animation */}
        <motion.section variants={itemVariants} className="lg:col-span-2">
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
            </div>
            
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div 
                    key={appointment.id}
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-500">{appointment.specialty} • {appointment.hospitalName}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                      <div className="text-sm">
                        <span className="text-gray-500">Date:</span> 
                        <span className="ml-1 font-medium">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Time:</span> 
                        <span className="ml-1 font-medium">{appointment.time}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} capitalize`}>
                        {appointment.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No upcoming appointments</p>
                <Link to="/patient/book-appointment" className="btn-primary mt-4 inline-block">
                  Book an Appointment
                </Link>
              </div>
            )}
          </div>
        </motion.section>
        
        {/* Notifications */}
        <motion.section variants={itemVariants}>
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              <Link to="/patient/notifications" className="text-sm text-primary-600 hover:text-primary-800 transition-colors">
                View All
              </Link>
            </div>
            
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 3).map((notification, index) => (
                  <motion.div 
                    key={notification.id}
                    className={`p-4 ${!notification.isRead ? 'bg-primary-50' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex items-start">
                      <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${notification.type === 'appointment_reminder' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'}`}>
                        {notification.type === 'appointment_reminder' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(notification.date)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No new notifications</p>
              </div>
            )}
          </div>
          
          {/* Quick Access */}
          <div className="glass-card mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/patient/health-records" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Health Records</span>
              </Link>
              
              <Link to="/patient/e-prescription" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">E-Prescription</span>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default PatientDashboard;