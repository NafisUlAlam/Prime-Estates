import { Link, NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Theme from "./Theme";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  //console.log(location);
  //console.log(user?.photoURL);

  //navbar links
  const links = (
    <>
      <button className="btn">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Home
        </NavLink>
      </button>

      <button className="btn">
        <NavLink
          to="/allproperties"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          All Properties
        </NavLink>
      </button>

      {loading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : !user ? (
        <button className="btn">
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "text-red-400 " : "")}
          >
            Register
          </NavLink>
        </button>
      ) : (
        <>
          <button className="btn">
            <NavLink
              to="/recommendationsforme"
              className={({ isActive }) => (isActive ? "text-red-400" : "")}
            >
              Recommended For Me
            </NavLink>
          </button>
          <button className="btn">
            <NavLink
              to="/myqueries"
              className={({ isActive }) => (isActive ? "text-red-400" : "")}
            >
              My Queries
            </NavLink>
          </button>
          <button className="btn">
            <NavLink
              to="/myrecommendations"
              className={({ isActive }) => (isActive ? "text-red-400" : "")}
            >
              My Recommendations
            </NavLink>
          </button>
        </>
      )}
    </>
  );

  //logout button handled
  const handleLogOut = () => {
    logOut()
      .then(() => {
        //console.log("logged out");
        toast.success("You have logged out successfully", {
          position: "top-center",
        });
        //console.log("logged out");
        navigate("/");
      })
      .catch((err) => {
        toast.error(`there was an error : ${err}`, {
          position: "top-center",
        });
      });
  };

  return (
    <div className="navbar bg-blue-100/60 sticky top-0 z-10 backdrop-blur-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className=" font-bold text-base lg:text-2xl  gradient-text"
        >
          Suggestify
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{links}</ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : user ? (
          <div className="flex items-center gap-2 ">
            <div className="group relative">
              <img
                src={user.photoURL}
                className="w-12 h-12 object-contain rounded-full"
                alt=""
              />
              <span className="absolute top-[100%] left-[50%] transform -translate-x-1/2 bg-blue-200 text-black text-sm font-medium px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {user.displayName} <br />
              </span>
            </div>
            <button onClick={handleLogOut} className="btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-red-400 btn" : "btn"
              }
            >
              Login
            </NavLink>
          </div>
        )}
        <div className="ml-4">
          <Theme></Theme>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
