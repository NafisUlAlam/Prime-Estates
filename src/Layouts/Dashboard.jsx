import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import useRole from "../hooks/useRole";
import PageLoading from "../Components/PageLoading";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, isLoading] = useRole();
  if (isLoading) return <PageLoading></PageLoading>;
  //console.log(role);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        role={role}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 bg-base-100 p-4">
        {/* Mobile Menu Button */}

        <div className="md:hidden flex justify-between items-center">
          <h2></h2>
          <h1 className="font-bold">Dashboard</h1>
          <button
            className="btn px-4 py-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
