import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalPatients: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        await Promise.all([
          fetchAppointments(),
          fetchPatients(),
          fetchStats()
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Mock data fetching functions
  const fetchAppointments = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setAppointments([
          {
            id: 1,
            patientName: 'John Doe',
            patientId: 'P12345',
            date: '2023-10-15',
            time: '10:30 AM',
            type: 'Follow-up',
            status: 'confirmed'
          },
          {
            id: 2,
            patientName: 'Sarah Johnson',
            patientId: 'P54321',
            date: '2023-10-15',
            time: '11:45 AM',
            type: 'New Patient',
            status: 'confirmed'
          },
          {
            id: 3,
            patientName: 'Michael Brown',
            patientId: 'P98765',
            date: '2023-10-15',
            time: '2:15 PM',
            type: 'Consultation',
            status: 'confirmed'
          }
        ]);
        resolve();
      }, 800);
    });
  };

  const fetchPatients = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setPatients([
          {
            id: 'P12345',
            name: 'John Doe',
            age: 45,
            lastVisit: '2023-09-20',
            condition: 'Hypertension'
          },
          {
            id: 'P54321',
            name: 'Sarah Johnson',
            age: 32,
            lastVisit: '2023-09-15',
            condition: 'Pregnancy - 2nd trimester'
          },
          {
            id: 'P98765',
            name: 'Michael Brown',
            age: 58,
            lastVisit: '2023-09-10',
            condition: 'Type 2 Diabetes'
          },
          {
            id: 'P24680',
            name: 'Emily Wilson',
            age: 29,
            lastVisit: '2023-09-05',
            condition: 'Asthma'
          }
        ]);
        resolve();
      }, 1000);
    });
  };

  const fetchStats = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setStats({
          totalAppointments: 24,
          pendingAppointments: 3,
          completedAppointments: 21,
          totalPatients: 156
        });
        resolve();
      }, 600);
    });
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {getGreeting()}, Dr. {currentUser?.name || 'Smith'}
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Welcome to your doctor dashboard
            </motion.p>
          </div>
          
          <motion.div 
            className="flex space-x-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Start Consultation
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Stats Overview */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Today's Appointments</h3>
            <p className="text-2xl font-semibold text-gray-800">{appointments.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Patients</h3>
            <p className="text-2xl font-semibold text-gray-800">{stats.totalPatients}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Completed Appointments</h3>
            <p className="text-2xl font-semibold text-gray-800">{stats.completedAppointments}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Pending Appointments</h3>
            <p className="text-2xl font-semibold text-gray-800">{stats.pendingAppointments}</p>
          </div>
        </div>
      </motion.section>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Appointments */}
        <motion.section variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Today's Appointments</h2>
            </div>
            
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => (
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
            ) : appointments.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {appointments.map((appointment, index) => (
                  <motion.div 
                    key={appointment.id}
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-500">{appointment.patientId} • {appointment.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                      <div className="text-sm">
                        <span className="text-gray-500">Time:</span> 
                        <span className="ml-1 font-medium">{appointment.time}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 capitalize">
                        {appointment.status}
                      </span>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                        Start Session
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No appointments scheduled for today</p>
              </div>
            )}
          </div>
        </motion.section>
        
        {/* Recent Patients */}
        <motion.section variants={itemVariants}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Patients</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                View All
              </button>
            </div>
            
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : patients.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {patients.slice(0, 3).map((patient, index) => (
                  <motion.div 
                    key={patient.id}
                    className="p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex items-start">
                      <div className="mt-1 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-600">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{patient.name}</h3>
                        <p className="text-sm text-gray-500">{patient.age} years • {patient.condition}</p>
                        <p className="text-xs text-gray-500 mt-1">Last visit: {formatDate(patient.lastVisit)}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="px-2 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">
                        View History
                      </button>
                      <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Schedule
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No recent patients</p>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Schedule Appointment</span>
              </button>
              
              <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Write Prescription</span>
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default DoctorDashboard;