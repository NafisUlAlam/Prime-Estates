import PropTypes from "prop-types";

import { FaX } from "react-icons/fa6";
import AdminMenu from "./AdminMenu";
import BuyerMenu from "./BuyerMenu";
import SellerMenu from "./SellerMenu";
import useAuth from "./../hooks/useAuth";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, onClose, role }) => {
  //console.log("role", role);
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        //console.log("logged out");
        toast.success("You have logged out successfully", {
          position: "top-center",
        });
        //console.log("logged out");
      })
      .catch((err) => {
        toast.error(`there was an error : ${err}`, {
          position: "top-center",
        });
      });
  };
  return (
    <div
      className={`fixed md:static z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 bg-base-200 min-h-screen w-1/4  flex flex-col shadow-lg border-r-2`}
    >
      {/* Header for Mobile */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <button className="btn bg-base-300  px-4 py-2" onClick={onClose}>
          <FaX></FaX>
        </button>
      </div>

      {/* Menu Items */}
      <ul className="menu flex-1 p-4">
        {/* admin menu */}
        {/* buyer menu */}
        {/* seller menu */}
        {role === "admin" && <AdminMenu></AdminMenu>}
        {role === "buyer" && <BuyerMenu></BuyerMenu>}
        {role === "seller" && <SellerMenu></SellerMenu>}
        <div className="divider mt-20"></div>
        <button
          className=" btn border-b border-b-blue-200"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  role: PropTypes.string,
};

export default Sidebar;
