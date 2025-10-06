import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing"; // ✅ your Hero Section page
import "./index.css";

function App() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#F5E6D3]">
      {/* 🔹 Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 bg-transparent px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#D4AF37] hover:scale-105 transition">
          ProMinder
        </Link>
        <div className="flex items-center space-x-6">
          {localStorage.getItem("token") ? (
            <button
              onClick={logout}
              className="bg-[#D4AF37] text-black px-4 py-2 rounded-full font-semibold hover:bg-[#C5A028] transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#F5E6D3] hover:text-[#D4AF37] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-[#F5E6D3] hover:text-[#D4AF37] transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* 🔹 Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
