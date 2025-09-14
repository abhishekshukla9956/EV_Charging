import { useState, useEffect, useContext } from "react";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function OperatorDashboard() {
  const { user } = useContext(AuthContext);
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    total_charging_points: 0,
    cost_per_kwh: 0,
    power_kw: 0,
  });

  const fetchStations = async () => {
    const res = await API.get("stations/");
    setStations(res.data.filter((s) => s.operator === user.id));
  };

  useEffect(() => {
    fetchStations();
    const interval = setInterval(fetchStations, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("stations/operator/create/", formData);
    setFormData({
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      total_charging_points: 0,
      cost_per_kwh: 0,
      power_kw: 0,
    });
    fetchStations();
  };

  return (
    <div>
      <h2>Your Stations</h2>
      <ul>
        {stations.map((s) => (
          <li key={s.id}>
            {s.name} - Occupied: {s.occupied_charging_points}/
            {s.total_charging_points}
          </li>
        ))}
      </ul>

      <h3>Add Station</h3>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <input
          placeholder="Latitude"
          value={formData.latitude}
          onChange={(e) =>
            setFormData({ ...formData, latitude: e.target.value })
          }
        />
        <input
          placeholder="Longitude"
          value={formData.longitude}
          onChange={(e) =>
            setFormData({ ...formData, longitude: e.target.value })
          }
        />
        <input
          placeholder="Total Points"
          value={formData.total_charging_points}
          onChange={(e) =>
            setFormData({ ...formData, total_charging_points: e.target.value })
          }
        />
        <input
          placeholder="Cost per kWh"
          value={formData.cost_per_kwh}
          onChange={(e) =>
            setFormData({ ...formData, cost_per_kwh: e.target.value })
          }
        />
        <input
          placeholder="Power kW"
          value={formData.power_kw}
          onChange={(e) =>
            setFormData({ ...formData, power_kw: e.target.value })
          }
        />
        <button type="submit">Add Station</button>
      </form>
    </div>
  );
}
