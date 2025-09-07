import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { toast } from 'react-toastify';
import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import Loading from '../component/Loading';

const Registration = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true });
      getCurrentUser();
      toast.success("Registration Successful");
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
    setLoading(false);
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName, email } = response.user;
      const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name: displayName, email }, { withCredentials: true });
      getCurrentUser();
      toast.success("Registration Successful");
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Google Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] text-white p-4">
      {/* Header */}
      <div className="w-full max-w-[600px] flex items-center gap-3 cursor-pointer mb-6" onClick={() => navigate("/")}>
        <img src={Logo} alt="Logo" className="w-10" />
        <h1 className="text-2xl font-bold">OneCart</h1>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold">Create Your Account</h2>
        <p className="text-gray-400 mt-2">Welcome to OneCart, place your order now</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-[600px] bg-[#00000025] backdrop-blur-2xl border border-[#96969635] rounded-xl shadow-xl p-8">
        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          
          {/* Google Signup */}
          <button
            type="button"
            onClick={googleSignup}
            className="flex items-center justify-center gap-3 py-3 rounded-lg bg-[#42656cae] hover:bg-[#42656c] transition duration-300"
          >
            <img src={google} alt="Google" className="w-5" />
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400">
            <hr className="flex-1 border-gray-600" />
            <span>OR</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:border-[#6060f5] focus:ring focus:ring-[#6060f520] outline-none transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:border-[#6060f5] focus:ring focus:ring-[#6060f520] outline-none transition"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:border-[#6060f5] focus:ring focus:ring-[#6060f520] outline-none transition"
            />
            {showPassword ? (
              <IoEye className="absolute right-3 top-3 text-gray-300 cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <IoEyeOutline className="absolute right-3 top-3 text-gray-300 cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#6060f5] rounded-lg font-semibold hover:bg-[#5050e0] transition duration-300 flex justify-center items-center"
          >
            {loading ? <Loading /> : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-2">
            Already have an account?{" "}
            <span className="text-[#5555f6cf] font-semibold cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
