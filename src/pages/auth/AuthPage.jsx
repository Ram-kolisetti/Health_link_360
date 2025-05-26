import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ParticleBackground from './ParticleBackground';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [selectedRole, setSelectedRole] = useState('patient');
  const { error } = useAuth();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: 'beforeChildren',
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
  
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 p-4 relative overflow-hidden">
      {/* Animated background */}
      <ParticleBackground />
      
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-600 font-bold text-2xl shadow-lg">
              HL
            </div>
            <span className="text-3xl font-display font-semibold text-white">
              HealthLink360
            </span>
          </div>
        </motion.div>
        
        {/* Auth Card */}
        <motion.div 
          className="bg-white/80 backdrop-blur-glass rounded-xl shadow-glass overflow-hidden"
          variants={itemVariants}
        >
          {/* Role Selector */}
          <motion.div className="p-4 bg-gray-50/80">
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">Select Your Role</h2>
            <div className="grid grid-cols-3 gap-3">
              <RoleButton 
                role="patient"
                label="Patient"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>}
                isSelected={selectedRole === 'patient'}
                onClick={() => setSelectedRole('patient')}
              />
              <RoleButton 
                role="doctor"
                label="Doctor"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>}
                isSelected={selectedRole === 'doctor'}
                onClick={() => setSelectedRole('doctor')}
              />
              <RoleButton 
                role="admin"
                label="Admin"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>}
                isSelected={selectedRole === 'admin'}
                onClick={() => setSelectedRole('admin')}
              />
            </div>
          </motion.div>
          
          {/* Tab Switcher */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${activeTab === 'login' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${activeTab === 'register' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          
          {/* Form Container with 3D Flip Animation */}
          <div className="p-6 perspective">
            <div className="relative preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'login' ? (
                  <motion.div
                    key="login"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <LoginForm role={selectedRole} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <RegisterForm role={selectedRole} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Error Message */}
            {error && (
              <motion.div 
                className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.p 
          className="mt-6 text-center text-white/80 text-sm"
          variants={itemVariants}
        >
          By signing in, you agree to our <a href="/terms" className="underline hover:text-white">Terms & Conditions</a>
        </motion.p>
      </motion.div>
    </div>
  );
};

// Role selection button component
const RoleButton = ({ role, label, icon, isSelected, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${isSelected 
        ? 'bg-primary-100 text-primary-700 border-2 border-primary-500' 
        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'}`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isSelected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};

export default AuthPage;