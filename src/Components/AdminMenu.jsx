import { NavLink } from "react-router-dom";

const AdminMenu = () => {
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
          to="adminhome"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Stats
        </NavLink>
      </button>

      <button className="secondary-btn">
        <NavLink
          to="adminprofile"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Admin Profile
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="manageusers"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Manage Users
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="manageproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Manage Properties
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="managereviews"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Manage Reviews
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="advertiseproperty"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Advertise Properties
        </NavLink>
      </button>
    </div>
  );
  return links;
};

export default AdminMenu;
