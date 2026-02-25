import { createBrowserRouter } from "react-router";
import Login from "../components/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <div>Hello World</div>,
   
  },
]);