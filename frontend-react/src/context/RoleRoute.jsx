import { useContext } from "react";
import { ROUTES } from "../routes";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ role, children }) {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== role) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return children;
}
