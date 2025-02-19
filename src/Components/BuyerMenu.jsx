import { NavLink } from "react-router-dom";

const BuyerMenu = () => {
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
          to="buyerprofile"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Profile
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="wishlist"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Wishlist
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="propertybought"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          Properties Bought
        </NavLink>
      </button>
      <button className="secondary-btn">
        <NavLink
          to="myreviews"
          className={({ isActive }) => (isActive ? "text-red-400 " : "")}
        >
          My Reviews
        </NavLink>
      </button>
    </div>
  );
  return links;
};

export default BuyerMenu;
