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
  const { registerUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(formData);
    if (user?.role === "operator") navigate("/operator");
    else navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        placeholder="Full Name"
        value={formData.full_name}
        onChange={(e) =>
          setFormData({ ...formData, full_name: e.target.value })
        }
      />
      <input
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        placeholder="Latitude"
        value={formData.latitude}
        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
      />
      <input
        placeholder="Longitude"
        value={formData.longitude}
        onChange={(e) =>
          setFormData({ ...formData, longitude: e.target.value })
        }
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="operator">Operator</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
