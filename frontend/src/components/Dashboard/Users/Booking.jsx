import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../Navbar";

export default function Booking() {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // <-- Get station ID from URL
  const [station, setStation] = useState(null);
  const [chargingPoints, setChargingPoints] = useState(1);
  const [message, setMessage] = useState("");

  // Fetch the station data by ID
  useEffect(() => {
    const fetchStation = async () => {
      try {
        const res = await API.get(`stations/${id}/`); // endpoint must support GET by ID
        setStation(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStation();
  }, [id]);

  const handleBooking = async () => {
    if (!station) return;
    try {
      await API.post("bookings/", {
        station: station.id,
        charging_points_booked: chargingPoints,
      });
      setMessage("Booking successful!");
    } catch (err) {
      console.error(err);
      setMessage("Booking failed. Try again.");
    }
  };

  if (!station)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 pt-20 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
          {station.name}
        </h2>
        <div className="flex flex-col gap-4 text-white/90">
          <p>
            <span className="font-semibold">Address:</span> {station.address}
          </p>
          <p>
            <span className="font-semibold">Occupied Points:</span>{" "}
            {station.occupied_charging_points} / {station.total_charging_points}
          </p>
          <p>
            <span className="font-semibold">Available Points:</span>{" "}
            {station.total_charging_points - station.occupied_charging_points}
          </p>
          <p>
            <span className="font-semibold">Power:</span> {station.power_kw} kW
          </p>
          <p>
            <span className="font-semibold">Cost:</span> ${station.cost_per_kwh}
            /kWh
          </p>
        </div>

        {/* Booking Section */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:gap-4">
          <input
            type="number"
            min="1"
            max={
              station.total_charging_points - station.occupied_charging_points
            }
            value={chargingPoints}
            onChange={(e) => setChargingPoints(e.target.value)}
            className="p-3 rounded-xl shadow-sm text-black w-32 focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
          />
          <button
            onClick={handleBooking}
            disabled={
              chargingPoints >
              station.total_charging_points - station.occupied_charging_points
            }
            className="mt-2 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl active:scale-95 transition-all duration-300"
          >
            Confirm Booking
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 font-semibold ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
