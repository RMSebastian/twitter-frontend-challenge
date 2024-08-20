import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../../hooks/useToken";

const PrivateRoute = () => {
  //jwt decode
  const { token } = useToken();

  if (!token) {
    return <Navigate to="sign-in" replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
