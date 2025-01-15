import { NavLink } from "react-router-dom";

const SellerMenu = () => {
  const links = (
    <>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Home
        </NavLink>
      </button>

      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="sellerprofile"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Profile
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="addproperty"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Add Property
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="myaddedproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Added Properties
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="mysoldproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Sold Properties
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="requestedproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Requested Properties
        </NavLink>
      </button>
    </>
  );
  return links;
};

export default SellerMenu;
