// import React from 'react';
// import { AuthProvider } from './context/AuthContext';
// import AppRoutes from './routes/AppRoutes';
// import './App.css'; // Your global styles
// import { Link, useLocation, useNavigate } from 'react-router-dom'

// export default function App() {
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (user && isAuthenticated &&  (user?.role === 'user')) {
//       navigate("/dashboard");
//     }  else {
//       navigate("/provider/dashboard")
//     }
//   }, [user, isAuthenticated, navigate]);

//   return (
//     <AuthProvider>
//       <AppRoutes />
//     </AuthProvider>
//   );
// }


import React, { useEffect } from 'react';
// import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

export default function App() {
  return (
    // <AuthProvider>
      <AppRoutes />
    // </AuthProvider>
  );
}