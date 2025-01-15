import { NavLink } from "react-router-dom";

const AdminMenu = () => {
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
          to="adminprofile"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Admin Profile
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="manageusers"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Manage Users
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="manageproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Manage Properties
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="managereviews"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Manage Reviews
        </NavLink>
      </button>
    </>
  );
  return links;
};

export default AdminMenu;
