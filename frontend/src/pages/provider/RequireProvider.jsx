import { Navigate, Outlet, useLocation } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'

export default function RequireProvider() {
  // const { user } = useAuth()
    const { user } = useSelector((state) => state.auth);
  
  // const location = useLocation()

  if (!user || (user.role !== 'provider')) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  return <Outlet />
}
