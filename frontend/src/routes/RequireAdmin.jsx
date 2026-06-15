import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Your auth state hook

export default function RequireAdmin() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Render sub-routes if user is admin, else redirect to login
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" replace />;
}