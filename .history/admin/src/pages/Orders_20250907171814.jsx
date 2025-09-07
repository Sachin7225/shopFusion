import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si"

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      )
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { withCredentials: true }
      )
      if (result.data) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="flex-1 lg:ml-[310px] md:ml-[250px] mt-[80px] px-6 py-10 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#afe2f2] mb-4">
            All Orders List
          </h1>

          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="w-full max-w-[95%] bg-[#0000002e] rounded-xl shadow-md shadow-black border border-[#969595] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 p-5"
              >
                {/* Icon */}
                <SiEbox className="w-[60px] h-[60px] text-black p-2 rounded-lg bg-white" />

                {/* Order items */}
                <div className="flex flex-col gap-2 text-sm md:text-base text-[#56dbfc]">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name.toUpperCase()} × {item.quantity}{" "}
                      <span>{item.size}</span>
                      {i < order.items.length - 1 && ","}
                    </p>
                  ))}
                  <div className="text-gray-300 text-sm mt-2">
                    <p>{order.address.firstName + " " + order.address.lastName}</p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.pinCode}
                    </p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

                {/* Order details */}
                <div className="text-sm md:text-base text-green-100 flex flex-col gap-1">
                  <p>Items: {order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-lg md:text-xl font-semibold text-white">
                    ₹ {order.amount}
                  </p>
                </div>

                {/* Status dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                  className="px-3 py-2 bg-slate-600 border border-[#96eef3] rounded-lg text-sm md:text-base cursor-pointer"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          ) : (
            <div className="text-gray-300 text-lg">No orders available.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders
