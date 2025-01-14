import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Main = () => {
  return (
    <div className="w-11/12 mx-auto container">
      {/* nav */}
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>

      {/* footer */}
      <div className="mt-8">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
