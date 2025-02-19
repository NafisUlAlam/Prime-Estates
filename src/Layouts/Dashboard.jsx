import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import useRole from "../hooks/useRole";
import PageLoading from "../Components/PageLoading";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Dashboard = () => {
  useDocumentTitle(`Dashboard|PrimeEstates`);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //console.log("setting role in dashboard");
  //console.log("token", localStorage.getItem("access-token"));

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
      <div className="flex-1 lg:ml-[250px] bg-secondary p-4">
        {/* Mobile Menu Button */}

        <div className="lg:hidden flex justify-end items-center">
          <button
            className="primary-btn px-4 py-2"
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
