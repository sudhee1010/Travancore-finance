import { useEffect, useState } from "react";
import { checkAuthStatus } from "../services/api/authApi";

/**
 * Small hook wrapping the admin authentication check.
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = unknown yet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    checkAuthStatus().then((result) => {
      if (mounted) {
        setIsAuthenticated(result);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { isAuthenticated, loading };
}
