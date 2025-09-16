import { useState, useEffect, useContext } from "react";
import API from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../Navbar";
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
    <div className="min-h-screen bg-indigo-800 pt-20">
      <Navbar />
      <div className="">
        <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 p-10 flex flex-col items-center animate-fadeIn">
          {/* Main Heading */}
          <h2 className="text-4xl font-extrabold text-white mb-10 tracking-wider drop-shadow-lg animate-slideDown">
            Operating Stations
          </h2>

          {/* Stations List */}
          <ul className="w-full max-w-3xl mb-16 list-decimal list-inside space-y-4">
            {stations.map((s, index) => (
              <li
                key={s.id}
                className="bg-white/90 rounded-2xl p-4 shadow-md border border-white/20 backdrop-blur-md
                   hover:scale-105 hover:shadow-xl hover:backdrop-blur-xl
                   transition-all duration-500 ease-out flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900">
                  {index + 1}. {s.name}
                </span>
                <span className="text-gray-700 font-medium">
                  Occupied:{" "}
                  <span className="font-bold text-indigo-600">
                    {s.occupied_charging_points}
                  </span>
                  /{s.total_charging_points}
                </span>
              </li>
            ))}
          </ul>

          {/* Add Station Form (Row layout) */}
          <div
            className="w-full max-w-5xl bg-white/95 rounded-2xl p-8 shadow-2xl border border-white/20
               backdrop-blur-md hover:shadow-[0_15px_45px_rgba(0,0,0,0.5)]
               transition-all duration-500 ease-in-out animate-slideUp flex flex-wrap gap-6 justify-between"
          >
            <h3 className="w-full text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-wide drop-shadow-lg">
              Add Station
            </h3>

            {/** Form Inputs in Row */}
            {[
              { label: "Name", placeholder: "Enter station name", key: "name" },
              {
                label: "Address",
                placeholder: "Enter station address",
                key: "address",
              },
              {
                label: "Latitude",
                placeholder: "Enter latitude",
                key: "latitude",
              },
              {
                label: "Longitude",
                placeholder: "Enter longitude",
                key: "longitude",
              },
              {
                label: "Total Points",
                placeholder: "Enter total charging points",
                key: "total_charging_points",
              },
              {
                label: "Cost per kWh",
                placeholder: "Enter cost per kWh",
                key: "cost_per_kwh",
              },
              {
                label: "Power (kW)",
                placeholder: "Enter power in kW",
                key: "power_kw",
              },
            ].map((input) => (
              <div key={input.key} className="flex flex-col w-[48%]">
                <label className="text-gray-700 font-semibold mb-1">
                  {input.label}
                </label>
                <input
                  placeholder={input.placeholder}
                  value={formData[input.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [input.key]: e.target.value })
                  }
                  className="border border-gray-300 p-3 rounded-xl shadow-sm focus:border-pink-500 focus:ring-2 
                     focus:ring-pink-400 placeholder-gray-500 transition duration-300 hover:shadow-md"
                />
              </div>
            ))}

            {/* Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                 text-white font-bold py-3 rounded-xl mt-4 shadow-lg hover:shadow-2xl 
                 active:scale-95 transition-all duration-300 tracking-wide w-full"
              onClick={handleCreate}
            >
              Add Station
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
