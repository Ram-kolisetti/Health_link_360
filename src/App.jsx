import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Auth Components
import AuthPage from './pages/auth/AuthPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Layout Components
import Layout from './components/layout/Layout'

// Patient Portal
import PatientDashboard from './pages/patient/PatientDashboard'
import BookAppointment from './pages/patient/BookAppointment'
import HealthRecords from './pages/patient/HealthRecords'
import EPrescription from './pages/patient/EPrescription'
import PatientNotifications from './pages/patient/PatientNotifications'
import EmergencyQR from './pages/patient/EmergencyQR'

// Doctor Portal
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import PatientSearch from './pages/doctor/PatientSearch'
import PatientHistory from './pages/doctor/PatientHistory'
import LiveChat from './pages/doctor/LiveChat'

// Admin Portal
import AdminRoutes from './routes/AdminRoutes'

// Additional Pages
// import AboutUs from './pages/AboutUs'
// import TermsConditions from './pages/TermsConditions'
// import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound'

// Context
import { AuthProvider } from './context/AuthContext'

function App() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, you would validate the token here
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Auth Routes */}
          <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />} />
          
          {/* Main App Routes with Layout */}
          <Route element={<Layout />}>
            {/* Patient Portal Routes */}
            <Route path="/patient" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/patient/book-appointment" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <BookAppointment />
              </ProtectedRoute>
            } />
            <Route path="/patient/health-records" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <HealthRecords />
              </ProtectedRoute>
            } />
            <Route path="/patient/e-prescription" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <EPrescription />
              </ProtectedRoute>
            } />
            <Route path="/patient/notifications" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientNotifications />
              </ProtectedRoute>
            } />
            <Route path="/patient/emergency-qr" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <EmergencyQR />
              </ProtectedRoute>
            } />

            {/* Doctor Portal Routes */}
            <Route path="/doctor" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patient-search" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PatientSearch />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patient-history/:patientId" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PatientHistory />
              </ProtectedRoute>
            } />
            <Route path="/doctor/live-chat/:patientId" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <LiveChat />
              </ProtectedRoute>
            } />

            {/* Admin Portal Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminRoutes />
              </ProtectedRoute>
            } />

            {/* Additional Pages */}
            {/* <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/contact" element={<ContactUs />} /> */}
            
            {/* Redirect to appropriate dashboard based on role or to auth page if not authenticated */}
            <Route path="/" element={
              isAuthenticated ? 
                <Navigate to="/patient" /> : 
                <Navigate to="/auth" />
            } />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}

export default App