import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) fetchList()
      else console.log("Failed to remove Product")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="flex-1 lg:ml-[320px] md:ml-[230px] mt-[80px] px-6 py-10 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#afe2f2] mb-4">All Listed Products</h1>

          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="w-full max-w-[95%] md:h-[120px] h-[90px] bg-[#0000002e] rounded-xl flex items-center gap-5 p-4 shadow-md shadow-black border border-[#969595]"
              >
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-[80px] md:w-[120px] h-[70px] md:h-[90px] object-cover rounded-lg"
                />
                <div className="flex flex-col justify-center flex-1 gap-1">
                  <p className="text-lg md:text-xl text-[#bef0f3]">{item.name}</p>
                  <p className="text-sm md:text-base text-[#bef3da]">{item.category}</p>
                  <p className="text-sm md:text-base text-[#bef3da]">₹{item.price}</p>
                </div>
                <button
                  onClick={() => removeList(item._id)}
                  className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-400 text-sm md:text-base transition"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="text-lg text-gray-300">No products available.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lists
