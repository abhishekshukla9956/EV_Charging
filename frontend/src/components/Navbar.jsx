// src/components/Navbar.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate slide-in from top
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) return null; // hide navbar if not logged in

  const menuItems =
    user.role === "operator"
      ? [
          { name: "My Stations", path: "/operator/stations" },
          { name: "Bookings", path: "/operator/bookings" },
        ]
      : [
          { name: "My Dashboard", path: "/dashboard" },
          { name: "Bookings", path: "/user/bookings" },
        ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg 
                  px-8 py-4 flex justify-between items-center transform transition-all duration-700 
                  ${show ? "translate-y-0" : "-translate-y-24"}`}
    >
      {/* Left: User Info */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6">
        <div className="text-gray-800 font-bold text-lg">
          {user.role === "operator"
            ? `Operator: ${user.full_name} | Station: ${
                user.station_name || "-"
              }`
            : `User: ${user.full_name}`}
        </div>

        {/* Menu Items */}
        <div className="flex space-x-4 mt-1 sm:mt-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md 
                   transition-all duration-300 hover:shadow-lg active:scale-95"
      >
        Logout
      </button>
    </nav>
  );
}
