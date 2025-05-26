import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PatientHistory = () => {
  const { patientId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch patient data and medical records on component mount
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // In a real app, these would be actual API calls
        await Promise.all([
          fetchPatient(),
          fetchMedicalRecords()
        ]);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  // Mock data fetching functions
  const fetchPatient = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setPatient({
          id: patientId || 'P12345',
          name: 'John Doe',
          age: 45,
          gender: 'Male',
          dateOfBirth: '1978-05-15',
          phone: '+1 (555) 123-4567',
          email: 'john.doe@example.com',
          address: '123 Main St, Anytown, CA 12345',
          bloodType: 'O+',
          allergies: ['Penicillin', 'Peanuts'],
          emergencyContact: {
            name: 'Jane Doe',
            relationship: 'Spouse',
            phone: '+1 (555) 987-6543'
          },
          insurance: {
            provider: 'HealthPlus Insurance',
            policyNumber: 'HP987654321',
            expiryDate: '2024-12-31'
          }
        });
        resolve();
      }, 800);
    });
  };

  const fetchMedicalRecords = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setMedicalRecords([
          {
            id: 1,
            type: 'visit',
            date: '2023-09-20',
            doctor: 'Dr. Sarah Johnson',
            department: 'Cardiology',
            diagnosis: 'Hypertension',
            notes: 'Patient presented with elevated blood pressure. Prescribed Lisinopril 10mg daily. Advised on dietary changes and regular exercise.',
            vitals: {
              bloodPressure: '140/90 mmHg',
              heartRate: '78 bpm',
              temperature: '98.6°F',
              respiratoryRate: '16/min',
              oxygenSaturation: '98%'
            },
            prescriptions: [
              { medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' }
            ]
          },
          {
            id: 2,
            type: 'lab',
            date: '2023-09-15',
            doctor: 'Dr. Michael Chen',
            department: 'Laboratory',
            testName: 'Complete Blood Count',
            results: 'WBC: 7.5 x10^9/L, RBC: 5.0 x10^12/L, Hemoglobin: 14.2 g/dL, Hematocrit: 42%, Platelets: 250 x10^9/L',
            interpretation: 'All values within normal range.',
            notes: 'Routine blood work as part of annual physical examination.'
          },
          {
            id: 3,
            type: 'imaging',
            date: '2023-08-10',
            doctor: 'Dr. Emily Rodriguez',
            department: 'Radiology',
            testName: 'Chest X-Ray',
            results: 'No abnormalities detected. Heart size normal. Lung fields clear.',
            interpretation: 'Normal chest X-ray.',
            notes: 'Performed as follow-up to patient\'s complaint of occasional chest discomfort.'
          },
          {
            id: 4,
            type: 'visit',
            date: '2023-07-05',
            doctor: 'Dr. Sarah Johnson',
            department: 'Cardiology',
            diagnosis: 'Hypertension follow-up',
            notes: 'Patient\'s blood pressure has improved with medication. Continue current treatment plan.',
            vitals: {
              bloodPressure: '130/85 mmHg',
              heartRate: '72 bpm',
              temperature: '98.4°F',
              respiratoryRate: '14/min',
              oxygenSaturation: '99%'
            },
            prescriptions: [
              { medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '90 days' }
            ]
          },
          {
            id: 5,
            type: 'procedure',
            date: '2023-06-20',
            doctor: 'Dr. James Wilson',
            department: 'Gastroenterology',
            procedureName: 'Colonoscopy',
            results: 'No polyps or abnormalities detected. Colon appears healthy.',
            notes: 'Routine screening colonoscopy. Patient tolerated procedure well.'
          }
        ]);
        resolve();
      }, 1000);
    });
  };

  // Filter medical records based on active tab
  const filteredRecords = medicalRecords.filter(record => {
    return activeTab === 'all' || record.type === activeTab;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Helper functions for record styling
  const getRecordTypeColor = (type) => {
    switch (type) {
      case 'visit':
        return 'border-blue-500';
      case 'lab':
        return 'border-purple-500';
      case 'imaging':
        return 'border-indigo-500';
      case 'procedure':
        return 'border-green-500';
      default:
        return 'border-gray-500';
    }
  };

  const getRecordTypeBgColor = (type) => {
    switch (type) {
      case 'visit':
        return 'bg-blue-500';
      case 'lab':
        return 'bg-purple-500';
      case 'imaging':
        return 'bg-indigo-500';
      case 'procedure':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRecordTypeLabel = (type) => {
    switch (type) {
      case 'visit':
        return 'Doctor Visit';
      case 'lab':
        return 'Laboratory Test';
      case 'imaging':
        return 'Imaging Study';
      case 'procedure':
        return 'Medical Procedure';
      default:
        return 'Medical Record';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : patient ? (
        <>
          {/* Patient Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 text-xl font-semibold">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
                  <p className="text-gray-600">
                    {patient.id} • {calculateAge(patient.dateOfBirth)} years • {patient.gender}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Schedule Appointment
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                  Add Diagnosis
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Personal Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-800">
                    <span className="font-medium">Date of Birth:</span> {formatDate(patient.dateOfBirth)}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Blood Type:</span> {patient.bloodType}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Address:</span> {patient.address}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-800">
                    <span className="font-medium">Phone:</span> {patient.phone}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Email:</span> {patient.email}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Emergency Contact:</span> {patient.emergencyContact.name} ({patient.emergencyContact.relationship}) - {patient.emergencyContact.phone}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Medical Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Allergies:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.allergies.map((allergy, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-800">
                    <span className="font-medium">Insurance:</span> {patient.insurance.provider} (Policy: {patient.insurance.policyNumber})
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Medical Records */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Medical Records</h2>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                Add New Record
              </button>
            </div>
            
            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('visit')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'visit' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
                >
                  Visits
                </button>
                <button
                  onClick={() => setActiveTab('lab')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'lab' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
                >
                  Labs
                </button>
                <button
                  onClick={() => setActiveTab('imaging')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'imaging' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
                >
                  Imaging
                </button>
                <button
                  onClick={() => setActiveTab('procedure')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'procedure' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
                >
                  Procedures
                </button>
              </div>
            </div>
            
            {/* Medical Records List */}
            <div className="space-y-4">
              {filteredRecords.length > 0 ? (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredRecords.map((record) => (
                    <motion.div
                      key={record.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      {/* Record Header */}
                      <div className={`px-6 py-4 flex justify-between items-center border-l-4 ${getRecordTypeColor(record.type)}`}>
                        <div>
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getRecordTypeBgColor(record.type)}`}></span>
                            <span className="text-sm font-medium text-gray-500">{getRecordTypeLabel(record.type)}</span>
                          </div>
                          <h3 className="text-lg font-semibold mt-1">
                            {record.type === 'visit' && record.diagnosis}
                            {record.type === 'lab' && record.testName}
                            {record.type === 'imaging' && record.testName}
                            {record.type === 'procedure' && record.procedureName}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{formatDate(record.date)}</p>
                          <p className="text-sm font-medium">{record.doctor}</p>
                        </div>
                      </div>
                      
                      {/* Record Details */}
                      <div className="px-6 py-4">
                        {/* Visit Details */}
                        {record.type === 'visit' && (
                          <div>
                            <p className="text-gray-700 mb-4">{record.notes}</p>
                            
                            {record.vitals && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Vitals</h4>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                  <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500">Blood Pressure</p>
                                    <p className="font-medium">{record.vitals.bloodPressure}</p>
                                  </div>
                                  <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500">Heart Rate</p>
                                    <p className="font-medium">{record.vitals.heartRate}</p>
                                  </div>
                                  <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500">Temperature</p>
                                    <p className="font-medium">{record.vitals.temperature}</p>
                                  </div>
                                  <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500">Respiratory Rate</p>
                                    <p className="font-medium">{record.vitals.respiratoryRate}</p>
                                  </div>
                                  <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500">O₂ Saturation</p>
                                    <p className="font-medium">{record.vitals.oxygenSaturation}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {record.prescriptions && record.prescriptions.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Prescriptions</h4>
                                <div className="space-y-2">
                                  {record.prescriptions.map((prescription, index) => (
                                    <div key={index} className="bg-blue-50 p-3 rounded border-l-2 border-blue-500">
                                      <div className="flex justify-between">
                                        <p className="font-medium">{prescription.medication}</p>
                                        <p className="text-sm text-gray-600">{prescription.duration}</p>
                                      </div>
                                      <p className="text-sm text-gray-600">{prescription.dosage}, {prescription.frequency}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Lab Details */}
                        {record.type === 'lab' && (
                          <div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Results</h4>
                              <p className="text-gray-700">{record.results}</p>
                            </div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Interpretation</h4>
                              <p className="text-gray-700">{record.interpretation}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                              <p className="text-gray-700">{record.notes}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Imaging Details */}
                        {record.type === 'imaging' && (
                          <div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Results</h4>
                              <p className="text-gray-700">{record.results}</p>
                            </div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Interpretation</h4>
                              <p className="text-gray-700">{record.interpretation}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                              <p className="text-gray-700">{record.notes}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Procedure Details */}
                        {record.type === 'procedure' && (
                          <div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Results</h4>
                              <p className="text-gray-700">{record.results}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                              <p className="text-gray-700">{record.notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Record Footer */}
                      <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
                        <button className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors">
                          Print
                        </button>
                        <button className="px-3 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors">
                          Edit
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">No medical records found for the selected filter.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">No patient data found.</p>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;