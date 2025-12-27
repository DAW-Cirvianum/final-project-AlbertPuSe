import { useContext } from "react";
import { ROUTES } from "../routes";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to={ROUTES.HOME} />;

  return <Outlet/>;
}
