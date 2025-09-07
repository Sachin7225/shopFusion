import React from 'react';
import Title from '../component/Title';
import contact from "../assets/contact.jpg";
import NewLetterBox from '../component/NewLetterBox';

function Contact() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] pb-[100px] gap-[60px]'>
      
      <Title text1={'CONTACT'} text2={'US'} />

      <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-[50px] px-[20px] lg:px-[60px]'>

        {/* Image Section */}
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img 
            src={contact} 
            alt="Contact" 
            className='w-[80%] lg:w-[70%] shadow-xl shadow-black rounded-lg hover:scale-105 transition-transform duration-300'
          />
        </div>

        {/* Info Section */}
        <div className='lg:w-1/2 w-full flex flex-col gap-[15px] text-white'>
          
          <p className='text-[18px] font-bold'>Our Store</p>
          <div className='text-[14px] md:text-[16px] flex flex-col gap-[2px]'>
            <span>12345 Random Station</span>
            <span>Random City, State, India</span>
          </div>

          <div className='text-[14px] md:text-[16px] flex flex-col gap-[2px] mt-[10px]'>
            <span>Tel: +91-9876543210</span>
            <span>Email: admin@onecart.com</span>
          </div>

          <p className='text-[18px] font-bold mt-[20px]'>Careers at OneCart</p>
          <p className='text-[14px] md:text-[16px]'>
            Learn more about our teams and job openings
          </p>
          <button className='mt-[10px] px-[30px] py-[12px] bg-transparent border border-white hover:bg-white hover:text-black rounded-md transition-all duration-300'>
            Explore Jobs
          </button>

        </div>

      </div>

      {/* Newsletter Section */}
      <NewLetterBox />

    </div>
  );
}

export default Contact;
