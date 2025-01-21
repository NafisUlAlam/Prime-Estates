import { Navigate } from "react-router-dom";
import PageLoading from "../Components/PageLoading";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";

const BuyerRoute = ({ children }) => {
  console.log("inside buyer route private");
  const [role, isLoading] = useRole();
  if (isLoading) return <PageLoading></PageLoading>;
  if (role === "buyer") return children;
  return <Navigate to="/dashboard" replace="true" />;
};
BuyerRoute.propTypes = {
  children: PropTypes.element,
};
export default BuyerRoute;
