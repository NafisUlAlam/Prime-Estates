import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PageLoading from "./../Components/PageLoading";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // console.log(location);
  // if (location?.pathname.includes("dashboard/")) {
  //   location.pathname = "/";
  // }
  const { user, loading } = useAuth();
  console.log("inside private route");
  if (loading) {
    return <PageLoading></PageLoading>;
  }
  if (user) return children;
  return <Navigate to={"/login"} state={location?.pathname} replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
};

export default PrivateRoute;
