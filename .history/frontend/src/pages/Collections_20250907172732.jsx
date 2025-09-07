import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
    const [showFilter, setShowFilter] = useState(false)
    const { products, search, showSearch } = useContext(shopDataContext)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortType, setSortType] = useState("relevant")

    // Toggle categories
    const toggleCategory = (value) => {
        setCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
    }

    const toggleSubCategory = (value) => {
        setSubCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
    }

    // Apply filters
    const applyFilter = () => {
        let temp = products.slice()

        if (showSearch && search) {
            temp = temp.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length) temp = temp.filter(item => category.includes(item.category))
        if (subCategory.length) temp = temp.filter(item => subCategory.includes(item.subCategory))

        setFilteredProducts(temp)
    }

    // Sort products
    useEffect(() => {
        let temp = [...filteredProducts]
        switch (sortType) {
            case 'low-high':
                temp.sort((a, b) => a.price - b.price)
                break;
            case 'high-low':
                temp.sort((a, b) => b.price - a.price)
                break;
            default:
                applyFilter()
        }
        setFilteredProducts(temp)
    }, [sortType])

    // Initial load
    useEffect(() => setFilteredProducts(products), [products])
    useEffect(() => applyFilter(), [category, subCategory, search, showSearch])

    return (
        <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] flex flex-col md:flex-row'>
            {/* Sidebar */}
            <div className={`md:w-[25%] w-full p-5 border-r border-gray-600 text-[#aaf5fa] ${showFilter ? "h-auto" : "h-16"} transition-all duration-300`}>
                <p className='text-2xl font-semibold flex items-center justify-between cursor-pointer'
                   onClick={() => setShowFilter(prev => !prev)}>
                    FILTERS
                    {showFilter ? <FaChevronDown /> : <FaChevronRight />}
                </p>

                {/* Categories */}
                {showFilter && (
                    <div className='mt-6 bg-slate-700 p-4 rounded-lg'>
                        <p className='text-lg font-semibold mb-2'>CATEGORIES</p>
                        {['Men', 'Women', 'Kids'].map(cat => (
                            <label key={cat} className='flex items-center gap-2 text-white mt-1'>
                                <input type="checkbox" value={cat} onChange={() => toggleCategory(cat)} />
                                {cat}
                            </label>
                        ))}
                    </div>
                )}

                {/* Sub-Categories */}
                {showFilter && (
                    <div className='mt-4 bg-slate-700 p-4 rounded-lg'>
                        <p className='text-lg font-semibold mb-2'>SUB-CATEGORIES</p>
                        {['TopWear', 'BottomWear', 'WinterWear'].map(sub => (
                            <label key={sub} className='flex items-center gap-2 text-white mt-1'>
                                <input type="checkbox" value={sub} onChange={() => toggleSubCategory(sub)} />
                                {sub}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Products */}
            <div className='flex-1 md:pl-10 p-5'>
                <div className='flex justify-between items-center mb-6 flex-col md:flex-row gap-4'>
                    <Title text1="ALL" text2="COLLECTIONS" />
                    <select className='bg-slate-600 text-white px-4 py-2 rounded-lg'
                            onChange={(e) => setSortType(e.target.value)}>
                        <option value="relevant">Sort: Relevant</option>
                        <option value="low-high">Sort: Low to High</option>
                        <option value="high-low">Sort: High to Low</option>
                    </select>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {filteredProducts.map(item => (
                        <Card key={item._id} id={item._id} name={item.name} price={item.price} image={item.image1} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <p className='text-center text-white mt-10 text-xl'>No products found!</p>
                )}
            </div>
        </div>
    )
}

export default Collections
