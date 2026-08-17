
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";

import AdminLogin from "../admin/AdminLogin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

/**
 * Central route definitions for the public site and the admin panel.
 * Public routes are wrapped in MainLayout (Navbar + Footer).
 * The admin panel intentionally does NOT use MainLayout so it stays
 * outside the public navigation.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin panel (not part of public navigation) */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
