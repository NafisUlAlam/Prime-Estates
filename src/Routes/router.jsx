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
import ManageUsers from "../Components/ManageUsers";
import ManageProperties from "../Components/ManageProperties";
import AllProperties from "../Components/AllProperties";
import PropertyDetails from "../Components/PropertyDetails";
import MyReviewsPage from "../Components/MyReviewsPage";
import MyWishlistsPage from "../Components/MyWishlistsPage";

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
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "propertyDetails/:id",
        element: <PropertyDetails></PropertyDetails>,
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
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageproperties",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
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
            <MyWishlistsPage></MyWishlistsPage>
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
            <MyReviewsPage />
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
