import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EPrescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch prescriptions on component mount
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setPrescriptions([
            {
              id: 1,
              status: 'active',
              medication: 'Amoxicillin',
              dosage: '500mg',
              frequency: 'Three times daily',
              duration: '10 days',
              doctor: 'Dr. Emily Rodriguez',
              hospital: 'Eastside Health Institute',
              date: '2023-09-28',
              expiryDate: '2023-10-08',
              instructions: 'Take with food. Complete the full course even if symptoms improve.',
              refillsRemaining: 0
            },
            {
              id: 2,
              status: 'active',
              medication: 'Lisinopril',
              dosage: '10mg',
              frequency: 'Once daily',
              duration: '30 days',
              doctor: 'Dr. Sarah Johnson',
              hospital: 'City General Hospital',
              date: '2023-09-15',
              expiryDate: '2023-10-15',
              instructions: 'Take in the morning. Monitor blood pressure regularly.',
              refillsRemaining: 2
            },
            {
              id: 3,
              status: 'expired',
              medication: 'Ibuprofen',
              dosage: '400mg',
              frequency: 'As needed for pain',
              duration: '7 days',
              doctor: 'Dr. Michael Chen',
              hospital: 'Westside Medical Center',
              date: '2023-08-10',
              expiryDate: '2023-08-17',
              instructions: 'Take with food. Do not exceed 3 tablets in 24 hours.',
              refillsRemaining: 0
            },
            {
              id: 4,
              status: 'expired',
              medication: 'Cetirizine',
              dosage: '10mg',
              frequency: 'Once daily',
              duration: '14 days',
              doctor: 'Dr. James Wilson',
              hospital: 'North County Medical',
              date: '2023-07-22',
              expiryDate: '2023-08-05',
              instructions: 'Take at night. May cause drowsiness.',
              refillsRemaining: 0
            },
          ]);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  // Filter prescriptions based on active tab and search query
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesTab = activeTab === 'all' || prescription.status === activeTab;
    const matchesSearch = prescription.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prescription.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My E-Prescriptions</h1>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search prescriptions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              All Prescriptions
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'expired' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('expired')}
            >
              Expired
            </button>
          </div>
        </div>
      </div>
      
      {/* Prescriptions List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPrescriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No prescriptions found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPrescriptions.map((prescription) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <span 
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          prescription.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></span>
                      <h2 className="text-xl font-semibold text-gray-800">{prescription.medication} {prescription.dosage}</h2>
                    </div>
                    <p className="text-gray-600">
                      Prescribed by {prescription.doctor} • {formatDate(prescription.date)}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    {prescription.status === 'active' && prescription.refillsRemaining > 0 ? (
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        Request Refill ({prescription.refillsRemaining} left)
                      </button>
                    ) : prescription.status === 'active' ? (
                      <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md">
                        No Refills Left
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-red-100 text-red-800 rounded-md">
                        Expired on {formatDate(prescription.expiryDate)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dosage Instructions</h3>
                    <p className="text-gray-800">{prescription.frequency} for {prescription.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pharmacy</h3>
                    <p className="text-gray-800">{prescription.hospital}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Special Instructions</h3>
                  <p className="text-gray-800">{prescription.instructions}</p>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EPrescription;