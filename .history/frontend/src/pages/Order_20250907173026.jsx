import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';

function Order() {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true });
      if (result.data) {
        const allOrdersItem = [];
        result.data.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <div className="text-center mt-20 mb-10">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-[#1b2a33] rounded-2xl shadow-lg p-4 relative hover:scale-105 transition-transform duration-200"
          >
            <img
              src={item.image1}
              alt={item.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h3 className="text-xl md:text-2xl text-[#f3f9fc] font-semibold mb-2">{item.name}</h3>

            <div className="flex flex-wrap gap-3 text-[#aaf4e7] text-sm md:text-base mb-2">
              <p>{currency} {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Size: {item.size}</p>
            </div>

            <p className="text-[#aaf4e7] text-sm md:text-base mb-2">
              Date: <span className="text-[#e4fbff]">{new Date(item.date).toDateString()}</span>
            </p>

            <p className="text-[#aaf4e7] text-sm md:text-base mb-3">
              Payment: <span className="text-[#e4fbff]">{item.paymentMethod}</span>
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    item.status.toLowerCase() === 'delivered'
                      ? 'bg-green-500'
                      : item.status.toLowerCase() === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                ></span>
                <span className="text-[#f3f9fc] text-sm md:text-base">{item.status}</span>
              </div>

              <button
                onClick={loadOrderData}
                className="px-4 py-2 text-sm md:text-base bg-[#101919] text-[#f3f9fc] rounded-lg hover:bg-[#2c3e50] transition-colors"
              >
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
