import { NavLink } from "react-router-dom";

const BuyerMenu = () => {
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
          to="buyerprofile"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Profile
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="wishlist"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Wishlist
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="propertybought"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Properties Bought
        </NavLink>
      </button>
      <button className="btn border-b border-b-blue-200">
        <NavLink
          to="myreviews"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Reviews
        </NavLink>
      </button>
    </>
  );
  return links;
};

export default BuyerMenu;
