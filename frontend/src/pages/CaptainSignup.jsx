import React, { useState, useContext } from "react";
import { FiMail, FiLock, FiUser, FiTruck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("car");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("captain-token", data.token);
      navigate("/captain-home");
    }

   
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("car");

    
  };

  return (
    <div className="min-h-screen bg-white p-6 flex justify-between flex-col">
      <h1 className="text-3xl font-bold text-black">
        Drivio<span className="text-zinc-700">.-</span>
      </h1>

      <form onSubmit={submitHandler} className="space-y-4  ">
        <div className="space-y-4">
          {/* User Information */}
          <h2 className="text-xl font-semibold text-black">Captain Information</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full p-4 pl-10 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div className="relative flex-1">
              <FiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full p-4 pl-10 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>
          <div className="relative">
            <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 pl-10 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 pl-10 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-black">Vehicle Information</h2>
             {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle Color"
              className="w-full p-4 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Vehicle Plate"
              className="w-full p-4 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle Capacity"
              className="w-full p-4 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="relative">
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full p-4 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="van">Van</option>
            </select>
          </div>
        </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Create Captain Account
        </button>

        <div className="text-center">
          <Link
            to="/captain-login"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <span className="text-black">Already have an account? </span>Login
            here
          </Link>
        </div>
      </form>

      <div>
        <p className="text-gray-500 text-sm mt-4 text-center">
          By signing up, you agree to Drivio's Terms of Service and Privacy
          Policy. We're committed to protecting your personal information and
          ensuring a safe, enjoyable experience on our platform.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
