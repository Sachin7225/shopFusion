import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center py-10 px-4 gap-12'>
      
      {/* Latest Collection Section */}
      <div className='w-full max-w-[1200px] flex flex-col items-center gap-6 bg-[#1a1f23] rounded-2xl shadow-lg p-6'>
        <h2 className='text-2xl md:text-4xl font-bold text-[#e4fbff] text-center'>Latest Collection</h2>
        <LatestCollection />
      </div>

      {/* Best Seller Section */}
      <div className='w-full max-w-[1200px] flex flex-col items-center gap-6 bg-[#1a1f23] rounded-2xl shadow-lg p-6'>
        <h2 className='text-2xl md:text-4xl font-bold text-[#e4fbff] text-center'>Best Sellers</h2>
        <BestSeller />
      </div>

    </div>
  )
}

export default Product
