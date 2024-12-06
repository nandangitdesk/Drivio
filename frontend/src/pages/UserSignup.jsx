import React from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";


const UserSignup = () => {
  
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const submitHandler = async (e) => {
    e.preventDefault();
   
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };
     
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, newUser);
    
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white p-6 flex justify-between flex-col">
      <h1 className="text-3xl font-bold text-black">
        Drivio<span className="text-zinc-700">.-</span>
      </h1>

      <form onSubmit={submitHandler} className="space-y-4 mb-[5rem]">
        <div className="space-y-4">
          
        <h2 className="text-xl font-semibold text-black">User Information</h2>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pl-10 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Create Account
        </button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <span className="text-black">Already have an account? </span>Login
            here
          </Link>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>
      </form>
      <div>
        <p className="text-gray-500 text-sm mt-4 text-center ">
          By signing up, you agree to Drivio's Terms of Service and Privacy
          Policy. We're committed to protecting your personal information and
          ensuring a safe, enjoyable experience on our platform.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
