import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { shopDataContext } from "../context/ShopContext";

function Nav() {
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);

  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[70px] bg-[#ecfafaec] z-20 fixed top-0 flex items-center justify-between px-6 shadow-md shadow-black">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-[30px]" />
        <h1 className="text-[22px] font-bold text-black">OneCart</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-5">
        {[
          { label: "HOME", path: "/" },
          { label: "COLLECTIONS", path: "/collection" },
          { label: "ABOUT", path: "/about" },
          { label: "CONTACT", path: "/contact" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="text-sm bg-black/80 hover:bg-slate-600 text-white px-5 py-2 rounded-2xl"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 relative">
        {/* Search Icon */}
        {!showSearch ? (
          <IoSearchCircleOutline
            className="w-9 h-9 text-black cursor-pointer"
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
          />
        ) : (
          <IoSearchCircleSharp
            className="w-9 h-9 text-black cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        )}

        {/* Profile */}
        {!userData ? (
          <FaCircleUser
            className="w-8 h-8 text-black cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        ) : (
          <div
            className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart */}
        <div className="relative">
          <MdOutlineShoppingCart
            className="w-8 h-8 text-black cursor-pointer hidden md:block"
            onClick={() => navigate("/cart")}
          />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
              {getCartCount()}
            </span>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="absolute w-full h-[80px] bg-[#d8f6f9dd] top-[100%] left-0 flex items-center justify-center">
          <input
            autoFocus
            type="text"
            className="lg:w-1/2 w-4/5 h-[60%] bg-[#233533] rounded-[30px] px-6 placeholder:text-white text-white text-lg"
            placeholder="Search Here"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div
          ref={profileRef}
          className="absolute w-[220px] bg-black/90 top-[110%] right-6 border border-gray-400 rounded-md z-20"
        >
          <ul className="flex flex-col text-white">
            {!userData && (
              <li
                className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                Logout
              </li>
            )}
            <li
              className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
              onClick={() => {
                navigate("/order");
                setShowProfile(false);
              }}
            >
              Orders
            </li>
            <li
              className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
              onClick={() => {
                navigate("/about");
                setShowProfile(false);
              }}
            >
              About
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="w-full h-[65px] fixed bottom-0 left-0 bg-black flex items-center justify-around md:hidden text-white">
        <button onClick={() => navigate("/")}>
          <IoMdHome className="w-6 h-6 mx-auto" /> Home
        </button>
        <button onClick={() => navigate("/collection")}>
          <HiOutlineCollection className="w-6 h-6 mx-auto" /> Collections
        </button>
        <button onClick={() => navigate("/contact")}>
          <MdContacts className="w-6 h-6 mx-auto" /> Contact
        </button>
        <button onClick={() => navigate("/cart")} className="relative">
          <MdOutlineShoppingCart className="w-6 h-6 mx-auto" /> Cart
          {getCartCount() > 0 && (
            <span className="absolute -top-1 right-2 bg-white text-black text-xs rounded-full px-1">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Nav;
