import { useState, useEffect, useContext } from "react";
import API from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../Navbar";

export default function BookingHistory() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get(`bookings/user/${user.id}/`); // endpoint should return bookings for logged-in user
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 pt-20 w-full overflow-x-hidden">
      <Navbar />
      <div className="max-w-5xl mx-auto p-8 flex flex-col gap-6">
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
          Your Booking History
        </h2>

        {bookings.length === 0 ? (
          <p className="text-white text-xl text-center mt-10">
            No bookings yet
          </p>
        ) : (
          bookings.map((b, index) => (
            <div
              key={b.id}
              className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/20 backdrop-blur-md
                         flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div className="flex flex-col gap-1 text-white/90">
                <p>
                  <span className="font-semibold">Station:</span>{" "}
                  {b.station_name}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {b.station_address}
                </p>
                <p>
                  <span className="font-semibold">Points Booked:</span>{" "}
                  {b.charging_points_booked}
                </p>
                <p>
                  <span className="font-semibold">Cost per kWh:</span> $
                  {b.cost_per_kwh}
                </p>
              </div>
              <p className="text-white font-bold">Booking #{index + 1}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
