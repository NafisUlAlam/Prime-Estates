import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PageLoading from "./../Components/PageLoading";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  //const location = useLocation();
  //console.log("inside private route", location.pathname);
  // if (location?.pathname.includes("dashboard/")) {
  //   location.pathname = "/";
  // }
  const { user, loading, token } = useAuth();
  //console.log("inside private route");
  if (loading) {
    return <PageLoading></PageLoading>;
  }
  if (user) {
    //console.log(token);
    if (!token) return <PageLoading></PageLoading>;
    return children;
  }
  return <Navigate to={"/login"} state={location?.pathname} replace></Navigate>;
  //return <Navigate to={"/login"} replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
};

export default PrivateRoute;
