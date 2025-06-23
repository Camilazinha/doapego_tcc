//src/components/ProtectedRoute.jsx
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('tipo');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />;
};