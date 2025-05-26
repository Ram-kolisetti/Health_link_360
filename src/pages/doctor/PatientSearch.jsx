import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PatientSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock patient data
  const mockPatients = [
    {
      id: 'P12345',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      lastVisit: '2023-09-20',
      condition: 'Hypertension'
    },
    {
      id: 'P54321',
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 987-6543',
      email: 'sarah.johnson@example.com',
      lastVisit: '2023-09-15',
      condition: 'Pregnancy - 2nd trimester'
    },
    {
      id: 'P98765',
      name: 'Michael Brown',
      age: 58,
      gender: 'Male',
      phone: '+1 (555) 456-7890',
      email: 'michael.brown@example.com',
      lastVisit: '2023-09-10',
      condition: 'Type 2 Diabetes'
    },
    {
      id: 'P24680',
      name: 'Emily Wilson',
      age: 29,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'emily.wilson@example.com',
      lastVisit: '2023-09-05',
      condition: 'Asthma'
    },
    {
      id: 'P13579',
      name: 'Robert Smith',
      age: 62,
      gender: 'Male',
      phone: '+1 (555) 876-5432',
      email: 'robert.smith@example.com',
      lastVisit: '2023-08-28',
      condition: 'Arthritis'
    },
  ];

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = mockPatients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery)
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Patient Search</h1>
      
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Patients</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, ID, email, or phone"
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
            </div>
            <div className="flex items-end">
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : 'Search'}
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 mr-2">Quick filters:</span>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Diabetes')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Diabetes
            </button>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Hypertension')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Hypertension
            </button>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Pregnancy')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Pregnancy
            </button>
          </div>
        </form>
      </div>
      
      {/* Search Results */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              {isSearching ? 'Searching...' : `Search Results (${searchResults.length})`}
            </h2>
          </div>
          
          {isSearching ? (
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
          ) : searchResults.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {searchResults.map((patient, index) => (
                <motion.div 
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{patient.name}</h3>
                      <p className="text-sm text-gray-500">
                        {patient.id} • {patient.age} years • {patient.gender}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                    <div className="text-sm">
                      <span className="text-gray-500">Last Visit:</span> 
                      <span className="ml-1 font-medium">{formatDate(patient.lastVisit)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Condition:</span> 
                      <span className="ml-1 font-medium">{patient.condition}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/doctor/patient-history/${patient.id}`} className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors text-sm">
                        View History
                      </Link>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                        Schedule
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
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
              <h3 className="mt-4 text-lg font-medium text-gray-900">No patients found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search query or try a different filter.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Advanced Search Tips */}
      {!hasSearched && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Search by Name</h3>
              <p className="text-gray-600">Enter the patient's first or last name to find their records.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Search by ID</h3>
              <p className="text-gray-600">Use the patient's unique ID number for precise matching.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Search by Contact</h3>
              <p className="text-gray-600">Find patients using their email address or phone number.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;