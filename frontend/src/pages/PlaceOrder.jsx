import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import razorpay from '../assets/Razorpay.jpg';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true });
        if (data) {
          navigate("/order");
          setCartItem({});
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(p => p._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };

      if (method === 'cod') {
        const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true });
        if (result.data) {
          setCartItem({});
          toast.success("Order Placed");
          navigate("/order");
        } else {
          toast.error("Order Placement Error");
        }
      } else if (method === 'razorpay') {
        const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true });
        if (resultRazorpay.data) {
          initPay(resultRazorpay.data);
          toast.success("Order Placed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-12 relative pt-20 pb-20">
      {/* Delivery Form */}
      <div className="lg:w-1/2 w-full flex justify-center">
        <form onSubmit={onSubmitHandler} className="lg:w-3/4 w-11/12 flex flex-col gap-4">
          <Title text1="DELIVERY" text2="INFORMATION" />
          <div className="flex gap-4">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={onChangeHandler} required className="w-1/2 h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={onChangeHandler} required className="w-1/2 h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
          </div>
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={onChangeHandler} required className="w-full h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={onChangeHandler} required className="w-full h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
          <div className="flex gap-4">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={onChangeHandler} required className="w-1/2 h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={onChangeHandler} required className="w-1/2 h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
          </div>
          <div className="flex gap-4">
            <input type="text" name="pinCode" placeholder="Pincode" value={formData.pinCode} onChange={onChangeHandler} required className="w-1/2 h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={onChangeHandler} required className="w-1/2 h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />
          </div>
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={onChangeHandler} required className="w-full h-12 rounded-md bg-slate-700 placeholder-white px-4 text-lg shadow-sm shadow-black" />

          <button type="submit" className="mt-4 bg-[#3bcee848] text-white py-3 rounded-2xl border border-gray-500 w-full flex justify-center items-center gap-2">
            {loading ? <Loading /> : "PLACE ORDER"}
          </button>
        </form>
      </div>

      {/* Payment & Summary */}
      <div className="lg:w-1/2 w-full flex justify-center items-start gap-8 flex-col lg:flex-row">
        <div className="lg:w-3/4 w-11/12 flex flex-col gap-6">
          <CartTotal />
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-6 mt-4">
            <button onClick={() => setMethod('razorpay')} className={`w-36 h-12 rounded-md overflow-hidden ${method === 'razorpay' ? 'border-4 border-blue-700' : ''}`}>
              <img src={razorpay} alt="Razorpay" className="w-full h-full object-cover" />
            </button>
            <button onClick={() => setMethod('cod')} className={`w-48 h-12 rounded-md font-bold text-[#332f6f] bg-gradient-to-t from-[#95b3f8] to-white ${method === 'cod' ? 'border-4 border-blue-700' : ''}`}>
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
