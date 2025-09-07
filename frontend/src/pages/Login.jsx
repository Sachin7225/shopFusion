import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import { auth, provider } from '../../utils/Firebase';
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + '/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Login Failed");
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] flex flex-col items-center justify-start text-white">
      
      {/* Header */}
      <div className="w-full h-20 flex items-center px-8 gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={Logo} alt="Logo" className="w-10"/>
        <h1 className="text-2xl font-bold">OneCart</h1>
      </div>

      {/* Welcome Text */}
      <div className="flex flex-col items-center my-6 text-center">
        <h2 className="text-3xl font-semibold">Login</h2>
        <p className="text-gray-300 mt-2">Welcome back to OneCart, place your order easily!</p>
      </div>

      {/* Login Form Container */}
      <div className="w-[90%] max-w-lg bg-[#00000040] backdrop-blur-md border border-gray-600 rounded-xl shadow-lg flex flex-col items-center p-6">
        
        {/* Google Login */}
        <button 
          onClick={googleLogin} 
          className="w-full flex items-center justify-center gap-3 bg-[#42656cae] hover:bg-[#42656c] py-3 rounded-lg font-semibold transition"
        >
          <img src={google} alt="Google" className="w-5"/>
          Login with Google
        </button>

        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <hr className="flex-grow border-gray-600"/>
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-600"/>
        </div>

        {/* Email/Password Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {show ? (
              <IoEye className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setShow(false)}/>
            ) : (
              <IoEyeOutline className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setShow(true)}/>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold flex items-center justify-center"
          >
            {loading ? <Loading /> : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-gray-400">
          Don't have an account? 
          <span className="text-blue-400 cursor-pointer ml-1" onClick={() => navigate("/signup")}>
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
