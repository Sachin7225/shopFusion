import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)

  // Ensure subtotal is always a number
  const subtotal = Number(getCartAmount()) || 0
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full lg:ml-[30px]">
      {/* Heading */}
      <div className="text-xl py-[10px]">
        <Title text1="CART" text2="TOTALS" />
      </div>

      {/* Cart Summary */}
      <div className="flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890] rounded-lg shadow-md bg-[#0c202570]">
        <div className="flex justify-between text-white text-[18px] p-[10px]">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        <hr className="border-[#4d8890]" />

        <div className="flex justify-between text-white text-[18px] p-[10px]">
          <p>Shipping Fee</p>
          <p>
            {currency} {subtotal === 0 ? '0.00' : delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr className="border-[#4d8890]" />

        <div className="flex justify-between text-white text-[20px] font-semibold p-[10px]">
          <b>Total</b>
          <b>
            {currency} {total.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
