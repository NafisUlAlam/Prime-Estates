import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      {/* nav */}
      <Outlet></Outlet>
      {/* footer */}
    </div>
  );
};

export default Main;
