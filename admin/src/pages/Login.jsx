import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const AdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      )
      console.log(result.data)
      toast.success("Admin Login Successful")
      getAdmin()
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Admin Login Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center px-6 gap-3">
        <img className="w-[40px]" src={logo} alt="OneCart Logo" />
        <h1 className="text-xl font-semibold">OneCart</h1>
      </div>

      {/* Welcome text */}
      <div className="text-center mt-6 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Login Page</h2>
        <p className="text-gray-300 text-sm">Welcome to OneCart, Admin Login</p>
      </div>

      {/* Form */}
      <div className="max-w-[600px] w-[90%] mt-8 p-6 bg-[#00000025] border border-[#96969635] rounded-xl shadow-lg backdrop-blur-xl">
        <form onSubmit={AdminLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] border-2 border-[#96969635] rounded-lg bg-transparent px-4 font-medium placeholder-gray-300 focus:outline-none focus:border-[#6060f5]"
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg bg-transparent px-4 font-medium placeholder-gray-300 focus:outline-none focus:border-[#6060f5]"
            />
            {show ? (
              <IoEye
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-300"
                onClick={() => setShow(false)}
              />
            ) : (
              <IoEyeOutline
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-300"
                onClick={() => setShow(true)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-[#6060f5] hover:bg-[#4b4be0] transition rounded-lg flex items-center justify-center text-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
