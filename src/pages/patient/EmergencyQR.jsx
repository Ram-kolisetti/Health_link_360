import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EmergencyQR = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch QR code data on component mount
  useEffect(() => {
    const fetchQRData = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setQrData({
            patientId: 'P12345678',
            name: 'John Doe',
            dateOfBirth: '1985-06-15',
            bloodType: 'O+',
            allergies: ['Penicillin', 'Peanuts'],
            emergencyContacts: [
              {
                name: 'Jane Doe',
                relationship: 'Spouse',
                phone: '+1 (555) 123-4567'
              },
              {
                name: 'Robert Smith',
                relationship: 'Brother',
                phone: '+1 (555) 987-6543'
              }
            ],
            medications: [
              'Lisinopril 10mg',
              'Metformin 500mg'
            ],
            conditions: [
              'Hypertension',
              'Type 2 Diabetes'
            ],
            lastUpdated: '2023-10-01'
          });
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching QR data:', error);
        setIsLoading(false);
      }
    };

    fetchQRData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Emergency QR Code</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 mb-6">
          Your emergency QR code provides critical medical information to healthcare providers in case of an emergency.
          First responders can scan this code to access your vital health information even if you're unable to communicate.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* QR Code Section */}
          <div className="md:w-1/2">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 mb-4">
                  {/* This would be a real QR code in a production app */}
                  <div className="w-64 h-64 bg-gray-100 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="10" y="10" width="80" height="80" fill="white" />
                      <rect x="20" y="20" width="60" height="60" fill="black" />
                      <rect x="30" y="30" width="40" height="40" fill="white" />
                      <rect x="40" y="40" width="20" height="20" fill="black" />
                      <rect x="20" y="20" width="10" height="10" fill="white" />
                      <rect x="70" y="20" width="10" height="10" fill="white" />
                      <rect x="20" y="70" width="10" height="10" fill="white" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Download QR Code
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                    Print QR Code
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Information Preview */}
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Information Included</h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Basic Information</h3>
                    <p className="text-gray-800">{qrData.name} • {formatDate(qrData.dateOfBirth)} • Blood Type: {qrData.bloodType}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Allergies</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {qrData.allergies.map((allergy, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Current Medications</h3>
                    <ul className="list-disc list-inside text-gray-800 mt-1">
                      {qrData.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Medical Conditions</h3>
                    <ul className="list-disc list-inside text-gray-800 mt-1">
                      {qrData.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                  >
                    {showDetails ? 'Hide' : 'Show'} emergency contacts
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ml-1 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDetails && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Emergency Contacts</h3>
                      <div className="space-y-3">
                        {qrData.emergencyContacts.map((contact, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-md">
                            <p className="font-medium text-gray-800">{contact.name}</p>
                            <p className="text-gray-600">{contact.relationship}</p>
                            <p className="text-gray-600">{contact.phone}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="text-sm text-gray-500 mt-4">
                    Last updated: {formatDate(qrData.lastUpdated)}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Information and Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use Your Emergency QR Code</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Print Your QR Code</h3>
            <p className="text-gray-600">Print and keep a copy in your wallet, purse, or emergency kit.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Save to Your Phone</h3>
            <p className="text-gray-600">Download and save the QR code to your phone's lock screen or health app.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Keep Information Updated</h3>
            <p className="text-gray-600">Regularly update your medical information to ensure accuracy in emergencies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyQR;