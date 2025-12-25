import { useContext } from "react";
import { ROUTES } from "../routes";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to={ROUTES.HOME} />;

  return children;
}
