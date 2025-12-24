import { ROUTES } from "../routes";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to={ROUTES.HOME} />;

  return children;
}
