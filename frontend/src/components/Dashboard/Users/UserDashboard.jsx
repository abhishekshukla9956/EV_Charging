import { useState, useEffect, useContext } from "react";
import API from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const fetchStations = async () => {
    const res = await API.get("stations/");
    setStations(res.data);
  };

  useEffect(() => {
    fetchStations();
    const interval = setInterval(fetchStations, 5000);
    return () => clearInterval(interval);
  }, [userLocation]);

  const handleBookStation = (stationId) => {
    navigate(`/booking/${stationId}`);
  };

  const handleLocationUpdate = () => {
    if (!userLocation.latitude || !userLocation.longitude)
      return alert("Enter valid location");
    alert("Location updated!");
    fetchStations();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 pt-20 w-full overflow-x-hidden">
      <Navbar />

      {/* Main Heading */}
      <h2 className="text-4xl font-extrabold text-white mb-10 text-center tracking-wider drop-shadow-lg animate-slideDown">
        Book a Charging Station
      </h2>

      {/* Stations List */}
      <ul className="w-full max-w-5xl mx-auto mb-16 space-y-4">
        {stations.map((s, index) => (
          <li
            key={s.id}
            className="bg-white/10 rounded-2xl p-4 shadow-lg border border-white/20 backdrop-blur-md
               hover:scale-105 hover:shadow-2xl hover:backdrop-blur-xl transition-all duration-500 flex justify-between items-center"
          >
            <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
              <span className="font-semibold text-white text-lg md:w-1/5">
                {index + 1}. {s.name}
              </span>
              <span className="text-white/80 md:w-1/5">
                Occupied:{" "}
                <span className="font-bold text-indigo-300">
                  {s.occupied_charging_points}
                </span>{" "}
                / {s.total_charging_points}
              </span>
              <span className="text-white/80 md:w-1/5">
                Power: {s.power_kw} kW
              </span>
              <span className="text-white/80 md:w-1/5">
                Cost: ${s.cost_per_kwh}/kWh
              </span>
            </div>
            <button
              className="ml-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                 text-white font-bold py-2 px-4 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 active:scale-95"
              onClick={() => handleBookStation(s.id)}
              disabled={s.occupied_charging_points >= s.total_charging_points}
            >
              {s.occupied_charging_points >= s.total_charging_points
                ? "Full"
                : "Book Station"}
            </button>
          </li>
        ))}
      </ul>

      {/* Update Location */}
      <div className="w-full max-w-lg mx-auto bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-lg mb-20 flex flex-col gap-4">
        <h3 className="text-3xl font-extrabold text-white text-center drop-shadow-lg mb-4">
          Update Your Location
        </h3>
        <input
          type="number"
          placeholder="Latitude"
          value={userLocation.latitude}
          onChange={(e) =>
            setUserLocation({
              ...userLocation,
              latitude: parseFloat(e.target.value),
            })
          }
          className="border border-white/30 p-3 rounded-xl shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-400 placeholder-white/70 bg-white/10 text-white transition duration-300 hover:shadow-md"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={userLocation.longitude}
          onChange={(e) =>
            setUserLocation({
              ...userLocation,
              longitude: parseFloat(e.target.value),
            })
          }
          className="border border-white/30 p-3 rounded-xl shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-400 placeholder-white/70 bg-white/10 text-white transition duration-300 hover:shadow-md"
        />
        <button
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
             text-white font-bold py-3 rounded-xl shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 mt-2"
          onClick={handleLocationUpdate}
        >
          Update Location
        </button>
      </div>
    </div>
  );
}
