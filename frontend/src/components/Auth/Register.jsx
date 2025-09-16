// File: src/components/Auth/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    password: "",
    role: "user",
    latitude: "",
    longitude: "",
  });

  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = await registerUser(formData);

      // Redirect based on role
      if (registeredUser.role === "operator") navigate("/operator");
      else navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <div
      className="flex h-screen justify-center items-center bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 
                relative overflow-hidden"
    >
      {/* 🔥 Animated background glow circles */}
      <div className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse-slow bottom-[-150px] right-[-150px]" />

      {/* ✅ Single combined card for form + image */}
      <div
        className="flex w-[80%] max-w-6xl h-[600px] bg-white/10 backdrop-blur-md border border-white/20 
                  rounded-3xl shadow-2xl overflow-hidden
                  animate-fade-in-up hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500"
      >
        {/* Left: Image  */}
        <div className="w-1/2 h-full relative">
          <img
            src="/images/register.png"
            alt="register"
            className="w-full h-full object-cover transition-transform duration-700 ease-out
                   hover:scale-105"
          />
          {/* subtle dark overlay to blend image with bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        {/* Right: Form */}
        <div className="w-1/2 h-full flex justify-center items-center p-10">
          <form
            className="w-full max-w-md flex flex-col gap-7 
                   animate-slide-in-right"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl font-extrabold text-white text-center tracking-wide drop-shadow-lg">
              Register
            </h2>

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                     p-3 rounded-xl bg-white/20 text-white placeholder-gray-200
                     transition-all duration-300 shadow-sm hover:shadow-md"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="text"
              className="border border-gray-300/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                     p-3 rounded-xl bg-white/20 text-white placeholder-gray-200
                     transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
            />

            <input
              className="border border-gray-300/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                     p-3 rounded-xl bg-white/20 text-white placeholder-gray-200
                     transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <input
              className="border border-gray-300/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                     p-3 rounded-xl bg-white/20 text-white placeholder-gray-200
                     transition-all duration-300 shadow-sm hover:shadow-md"
              type="number"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
            />

            <input
              type="number"
              className="border border-gray-300/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                     p-3 rounded-xl bg-white/20 text-white placeholder-gray-200
                     transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
            />

            <select
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
                     text-gray-900 rounded-xl p-3 font-semibold shadow-sm hover:shadow-md
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="operator">Operator</option>
            </select>

            <button
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                     active:scale-95 text-white font-bold py-3 rounded-xl 
                     shadow-lg hover:shadow-xl transition-transform duration-300 tracking-wide"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
