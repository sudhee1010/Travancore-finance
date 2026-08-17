import apiClient from "./client";

/**
 * Logs the admin in. On success the backend sets an HTTP-only,
 * secure, SameSite auth cookie — no token is handled or stored here.
 */
export async function login(password) {
  const { data } = await apiClient.post("/auth/login", { password });
  return data;
}

export async function logout() {
  const { data } = await apiClient.post("/auth/logout");
  return data;
}

/**
 * Checks whether the current session is authenticated by calling a
 * protected endpoint. Returns a boolean instead of throwing, so
 * callers (e.g. ProtectedRoute) can branch on it directly.
 */
export async function checkAuthStatus() {
  try {
    await apiClient.get("/admin/enquiries");
    return true;
  } catch (err) {
    return false;
  }
}
