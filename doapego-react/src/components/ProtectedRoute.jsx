import 

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const tipo = localStorage.getItem('tipo');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(tipo)) {
    return <Navigate to="/inicio" replace />; // Ou para uma página de "Não autorizado"
  }

  return <Outlet />;
};