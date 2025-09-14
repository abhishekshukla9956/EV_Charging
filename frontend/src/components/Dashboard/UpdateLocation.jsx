import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/axios";

export default function UpdateLocation() {
  const { user, setUser } = useContext(AuthContext);
  const [latitude, setLatitude] = useState(user?.latitude || "");
  const [longitude, setLongitude] = useState(user?.longitude || "");

  const handleUpdate = async () => {
    try {
      const res = await API.patch("accounts/me/location/", {
        latitude,
        longitude,
      });
      setUser((prev) => ({
        ...prev,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      }));
      alert("Location updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update location.");
    }
  };

  return (
    <div>
      <h3>Update Your Location</h3>
      <input
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Location</button>
    </div>
  );
}
