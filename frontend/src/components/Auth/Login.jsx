import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password); // return user from context function
      if (user?.role === "operator") navigate("/operator");
      else if (user?.role === "staff") navigate("/staff");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse-slow bottom-[-150px] right-[-150px]" />

      {/* Card */}
      <div
        className="flex w-[80%] max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 
                  rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up"
      >
        {/* ✅ Left: Fixed ratio image */}
        <div className="w-1/2 relative">
          <img
            src="/images/sign.png"
            alt="login"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        {/* ✅ Right: Form */}
        <div className="w-1/2 flex justify-center items-center p-10">
          <form
            className="w-full max-w-md flex flex-col gap-7 animate-slide-in-right"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl font-extrabold text-white text-center">
              Login
            </h2>

            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                     p-3 rounded-xl bg-white/20 text-white placeholder-gray-200
                     transition-all duration-300 shadow-sm hover:shadow-md"
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                     p-3 rounded-xl bg-white/20 text-white placeholder-gray-200
                     transition-all duration-300 shadow-sm hover:shadow-md"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                     active:scale-95 text-white font-bold py-3 rounded-xl 
                     shadow-lg hover:shadow-xl transition-transform duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
