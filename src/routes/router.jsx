import { createBrowserRouter } from "react-router";
import Login from "../components/auth/Login";
import ErrorPage from "../components/errorPage/ErrorPage";
import Dashboard from "../dashboard/components/Dashboard";
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
  {
    path:"/dashboard",
    element: <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>,
    errorElement:<ErrorPage />,
    children:[
      {

      }
    ]
  }
]);