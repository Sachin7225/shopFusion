import React, { useState, useEffect, useContext } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      setTotalProducts(products.data.length);

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, {
        withCredentials: true,
      });
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 md:p-12 flex flex-col gap-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#65d8f7]">
            ShopFusion Admin Panel
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Products Card */}
            <div className="text-[#dcfafd] h-[200px] bg-[#0000002e] flex flex-col items-center justify-center gap-4 rounded-lg shadow-md backdrop-blur-md border border-gray-600">
              <p className="text-xl md:text-2xl font-semibold">
                Total Products
              </p>
              <span className="px-6 py-3 bg-[#030e11] rounded-lg border border-gray-600 text-2xl">
                {totalProducts}
              </span>
            </div>

            {/* Orders Card */}
            <div className="text-[#dcfafd] h-[200px] bg-[#0000002e] flex flex-col items-center justify-center gap-4 rounded-lg shadow-md backdrop-blur-md border border-gray-600">
              <p className="text-xl md:text-2xl font-semibold">
                Total Orders
              </p>
              <span className="px-6 py-3 bg-[#030e11] rounded-lg border border-gray-600 text-2xl">
                {totalOrders}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
