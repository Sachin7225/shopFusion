import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
    const { products, currency, cartItem ,updateQuantity } = useContext(shopDataContext)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItem]);

    return (
        <div className='w-full min-h-screen p-5 bg-gradient-to-l from-[#0c2025] to-[#141414]'>
            <div className='text-center mt-20 mb-10'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {cartData.length === 0 ? (
                <p className='text-center text-white text-xl mt-10'>Your cart is empty!</p>
            ) : (
                <div className='flex flex-col gap-6 md:gap-8'>
                    {cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);
                        if (!productData) return null;
                        return (
                            <div key={index} className='flex flex-col md:flex-row items-center justify-between gap-4 bg-[#1f3a40] p-4 rounded-xl'>
                                <img src={productData.image1} alt={productData.name} className='w-24 h-24 md:w-32 md:h-32 object-cover rounded-md' />
                                <div className='flex-1 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4'>
                                    <div>
                                        <p className='text-white text-lg md:text-xl font-semibold'>{productData.name}</p>
                                        <p className='text-[#aaf4e7] mt-1'>{currency} {productData.price}</p>
                                        <p className='text-white mt-1'>Size: <span className='font-bold'>{item.size}</span></p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            className='w-16 p-1 text-center rounded-md border border-[#9ff9f9] bg-[#51808048] text-white'
                                            onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                                        />
                                        <RiDeleteBin6Line
                                            className='text-[#ff6b6b] cursor-pointer w-6 h-6'
                                            onClick={() => updateQuantity(item._id, item.size, 0)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {cartData.length > 0 && (
                <div className='flex justify-end mt-10'>
                    <div className='w-full md:w-96'>
                        <CartTotal />
                        <button
                            className='w-full bg-[#518080b4] hover:bg-[#3f6b6b] text-white py-3 rounded-xl mt-4 font-semibold'
                            onClick={() => navigate("/placeorder")}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
