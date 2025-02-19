import { NavLink } from "react-router-dom";

const SellerMenu = () => {
  const links = (
    <div className="space-y-4">
      <button className="secondary-btn">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Home
        </NavLink>
      </button>

      <button className="secondary-btn">
        <NavLink
          to="sellerprofile"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Profile
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="addproperty"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Add Property
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="myaddedproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Added Properties
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="mysoldproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Sold Properties
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="requestedproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Requested Properties
        </NavLink>
      </button>
    </div>
  );
  return links;
};

export default SellerMenu;
