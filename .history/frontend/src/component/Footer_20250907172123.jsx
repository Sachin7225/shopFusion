import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <div className="w-full md:h-[36vh] h-[21vh] mb-[77px] md:mb-0">
      {/* Top Section */}
      <div className="w-full md:h-[30vh] h-[15vh] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px]">
        
        {/* Brand Info */}
        <div className="md:w-[30%] w-[35%] h-full flex flex-col justify-center gap-[5px]">
          <div className="flex items-center gap-[5px] mt-[10px] md:mt-[40px]">
            <img src={logo} alt="logo" className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]" />
            <p className="text-[19px] md:text-[20px] text-black font-semibold">ShopFusion</p>
          </div>
          <p className="text-[15px] text-[#1e2223] hidden md:block">
            ShopFusion is your all-in-one online shopping destination, offering top-quality 
            products, unbeatable deals, and fast delivery—all backed by trusted service 
            designed to make your life easier every day.
          </p>
          <p className="text-[15px] text-[#1e2223] flex md:hidden">
            Fast. Easy. Reliable. ShopFusion Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className="md:w-[25%] w-[30%] h-full flex flex-col items-center justify-center text-center">
          <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans mt-[10px] md:mt-[40px]">
            COMPANY
          </p>
          <ul className="mt-2 space-y-1">
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:underline">Home</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer hover:underline">About Us</li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:underline">Delivery</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer hover:underline">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-[25%] w-[40%] h-full flex flex-col items-center justify-center text-center">
          <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans mt-[10px] md:mt-[40px]">
            GET IN TOUCH
          </p>
          <ul className="mt-2 space-y-1">
            <li className="text-[15px] text-[#1e2223]">+91-9876543210</li>
            <li className="text-[15px] text-[#1e2223]">contact@shopfusion.com</li>
            <li className="text-[15px] text-[#1e2223] hidden md:block">+1-123-456-7890</li>
            <li className="text-[15px] text-[#1e2223] hidden md:block">admin@shopfusion.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-400"></div>

      {/* Bottom Bar */}
      <div className="w-full h-[5vh] bg-[#dbfcfcec] flex items-center justify-center text-sm md:text-base text-[#1e2223]">
        © 2025 ShopFusion. All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer
