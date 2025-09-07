import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(shopDataContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== currentProductId
      )
      setRelated(filtered.slice(0, 4))
    }
  }, [products, category, subCategory, currentProductId])

  return (
    <div className="my-[60px] md:my-[40px] md:px-[60px]">
      <div className="ml-[20px] lg:ml-[80px]">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      {related.length > 0 ? (
        <div className="w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
          {related.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-blue-100 mt-6">
          No related products found.
        </p>
      )}
    </div>
  )
}

export default RelatedProduct
