import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return accessToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
