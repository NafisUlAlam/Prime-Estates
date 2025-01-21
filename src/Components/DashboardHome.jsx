import Lottie from "lottie-react";
import space from "../assets/space.json";
const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="">
        <div className="text-center">
          <h1 className="lg:text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-sm mt-1">
            Access all your information at a glance
          </p>
        </div>
      </header>
      <div className="my-8">
        <Lottie animationData={space}></Lottie>
      </div>
    </div>
  );
};

export default DashboardHome;
