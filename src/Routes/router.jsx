import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Components/Error";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./../Layouts/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "allproperties",
        element: (
          <PrivateRoute>
            <h2>all</h2>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //admin routes
      {
        path: "adminprofile",
        element: <p>admin profile</p>,
      },
      {
        path: "manageusers",
        element: <p>users manage</p>,
      },
      {
        path: "manageproperties",
        element: <p>properties manage</p>,
      },
      {
        path: "managereviews",
        element: <p>reviews manage</p>,
      },

      // buyer routes
      {
        path: "buyerprofile",
        element: <p>my profile</p>,
      },
      {
        path: "wishlist",
        element: <p>wishlist</p>,
      },
      {
        path: "propertybought",
        element: <p>properties bought</p>,
      },
      {
        path: "myreviews",
        element: <p>reviews my</p>,
      },

      //seller routes
      {
        path: "sellerprofile",
        element: <p>my profile</p>,
      },
      {
        path: "addproperty",
        element: <p>add property</p>,
      },
      {
        path: "myaddedproperties",
        element: <p>my added properties</p>,
      },
      {
        path: "mysoldproperties",
        element: <p>my sold properties</p>,
      },
      {
        path: "requestedproperties",
        element: <p>requested properties</p>,
      },
    ],
  },

  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "signup",
    element: <SignUp></SignUp>,
  },
]);

export default router;
