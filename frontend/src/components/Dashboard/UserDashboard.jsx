import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/axios";
import UpdateLocation from "./UpdateLocation";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.latitude && user?.longitude) {
      API.get(
        `stations/?latitude=${user.latitude}&longitude=${user.longitude}`
      ).then((res) => setStations(res.data));
    }
  }, [user]);

  return (
    <div>
      <h2>Nearest Stations</h2>
      <button onClick={() => navigate("/booking")}>Book a Station</button>

      <ul>
        {stations.map((s) => (
          <li key={s.id}>
            {s.name} - Available: {s.available_charging_points} - Cost:{" "}
            {s.cost_per_kwh} - Power: {s.power_kw}kW
          </li>
        ))}
      </ul>
      <UpdateLocation />
    </div>
  );
}
