import { createBrowserRouter } from "react-router";
import Login from "../components/auth/Login";
import ErrorPage from "../components/errorPage/ErrorPage";
import Dashboard from "../dashboard/components/Dashboard";
import ProtectedRoute from './ProtectedRoute';
import Tasks from "../dashboard/components/sidebarLinks/Tasks";
import CalendarPage from "../dashboard/components/sidebarLinks/CalenderPage";
import Analytics from "../dashboard/components/sidebarLinks/Analytics";
import Team from "../dashboard/components/sidebarLinks/Team";
import ProductDetails from "../dashboard/components/sidebarLinks/ProductDetails";
import UserDetails from "../dashboard/components/sidebarLinks/UserDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "tasks",
        element: <ProtectedRoute><Tasks /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "tasks/:id",
        element: <ProtectedRoute><ProductDetails /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "calendar",
        element: <ProtectedRoute><CalendarPage /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "analytics",
        element: <ProtectedRoute><Analytics /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "team",
        element: <ProtectedRoute><Team /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {

        path: "team/:id",
        element: <ProtectedRoute><UserDetails /></ProtectedRoute>,
        errorElement: <ErrorPage />

      }
    ]
  }
]);