import { ROUTES } from "../routes";

function RoleRoute({ role, children }) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return children;
}
