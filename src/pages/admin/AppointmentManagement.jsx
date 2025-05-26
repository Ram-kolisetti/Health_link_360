import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';

const AppointmentManagement = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await Promise.all([
          fetchAppointments(),
          fetchDoctors(),
          fetchTimeSlots()
        ]);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, selectedDoctor]);

  // Mock data fetching functions
  const fetchAppointments = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setAppointments([
          {
            id: 1,
            patientName: 'John Doe',
            doctorName: 'Dr. Sarah Johnson',
            date: '2023-10-15',
            time: '10:00 AM',
            type: 'Consultation',
            status: 'Confirmed'
          },
          {
            id: 2,
            patientName: 'Sarah Johnson',
            doctorName: 'Dr. Michael Chen',
            date: '2023-10-15',
            time: '11:30 AM',
            type: 'Follow-up',
            status: 'Pending'
          },
          {
            id: 3,
            patientName: 'Michael Brown',
            doctorName: 'Dr. Emily Wilson',
            date: '2023-10-15',
            time: '2:00 PM',
            type: 'New Patient',
            status: 'Confirmed'
          }
        ]);
        resolve();
      }, 800);
    });
  };

  const fetchDoctors = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setDoctors([
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            availability: ['Monday', 'Wednesday', 'Friday']
          },
          {
            id: 2,
            name: 'Dr. Michael Chen',
            specialty: 'Neurologist',
            availability: ['Tuesday', 'Thursday', 'Saturday']
          },
          {
            id: 3,
            name: 'Dr. Emily Wilson',
            specialty: 'Pediatrician',
            availability: ['Monday', 'Tuesday', 'Thursday', 'Friday']
          }
        ]);
        resolve();
      }, 1000);
    });
  };

  const fetchTimeSlots = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setTimeSlots([
          { time: '09:00 AM', available: true },
          { time: '09:30 AM', available: false },
          { time: '10:00 AM', available: false },
          { time: '10:30 AM', available: true },
          { time: '11:00 AM', available: true },
          { time: '11:30 AM', available: false },
          { time: '02:00 PM', available: false },
          { time: '02:30 PM', available: true },
          { time: '03:00 PM', available: true },
          { time: '03:30 PM', available: true }
        ]);
        resolve();
      }, 1200);
    });
  };

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(selectedDate), i));

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
      className="space-y-8 p-6"
    >
      {/* Header */}
      <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Appointment Management</h1>
            <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
          </div>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              New Appointment
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              Export Schedule
            </button>
          </div>
        </div>
      </motion.section>

      {/* Calendar View */}
      <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Weekly Schedule</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              Previous Week
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              Next Week
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => (
            <div key={index} className="text-center">
              <div className={`p-2 rounded-lg ${
                format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-50'
              }`}>
                <p className="text-sm font-medium">{format(date, 'EEE')}</p>
                <p className="text-lg font-semibold">{format(date, 'd')}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Doctor Selection */}
      <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Doctor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={itemVariants}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedDoctor?.id === doctor.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Time Slots */}
      <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Time Slots</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {timeSlots.map((slot, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-3 rounded-lg text-center cursor-pointer transition-colors ${
                slot.available
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              {slot.time}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Appointments List */}
      <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Appointments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AppointmentManagement; 