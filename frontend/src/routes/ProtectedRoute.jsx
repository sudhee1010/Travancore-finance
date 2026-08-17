import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthStatus } from "../services/api/authApi";
import Loading from "../components/Loading/Loading";

/**
 * Route guard for admin-only pages.
 *
 * NOTE: This is a client-side convenience only. The real authorization
 * boundary is enforced server-side (HTTP-only cookie + auth middleware
 * on every /api/admin/* route). Hiding the route here does not grant
 * any security on its own.
 */
function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | authed | unauthed

  useEffect(() => {
    let isMounted = true;

    checkAuthStatus()
      .then((isAuthed) => {
        if (isMounted) setStatus(isAuthed ? "authed" : "unauthed");
      })
      .catch(() => {
        if (isMounted) setStatus("unauthed");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "checking") return <Loading />;
  if (status === "unauthed") return <Navigate to="/admin" replace />;

  return children;
}

export default ProtectedRoute;
