import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'

function ProductDetail() {
    const { productId } = useParams()
    const { products, currency, addtoCart, loading } = useContext(shopDataContext)
    const [productData, setProductData] = useState(null)
    const [selectedImage, setSelectedImage] = useState('')
    const [size, setSize] = useState('')

    useEffect(() => {
        const product = products.find(p => p._id === productId)
        if (product) {
            setProductData(product)
            setSelectedImage(product.image1)
        }
    }, [productId, products])

    if (!productData) return <div className='flex justify-center items-center min-h-screen'><Loading/></div>

    return (
        <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row gap-10 px-4 lg:px-20 py-10'>
            
            {/* Image Gallery */}
            <div className='lg:w-1/2 flex flex-col lg:flex-row gap-4'>
                <div className='flex flex-row lg:flex-col gap-2 lg:w-1/5'>
                    {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, index) => (
                        <div key={index} className='w-16 h-16 md:w-24 md:h-24 border rounded-md overflow-hidden cursor-pointer'>
                            <img src={img} alt="" className='w-full h-full object-cover' onClick={() => setSelectedImage(img)} />
                        </div>
                    ))}
                </div>
                <div className='lg:w-4/5 border rounded-md overflow-hidden flex justify-center items-center'>
                    <img src={selectedImage} alt="" className='w-full h-full object-contain' />
                </div>
            </div>

            {/* Product Info */}
            <div className='lg:w-1/2 flex flex-col gap-4 text-white'>
                <h1 className='text-3xl md:text-5xl font-bold'>{productData.name.toUpperCase()}</h1>
                <div className='flex items-center gap-2'>
                    {Array(4).fill().map((_, i) => <FaStar key={i} className='text-yellow-400'/>)}
                    <FaStarHalfAlt className='text-yellow-400'/>
                    <span className='ml-2'>({productData.reviews || 124})</span>
                </div>
                <p className='text-2xl font-semibold'>{currency} {productData.price}</p>
                <p className='text-base md:text-lg'>{productData.description}</p>

                {/* Size Selection */}
                <div className='flex flex-col gap-2'>
                    <span className='text-xl font-semibold'>Select Size</span>
                    <div className='flex gap-2 flex-wrap'>
                        {productData.sizes.map((s, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSize(s)}
                                className={`px-4 py-2 border rounded-md ${size === s ? 'bg-blue-700 text-white' : 'bg-slate-300 text-black'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <button
                        className='mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700'
                        onClick={() => addtoCart(productData._id, size)}
                    >
                        {loading ? <Loading /> : "Add to Cart"}
                    </button>
                </div>

                <div className='mt-6 border-t border-gray-600 pt-4 text-sm md:text-base'>
                    <p>100% Original Product.</p>
                    <p>Cash on delivery available.</p>
                    <p>Easy return and exchange within 7 days.</p>
                </div>
            </div>

            {/* Description & Related Products */}
            <div className='w-full mt-10'>
                <div className='flex gap-4 mb-4'>
                    <span className='px-4 py-2 border-b-2 border-blue-500'>Description</span>
                    <span className='px-4 py-2 border-b-2 border-transparent'>Reviews ({productData.reviews || 124})</span>
                </div>
                <div className='bg-[#3336397c] p-6 rounded-md text-white text-base md:text-lg mb-8'>
                    {productData.description} Crafted from breathable, high-quality fabric for all-day comfort and effortless style. Easy to maintain, perfect for any setting.
                </div>

                <RelatedProduct
                    category={productData.category}
                    subCategory={productData.subCategory}
                    currentProductId={productData._id}
                />
            </div>
        </div>
    )
}

export default ProductDetail
