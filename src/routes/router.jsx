import { createBrowserRouter } from "react-router";
import Login from "../components/auth/Login";
import ErrorPage from "../components/errorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
]);