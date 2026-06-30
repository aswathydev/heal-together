import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Your auth state hook
import { useDispatch, useSelector } from 'react-redux'

export default function RequireAdmin() {
  // const { user, loading } = useAuth();
  const { user, token } = useSelector((state) => state.auth);


  // if (loading) return <div>Loading...</div>;

  // Render sub-routes if user is admin, else redirect to login
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" replace />;
}