import PropTypes from "prop-types";

import { FaX } from "react-icons/fa6";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed md:static z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 bg-base-200 h-full w-1/4  flex flex-col shadow-lg`}
    >
      {/* Header for Mobile */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <button className="btn " onClick={onClose}>
          <FaX></FaX>
        </button>
      </div>

      {/* Menu Items */}
      <ul className="menu flex-1 p-4">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#profile">Profile</a>
        </li>
        <li>
          <a href="#settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
