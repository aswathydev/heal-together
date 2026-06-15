// import { Navigate, Outlet, useLocation } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'

// export default function RequireAdmin() {
//   const { user } = useAuth()
//   const location = useLocation()

//   if (!user || user.role !== 'admin') {
//     return (
//       <Navigate
//         to="/admin/login"
//         replace
//         state={{ from: location.pathname + location.search }}
//       />
//     )
//   }

//   return <Outlet />
// }


import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireAdmin() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ Wait until auth is ready
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // ✅ Authorized
  return <Outlet />;
}