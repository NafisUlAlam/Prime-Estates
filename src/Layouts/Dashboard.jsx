import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { FaBurger } from "react-icons/fa6";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 bg-base-100 p-4">
        {/* Mobile Menu Button */}

        <div className="md:hidden flex justify-between items-center">
          <h2></h2>
          <h1 className="font-bold">Dashboard</h1>
          <button className="btn " onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBurger></FaBurger>
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
