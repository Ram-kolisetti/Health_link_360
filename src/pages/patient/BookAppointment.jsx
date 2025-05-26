import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookAppointment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Enhanced step navigation functions
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      // Reset dependent states when going back
      switch (currentStep) {
        case 2:
          setSelectedDepartment(null);
          break;
        case 3:
          setSelectedDoctor(null);
          break;
        case 4:
          setSelectedDate(null);
          setSelectedSlot(null);
          break;
        case 5:
          setBookingSuccess(false);
          break;
        default:
          break;
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < 5 && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedHospital !== null;
      case 2:
        return selectedDepartment !== null;
      case 3:
        return selectedDoctor !== null;
      case 4:
        return selectedDate !== null && selectedSlot !== null;
      default:
        return false;
    }
  };

  // Add validation for form fields
  const validateForm = () => {
    if (currentStep === 5) {
      const nameInput = document.querySelector('input[type="text"]');
      const phoneInput = document.querySelector('input[type="tel"]');
      const emailInput = document.querySelector('input[type="email"]');
      const termsCheckbox = document.querySelector('input[type="checkbox"]');
      
      if (!nameInput?.value || !phoneInput?.value || !emailInput?.value || !termsCheckbox?.checked) {
        return false;
      }
    }
    return true;
  };

  // Enhanced booking handler
  const handleBookAppointment = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields and accept the terms and conditions.');
      return;
    }
    
    // In a real app, this would be an API call to book the appointment
    setTimeout(() => {
      setBookingSuccess(true);
    }, 1500);
  };
  
  // Fetch hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setHospitals([
            {
              id: 1,
              name: 'City General Hospital',
              address: '123 Main Street, Downtown',
              image: 'https://via.placeholder.com/150',
              rating: 4.5,
              departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology']
            },
            {
              id: 2,
              name: 'Westside Medical Center',
              address: '456 West Avenue, Westside',
              image: 'https://via.placeholder.com/150',
              rating: 4.2,
              departments: ['Oncology', 'Gynecology', 'Urology', 'Psychiatry', 'Ophthalmology']
            },
            {
              id: 3,
              name: 'Eastside Health Institute',
              address: '789 East Boulevard, Eastside',
              image: 'https://via.placeholder.com/150',
              rating: 4.7,
              departments: ['Cardiology', 'Pulmonology', 'Endocrinology', 'Rheumatology', 'Nephrology']
            },
            {
              id: 4,
              name: 'North County Medical',
              address: '101 North Road, Northside',
              image: 'https://via.placeholder.com/150',
              rating: 4.0,
              departments: ['Family Medicine', 'Internal Medicine', 'Emergency Medicine', 'Radiology', 'Pathology']
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setIsLoading(false);
      }
    };
    
    fetchHospitals();
  }, []);
  
  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const dates = generateDates();
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Get day name
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Get day number
  const getDayNumber = (date) => {
    return date.getDate();
  };
  
  // Handle date selection and fetch available slots
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    
    // In a real app, this would be an API call to get available slots for the selected date
    setTimeout(() => {
      const mockSlots = [];
      const startHour = 9;
      const endHour = 17;
      
      for (let hour = startHour; hour < endHour; hour++) {
        // Morning slots
        if (hour < 12) {
          mockSlots.push({
            id: `${hour}:00`,
            time: `${hour}:00 AM`,
            available: Math.random() > 0.3 // 70% chance of being available
          });
          mockSlots.push({
            id: `${hour}:30`,
            time: `${hour}:30 AM`,
            available: Math.random() > 0.3
          });
        }
        // Afternoon slots
        else {
          const pmHour = hour === 12 ? 12 : hour - 12;
          mockSlots.push({
            id: `${hour}:00`,
            time: `${pmHour}:00 PM`,
            available: Math.random() > 0.3
          });
          mockSlots.push({
            id: `${hour}:30`,
            time: `${pmHour}:30 PM`,
            available: Math.random() > 0.3
          });
        }
      }
      
      setAvailableSlots(mockSlots);
    }, 500);
  };
  
  // Handle hospital selection
  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setSelectedDepartment(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setCurrentStep(2);
  };
  
  // Handle department selection
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setCurrentStep(3);
    
    // In a real app, this would fetch doctors for the selected department
  };
  
  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedSlot(null);
    setCurrentStep(4);
  };
  
  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setCurrentStep(5);
  };
  
  // Reset booking process
  const handleReset = () => {
    setSelectedHospital(null);
    setSelectedDepartment(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setBookingSuccess(false);
    setCurrentStep(1);
  };
  
  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: selectedDepartment,
      image: 'https://via.placeholder.com/150',
      rating: 4.8,
      experience: '15 years',
      education: 'MD, Harvard Medical School',
      availability: 'Mon, Wed, Fri'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: selectedDepartment,
      image: 'https://via.placeholder.com/150',
      rating: 4.6,
      experience: '10 years',
      education: 'MD, Johns Hopkins University',
      availability: 'Tue, Thu, Sat'
    },
    {
      id: 3,
      name: 'Dr. Emily Wilson',
      specialty: selectedDepartment,
      image: 'https://via.placeholder.com/150',
      rating: 4.9,
      experience: '12 years',
      education: 'MD, Stanford University',
      availability: 'Mon, Tue, Thu'
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24,
        duration: 0.3
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const slideVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24,
        duration: 0.3
      }
    },
    exit: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const stepTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    duration: 0.3
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.section 
        variants={itemVariants} 
        className="glass-card p-6"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-3xl font-bold text-gray-800">Book an Appointment</h1>
        <p className="text-gray-600 mt-1">Find and schedule appointments with doctors across our network of hospitals</p>
      </motion.section>
      
      {/* Booking Process */}
      <motion.section variants={itemVariants} className="glass-card overflow-hidden">
        {/* Progress Steps */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  {step}
                </div>
                <span className="text-xs mt-1 text-gray-500 hidden sm:block">
                  {step === 1 && 'Hospital'}
                  {step === 2 && 'Department'}
                  {step === 3 && 'Doctor'}
                  {step === 4 && 'Date & Time'}
                  {step === 5 && 'Confirm'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Hospital */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={stepTransition}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Hospital</h2>
                
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search hospitals by name or location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-10"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Hospital List */}
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse flex p-4 border border-gray-200 rounded-lg">
                        <div className="rounded-lg bg-gray-200 h-20 w-20"></div>
                        <div className="ml-4 flex-1 space-y-2 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredHospitals.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {filteredHospitals.map((hospital, index) => (
                      <motion.div
                        key={hospital.id}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleHospitalSelect(hospital)}
                      >
                        <div className="flex">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-800">{hospital.name}</h3>
                            <p className="text-sm text-gray-500">{hospital.address}</p>
                            <div className="flex items-center mt-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-1">{hospital.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No hospitals found matching your search criteria</p>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Step 2: Select Department */}
            {currentStep === 2 && selectedHospital && (
              <motion.div
                key="step2"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={stepTransition}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Select a Department</h2>
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={selectedHospital.image} alt={selectedHospital.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-800">{selectedHospital.name}</h3>
                      <p className="text-sm text-gray-500">{selectedHospital.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedHospital.departments.map((department, index) => (
                    <motion.div
                      key={department}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer text-center"
                      onClick={() => handleDepartmentSelect(department)}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800">{department}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Select Doctor */}
            {currentStep === 3 && selectedHospital && selectedDepartment && (
              <motion.div
                key="step3"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={stepTransition}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Select a Doctor</h2>
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={selectedHospital.image} alt={selectedHospital.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{selectedHospital.name}</h3>
                        <p className="text-sm text-gray-500">{selectedHospital.address}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      {selectedDepartment}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {doctors.map((doctor, index) => (
                    <motion.div
                      key={doctor.id}
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handleDoctorSelect(doctor)}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mx-auto sm:mx-0 mb-4 sm:mb-0">
                          <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="sm:ml-6 text-center sm:text-left">
                          <h3 className="font-medium text-gray-800 text-lg">{doctor.name}</h3>
                          <p className="text-sm text-primary-600 font-medium">{doctor.specialty}</p>
                          
                          <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {doctor.experience}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              </svg>
                              {doctor.education}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {doctor.availability}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-3 justify-center sm:justify-start">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 4: Select Date and Time */}
            {currentStep === 4 && selectedDoctor && (
              <motion.div
                key="step4"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={stepTransition}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Select Date & Time</h2>
                  <button 
                    onClick={() => setCurrentStep(3)}
                    className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{selectedDoctor.name}</h3>
                        <p className="text-sm text-gray-500">{selectedDoctor.specialty} • {selectedHospital.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Calendar Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Select Date</h3>
                  
                  <div className="relative">
                    {/* Date Selector */}
                    <div className="flex overflow-x-auto pb-2 space-x-2 mb-4">
                      {dates.map((date, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.05 }}
                          className={`flex-shrink-0 w-16 h-20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${selectedDate && date.toDateString() === selectedDate.toDateString() 
                            ? 'bg-primary-600 text-white shadow-md' 
                            : 'bg-white border border-gray-200 hover:border-primary-300 text-gray-700'}`}
                          onClick={() => handleDateSelect(date)}
                        >
                          <span className="text-xs font-medium mb-1">{getDayName(date)}</span>
                          <span className="text-xl font-bold">{getDayNumber(date)}</span>
                          <span className="text-xs mt-1">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Selected Date Display */}
                    {selectedDate && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-3 bg-gray-50 rounded-lg text-center"
                      >
                        <p className="text-gray-700">
                          Selected Date: <span className="font-medium">{formatDate(selectedDate)}</span>
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Time Slots Section */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Select Time Slot</h3>
                    
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.map((slot, index) => (
                          <motion.button
                            key={slot.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.03 }}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-center transition-all ${selectedSlot && selectedSlot.id === slot.id
                              ? 'bg-primary-600 text-white'
                              : slot.available
                                ? 'bg-white border border-gray-200 hover:border-primary-300 text-gray-700'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            onClick={() => slot.available && handleSlotSelect(slot)}
                          >
                            <span className="text-sm font-medium">{slot.time}</span>
                            {!slot.available && <p className="text-xs mt-1">Unavailable</p>}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading available time slots...</p>
                      </div>
                    )}
                    
                    {selectedSlot && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex justify-end"
                      >
                        <button 
                          className="btn-primary"
                          onClick={() => setCurrentStep(5)}
                        >
                          Continue
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {/* Step 5: Confirm Appointment */}
            {currentStep === 5 && selectedSlot && (
              <motion.div
                key="step5"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={stepTransition}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Confirm Appointment</h2>
                  <button 
                    onClick={() => setCurrentStep(4)}
                    className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </div>
                
                {bookingSuccess ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h3>
                    <p className="text-gray-600 mb-6">Your appointment has been successfully booked.</p>
                    
                    <div className="p-6 bg-gray-50 rounded-lg max-w-md mx-auto mb-8">
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-500">Appointment ID:</span>
                        <span className="font-medium">APT-{Math.floor(Math.random() * 10000)}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-500">Doctor:</span>
                        <span className="font-medium">{selectedDoctor.name}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-500">Hospital:</span>
                        <span className="font-medium">{selectedHospital.name}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium">{selectedDepartment}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">{formatDate(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium">{selectedSlot.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        className="btn-outline"
                        onClick={handleReset}
                      >
                        Book Another Appointment
                      </button>
                      <button className="btn-primary">
                        View Appointment Details
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    <div className="p-6 bg-gray-50 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-800 mb-4">Appointment Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-800">{selectedDoctor.name}</h4>
                            <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(selectedDoctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-1">{selectedDoctor.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Hospital</h5>
                            <p className="text-gray-800">{selectedHospital.name}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Department</h5>
                            <p className="text-gray-800">{selectedDepartment}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Date</h5>
                            <p className="text-gray-800">{formatDate(selectedDate)}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Time</h5>
                            <p className="text-gray-800">{selectedSlot.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 border border-gray-200 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-800 mb-4">Patient Information</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input type="text" className="input-field" defaultValue="John Doe" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input type="tel" className="input-field" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input type="email" className="input-field" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                          <textarea className="input-field" rows="3" placeholder="Briefly describe your symptoms or reason for appointment"></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input type="checkbox" id="terms" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I confirm that all the information provided is correct and I agree to the <a href="#" className="text-primary-600 hover:text-primary-800">terms and conditions</a>
                      </label>
                    </div>
                    
                    <div className="flex justify-end">
                      <motion.button
                        className="btn-primary flex items-center"
                        onClick={handleBookAppointment}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {bookingSuccess ? (
                          <span>Appointment Confirmed</span>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Confirm Appointment
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Navigation Buttons */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          {/* Previous button */}
          <button
            onClick={handlePrevStep}
            className={`btn-outline flex items-center ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          {/* Next button */}
          {currentStep < 4 && (
            <button
              onClick={handleNextStep}
              className="btn-primary flex items-center ml-auto"
              disabled={!canProceed()}
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default BookAppointment;