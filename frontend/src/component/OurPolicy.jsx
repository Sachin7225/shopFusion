import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri"
import { TbRosetteDiscountCheckFilled } from "react-icons/tb"
import { BiSupport } from "react-icons/bi"

function OurPolicy() {
  const policies = [
    {
      icon: <RiExchangeFundsLine className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" aria-label="Easy Exchange Policy" />,
      title: "Easy Exchange Policy",
      desc: "Exchange Made Easy – Quick, Simple, and Customer-Friendly Process."
    },
    {
      icon: <TbRosetteDiscountCheckFilled className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" aria-label="7 Days Return Policy" />,
      title: "7 Days Return Policy",
      desc: "Shop with Confidence – 7 Days Easy Return Guarantee."
    },
    {
      icon: <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" aria-label="Best Customer Support" />,
      title: "Best Customer Support",
      desc: "Trusted Customer Support – Your Satisfaction Is Our Priority."
    }
  ]

  return (
    <div className="w-[100vw] min-h-[100vh] md:h-[70vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px]">
      <div className="h-[8%] w-[100%] text-center mt-[70px]">
        <Title text1="OUR" text2="POLICY" />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      <div className="w-[100%] md:min-h-[50%] h-[20%] flex flex-wrap items-center justify-center gap-[50px]">
        {policies.map((policy, index) => (
          <div key={index} className="w-[400px] max-w-[90%] h-[60%] flex flex-col items-center justify-center gap-[10px] text-center">
            {policy.icon}
            <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">{policy.title}</p>
            <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue]">{policy.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy
