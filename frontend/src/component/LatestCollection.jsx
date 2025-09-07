import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 8));
    }
  }, [products]);

  return (
    <div className="w-full py-10">
      {/* Section Heading */}
      <div className="text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-full max-w-2xl mx-auto text-[13px] md:text-[18px] text-blue-200 px-4">
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      {/* Products Grid */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-10">
        {latestProducts.map((item) => (
          <Card
            key={item._id}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>

      {/* View More Button */}
      {products.length > 8 && (
        <div className="flex justify-center mt-10">
          <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full transition duration-300">
            View More
          </button>
        </div>
      )}
    </div>
  );
}

export default LatestCollection;
