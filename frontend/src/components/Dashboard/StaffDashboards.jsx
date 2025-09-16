// File: src/components/Dashboard/StaffDashboard.jsx
import { useState, useEffect } from "react";
import API from "../../api/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function StaffDashboard() {
  const [stations, setStations] = useState([]);

  const fetchStations = async () => {
    try {
      const res = await API.get("stations/staff/list/");
      setStations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStations();
    const interval = setInterval(fetchStations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>All Stations</h2>
      <MapContainer
        center={[stations[0]?.latitude || 0, stations[0]?.longitude || 0]}
        zoom={13}
        style={{ height: "400px", width: "80%", margin: "20px 0" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stations.map((s) => (
          <Marker key={s.id} position={[s.latitude, s.longitude]}>
            <Popup>
              <strong>{s.name}</strong>
              <br />
              Operator ID: {s.operator}
              <br />
              Occupied: {s.occupied_charging_points}/{s.total_charging_points}
              <br />
              Cost: ${s.cost_per_kwh} per kWh
              <br />
              Power: {s.power_kw} kW
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <ul style={{ width: "80%" }}>
        {stations.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> - Occupied: {s.occupied_charging_points}/
            {s.total_charging_points} - Operator ID: {s.operator}
          </li>
        ))}
      </ul>
    </div>
  );
}
