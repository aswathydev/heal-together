import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RedirectUser() {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return user?.role === "user"
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/provider/dashboard" replace />;
}