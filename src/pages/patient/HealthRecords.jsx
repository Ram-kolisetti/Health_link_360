import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HealthRecords = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch health records on component mount
  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setRecords([
            {
              id: 1,
              type: 'diagnosis',
              title: 'Annual Physical Examination',
              doctor: 'Dr. Sarah Johnson',
              hospital: 'City General Hospital',
              date: '2023-08-15',
              details: 'Regular checkup. Blood pressure: 120/80. Heart rate: 72 bpm. All vitals normal.',
              attachments: ['physical_exam_report.pdf']
            },
            {
              id: 2,
              type: 'lab',
              title: 'Blood Work Analysis',
              doctor: 'Dr. Michael Chen',
              hospital: 'Westside Medical Center',
              date: '2023-07-22',
              details: 'Complete blood count, lipid panel, and metabolic panel. Cholesterol slightly elevated.',
              attachments: ['blood_work_results.pdf', 'lipid_panel.pdf']
            },
            {
              id: 3,
              type: 'prescription',
              title: 'Antibiotic Prescription',
              doctor: 'Dr. Emily Rodriguez',
              hospital: 'Eastside Health Institute',
              date: '2023-06-10',
              details: 'Amoxicillin 500mg, 3 times daily for 10 days. For treatment of sinus infection.',
              attachments: ['prescription_details.pdf']
            },
            {
              id: 4,
              type: 'imaging',
              title: 'Chest X-Ray',
              doctor: 'Dr. James Wilson',
              hospital: 'North County Medical',
              date: '2023-05-18',
              details: 'Chest X-ray to rule out pneumonia. Results show clear lungs, no abnormalities detected.',
              attachments: ['xray_report.pdf', 'xray_image.jpg']
            },
            {
              id: 5,
              type: 'vaccination',
              title: 'Influenza Vaccine',
              doctor: 'Dr. Lisa Park',
              hospital: 'Community Health Clinic',
              date: '2023-04-05',
              details: 'Annual flu vaccination administered. No adverse reactions.',
              attachments: ['vaccination_record.pdf']
            },
          ]);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching health records:', error);
        setIsLoading(false);
      }
    };

    fetchHealthRecords();
  }, []);

  // Filter records based on active tab and search query
  const filteredRecords = records.filter(record => {
    const matchesTab = activeTab === 'all' || record.type === activeTab;
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Health Records</h1>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search records..."
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
              All Records
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'diagnosis' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('diagnosis')}
            >
              Diagnoses
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'lab' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('lab')}
            >
              Lab Results
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'imaging' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('imaging')}
            >
              Imaging
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'prescription' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('prescription')}
            >
              Prescriptions
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'vaccination' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('vaccination')}
            >
              Vaccinations
            </button>
          </div>
        </div>
      </div>
      
      {/* Records List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredRecords.length === 0 ? (
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
          <h3 className="mt-4 text-lg font-medium text-gray-900">No records found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRecords.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <span 
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          record.type === 'diagnosis' ? 'bg-purple-500' :
                          record.type === 'lab' ? 'bg-green-500' :
                          record.type === 'imaging' ? 'bg-yellow-500' :
                          record.type === 'prescription' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}
                      ></span>
                      <span className="text-sm text-gray-500 capitalize">{record.type}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{record.title}</h3>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-sm text-gray-500">{record.date}</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Doctor</p>
                    <p className="font-medium">{record.doctor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hospital</p>
                    <p className="font-medium">{record.hospital}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Details</p>
                  <p className="mt-1">{record.details}</p>
                </div>
                
                {record.attachments && record.attachments.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-2">Attachments</p>
                    <div className="flex flex-wrap gap-2">
                      {record.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                          <svg
                            className="h-4 w-4 mr-2 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {attachment}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthRecords;