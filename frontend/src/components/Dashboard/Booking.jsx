import { useState, useEffect, useContext } from "react";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function Booking() {
  const { user } = useContext(AuthContext);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [chargingPoints, setChargingPoints] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.latitude && user?.longitude) {
      API.get(`stations/?latitude=${user.latitude}&longitude=${user.longitude}`)
        .then((res) => setStations(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleBooking = async () => {
    if (!selectedStation) return setMessage("Please select a station");
    try {
      await API.post("bookings/", {
        station: selectedStation.id,
        charging_points_booked: chargingPoints,
      });
      setMessage("Booking successful!");
      // refresh stations to update available points
      const res = await API.get(
        `stations/?latitude=${user.latitude}&longitude=${user.longitude}`
      );
      setStations(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Booking failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Book Charging Station</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {stations.map((station) => (
          <div
            key={station.id}
            onClick={() => setSelectedStation(station)}
            style={{
              border:
                selectedStation?.id === station.id
                  ? "2px solid #4caf50"
                  : "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              cursor: "pointer",
              width: "calc(50% - 15px)",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{station.name}</h3>
            <p>{station.address}</p>
            <p>Available Points: {station.available_charging_points}</p>
            <p>Cost: {station.cost_per_kwh} / kWh</p>
            <p>Power: {station.power_kw} kW</p>
          </div>
        ))}
      </div>

      {selectedStation && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <h3>Book: {selectedStation.name}</h3>
          <input
            type="number"
            min="1"
            max={selectedStation.available_charging_points}
            value={chargingPoints}
            onChange={(e) => setChargingPoints(e.target.value)}
            style={{ padding: "8px", width: "80px", marginRight: "10px" }}
          />
          <button
            onClick={handleBooking}
            style={{
              padding: "8px 15px",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Confirm Booking
          </button>
          {message && (
            <p
              style={{
                marginTop: "10px",
                color: message.includes("success") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
