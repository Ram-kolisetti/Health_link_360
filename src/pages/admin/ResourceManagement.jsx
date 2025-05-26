import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ResourceManagement = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('staff');
  const [staff, setStaff] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [inventory, setInventory] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await Promise.all([
          fetchStaff(),
          fetchFacilities(),
          fetchInventory()
        ]);
      } catch (error) {
        console.error('Error fetching resource data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock data fetching functions
  const fetchStaff = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setStaff([
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Cardiologist',
            department: 'Cardiology',
            status: 'Active',
            schedule: 'Mon-Fri, 9AM-5PM'
          },
          {
            id: 2,
            name: 'Dr. Michael Chen',
            role: 'Neurologist',
            department: 'Neurology',
            status: 'Active',
            schedule: 'Mon-Thu, 10AM-6PM'
          },
          {
            id: 3,
            name: 'Dr. Emily Wilson',
            role: 'Pediatrician',
            department: 'Pediatrics',
            status: 'On Leave',
            schedule: 'Tue-Sat, 8AM-4PM'
          }
        ]);
        resolve();
      }, 800);
    });
  };

  const fetchFacilities = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setFacilities([
          {
            id: 1,
            name: 'ICU Unit A',
            type: 'Intensive Care',
            capacity: 10,
            available: 3,
            status: 'Operational'
          },
          {
            id: 2,
            name: 'Operation Theater 1',
            type: 'Surgery',
            capacity: 1,
            available: 1,
            status: 'Operational'
          },
          {
            id: 3,
            name: 'Emergency Room',
            type: 'Emergency',
            capacity: 20,
            available: 15,
            status: 'Operational'
          }
        ]);
        resolve();
      }, 1000);
    });
  };

  const fetchInventory = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setInventory([
          {
            id: 1,
            name: 'Ventilators',
            category: 'Medical Equipment',
            quantity: 15,
            available: 12,
            status: 'In Stock'
          },
          {
            id: 2,
            name: 'Surgical Masks',
            category: 'Disposables',
            quantity: 1000,
            available: 750,
            status: 'In Stock'
          },
          {
            id: 3,
            name: 'Antibiotics',
            category: 'Pharmacy',
            quantity: 500,
            available: 300,
            status: 'Low Stock'
          }
        ]);
        resolve();
      }, 1200);
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
            <h1 className="text-3xl font-bold text-gray-800">Resource Management</h1>
            <p className="text-gray-600 mt-1">Manage hospital staff, facilities, and inventory</p>
          </div>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Add New Resource
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </motion.section>

      {/* Tab Navigation */}
      <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-md">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ₹{
              activeTab === 'staff'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('staff')}
          >
            Staff Management
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ₹{
              activeTab === 'facilities'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('facilities')}
          >
            Facilities
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ₹{
              activeTab === 'inventory'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'staff' && (
            <div className="space-y-4">
              {staff.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ₹{
                      member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="space-y-4">
              {facilities.map((facility) => (
                <motion.div
                  key={facility.id}
                  variants={itemVariants}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{facility.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ₹{
                      facility.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {facility.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p>{facility.type}</p>
                    <p>Capacity: {facility.available}/{facility.capacity}</p>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `₹{(facility.available / facility.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-4">
              {inventory.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ₹{
                      item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p>{item.category}</p>
                    <p>Available: {item.available}/{item.quantity}</p>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `₹{(item.available / item.quantity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ResourceManagement; 