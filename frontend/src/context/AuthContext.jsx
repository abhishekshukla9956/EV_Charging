// File: src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (email, password) => {
    // 1️⃣ Get tokens
    const tokenRes = await API.post("accounts/token/", { email, password });
    localStorage.setItem("access_token", tokenRes.data.access);
    localStorage.setItem("refresh_token", tokenRes.data.refresh);

    // 2️⃣ Fetch user info (requires role to be returned from /accounts/me/)
    const meRes = await API.get("accounts/me/", {
      headers: { Authorization: `Bearer ${tokenRes.data.access}` },
    });

    // 3️⃣ Save and return user with role
    setUser(meRes.data);
    return meRes.data; // must include { role: "operator" | "staff" | "user" }
  };

  const registerUser = async (data) => {
    const res = await API.post("accounts/register/", data);
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    setUser(res.data.user);
    return res.data.user; // <- return user for immediate redirect
  };

  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const res = await API.get("accounts/me/");
          setUser(res.data);
        } catch (error) {
          console.error(error);
          logoutUser();
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logoutUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
