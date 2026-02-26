import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;

  return user ? children : <Navigate to="/" replace />;
}