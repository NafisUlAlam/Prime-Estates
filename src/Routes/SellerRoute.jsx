import PropTypes from "prop-types";
import useRole from "../hooks/useRole";

import { Navigate } from "react-router-dom";
import PageLoading from "../Components/PageLoading";

const SellerRoute = ({ children }) => {
  console.log("inside seller route private");
  const [role, isLoading] = useRole();
  if (isLoading) return <PageLoading></PageLoading>;
  if (role === "seller") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

SellerRoute.propTypes = {
  children: PropTypes.element,
};

export default SellerRoute;
