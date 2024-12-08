import React from 'react'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'


const CaptainLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  

  const submitHandler = (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password,
    };

    const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/captains/login`, captainData);
    response.then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setCaptain(data.captain);
        localStorage.setItem("captain-token", data.token);

        navigate("/captain-home");
      }
    });
    
    setEmail("");
    setPassword("");
  };

  
  return (
    <div className="min-h-screen bg-white p-6 flex justify-between flex-col">
    <h1 className="text-3xl font-bold text-black">
      Drivio<span className="text-zinc-700">.-</span>
    </h1>

    <form onSubmit={(e) => submitHandler(e)} className="space-y-4 mb-[5rem]">

      <div className="space-y-4">
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
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"/>
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
        Log In
      </button>

      <div className="text-center">
        <Link
          to="/captain-signup"
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          <span className="text-black">Join a fleet? </span>Register as a Captain
        </Link>
      </div>

      <div className="flex items-center gap-4 my-6">
        <div className="h-px bg-gray-300 flex-1" />
        <span className="text-gray-500">or</span>
        <div className="h-px bg-gray-300 flex-1" />
      </div>
    </form>
    <div>
      <Link
        to="/login"
        type="button"
        className="w-full bg-[#d5622d] text-white p-4 rounded-lg font-medium hover:bg-[#a85b38] transition-colors flex items-center justify-center gap-2"
      >
        <FiUser />
        Sign in as a User
      </Link>
      <p className="text-gray-500 text-sm mt-8 text-center">
        By continuing, you agree to Drivio's Terms of Service and acknowledge
        that you've read our Privacy Policy
      </p>
    </div>
  </div>
  )
}

export default CaptainLogin