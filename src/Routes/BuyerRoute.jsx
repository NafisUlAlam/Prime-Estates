import { Navigate } from "react-router-dom";
import PageLoading from "../Components/PageLoading";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";

const BuyerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  console.log("inside buyer route private");
  if (isLoading) return <PageLoading></PageLoading>;
  if (role === "buyer") return children;
  return <Navigate to="/dashboard" replace="true" />;
};
BuyerRoute.propTypes = {
  children: PropTypes.element,
};
export default BuyerRoute;
