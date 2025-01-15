import PropTypes from "prop-types";
import useRole from "../hooks/useRole";

import { Navigate } from "react-router-dom";
import PageLoading from "../Components/PageLoading";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  console.log("inside admin route private");
  if (isLoading) return <PageLoading></PageLoading>;
  if (role === "admin") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

AdminRoute.propTypes = {
  children: PropTypes.element,
};

export default AdminRoute;
