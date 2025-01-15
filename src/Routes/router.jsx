import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Components/Error";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./../Layouts/Dashboard";
import Profile from "../Components/Profile";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import BuyerRoute from "./BuyerRoute";

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
      {
        path: "",
        element: <p>this is dashboard</p>,
      },
      //admin routes
      {
        path: "adminprofile",
        element: (
          <AdminRoute>
            <Profile></Profile>
          </AdminRoute>
        ),
      },
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <p>users manage</p>
          </AdminRoute>
        ),
      },
      {
        path: "manageproperties",
        element: (
          <AdminRoute>
            <p>properties manage</p>
          </AdminRoute>
        ),
      },
      {
        path: "managereviews",
        element: (
          <AdminRoute>
            <p>reviews manage</p>
          </AdminRoute>
        ),
      },

      // buyer routes
      {
        path: "buyerprofile",
        element: (
          <BuyerRoute>
            <Profile></Profile>
          </BuyerRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <BuyerRoute>
            <p>wishlist</p>
          </BuyerRoute>
        ),
      },
      {
        path: "propertybought",
        element: (
          <BuyerRoute>
            <p>properties bought</p>
          </BuyerRoute>
        ),
      },
      {
        path: "myreviews",
        element: (
          <BuyerRoute>
            <p>reviews my</p>
          </BuyerRoute>
        ),
      },

      //seller routes
      {
        path: "sellerprofile",
        element: (
          <SellerRoute>
            <Profile></Profile>
          </SellerRoute>
        ),
      },
      {
        path: "addproperty",
        element: (
          <SellerRoute>
            <p>add property</p>
          </SellerRoute>
        ),
      },
      {
        path: "myaddedproperties",
        element: (
          <SellerRoute>
            <p>my added properties</p>
          </SellerRoute>
        ),
      },
      {
        path: "mysoldproperties",
        element: (
          <SellerRoute>
            <p>my sold properties</p>
          </SellerRoute>
        ),
      },
      {
        path: "requestedproperties",
        element: (
          <SellerRoute>
            <p>requested properties</p>
          </SellerRoute>
        ),
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
