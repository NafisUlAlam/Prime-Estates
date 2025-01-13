import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>this is main route</p>,
    errorElement: <p>Error route</p>,
    children: [
      {
        path: "/",
      },
    ],
  },
]);

export default router;
