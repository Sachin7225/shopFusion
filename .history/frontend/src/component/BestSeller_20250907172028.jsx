import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  const { products } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const filterProduct = products.filter(item => item.bestseller)
      setBestSeller(filterProduct.slice(0, 4))
    }
  }, [products])

  return (
    <div>
      {/* Title Section */}
      <div className="h-[8%] w-full text-center mt-[50px]">
        <Title text1="BEST" text2="SELLER" />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
        </p>
      </div>

      {/* Best Seller Products */}
      <div className="w-full h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {bestSeller.length > 0 ? (
          bestSeller.map(item => (
            <Card
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image1}
            />
          ))
        ) : (
          <p className="text-gray-400 text-lg">No Best Sellers available right now.</p>
        )}
      </div>
    </div>
  )
}

export default BestSeller
