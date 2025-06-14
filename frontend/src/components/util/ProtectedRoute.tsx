import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
  user: any;
}

const ProtectedRoute = ({
  element,
  isAuthenticated,
  user,
}: ProtectedRouteProps) => {
  const location = useLocation();

  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(location.pathname);

  // Case 1: Trying to access protected page, but not logged in → redirect to login
  if (!isAuthenticated || !user) {
    if (!isPublicPath) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return element; // Allow access to login/signup
  }

  // Case 2: Logged in and trying to access public path (e.g., /login, /signup) → redirect to home
  if (isAuthenticated && user && isPublicPath) {
    return <Navigate to="/" replace />;
  }

  // Case 3: Logged in and accessing protected route → allow
  return element;
};

export default ProtectedRoute;
