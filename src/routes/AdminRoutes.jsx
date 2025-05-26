import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AppointmentManagement from '../pages/admin/AppointmentManagement';
import PatientManagement from '../pages/admin/PatientManagement';
import DoctorManagement from '../pages/admin/DoctorManagement';
import ResourceManagement from '../pages/admin/ResourceManagement';
import FinancialManagement from '../pages/admin/FinancialManagement';

const AdminRoutes = () => {
  const { currentUser } = useAuth();

  // Redirect to login if not authenticated or not an admin
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/appointments" element={<AppointmentManagement />} />
        <Route path="/patients" element={<PatientManagement />} />
        <Route path="/doctors" element={<DoctorManagement />} />
        <Route path="/resources" element={<ResourceManagement />} />
        <Route path="/finances" element={<FinancialManagement />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes; 