import React, { useContext, useState } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Add() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  let { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        { withCredentials: true }
      );

      toast.success("Product Added Successfully");
      setLoading(false);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add Product Failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-[#0c2025] shadow-lg flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-[#65d8f7]">ShopFusion</h1>
      </header>

      {/* Form Section */}
      <main className="flex-1 w-full flex justify-center">
        <form
          onSubmit={handleAddProduct}
          className="w-full md:w-4/5 lg:w-3/5 bg-[#1e1e1e] rounded-2xl shadow-2xl mt-8 mb-12 p-6 md:p-10 flex flex-col gap-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">Add Product</h2>

          {/* Upload Images */}
          <div>
            <p className="text-lg md:text-xl font-semibold mb-3">Upload Images</p>
            <div className="flex gap-4 flex-wrap">
              {[{ img: image1, set: setImage1, id: "image1" },
                { img: image2, set: setImage2, id: "image2" },
                { img: image3, set: setImage3, id: "image3" },
                { img: image4, set: setImage4, id: "image4" }]
                .map(({ img, set, id }, idx) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-[#65d8f7] overflow-hidden"
                  >
                    {img ? (
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`preview-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">+</span>
                    )}
                    <input
                      type="file"
                      id={id}
                      hidden
                      onChange={(e) => set(e.target.files[0])}
                      required
                    />
                  </label>
                ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <p className="text-lg md:text-xl font-semibold mb-2">Product Name</p>
            <input
              type="text"
              placeholder="Type here"
              className="w-full h-12 rounded-lg border-2 border-gray-500 bg-slate-600 px-4 text-[18px] placeholder:text-gray-300 focus:border-[#65d8f7]"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-lg md:text-xl font-semibold mb-2">Product Description</p>
            <textarea
              placeholder="Type here"
              className="w-full h-28 rounded-lg border-2 border-gray-500 bg-slate-600 px-4 py-3 text-[18px] placeholder:text-gray-300 focus:border-[#65d8f7]"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          {/* Category & Subcategory */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-lg md:text-xl font-semibold mb-2">Category</p>
              <select
                className="w-full rounded-lg border-2 border-gray-500 bg-slate-600 px-4 py-2 focus:border-[#65d8f7]"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl font-semibold mb-2">Sub-Category</p>
              <select
                className="w-full rounded-lg border-2 border-gray-500 bg-slate-600 px-4 py-2 focus:border-[#65d8f7]"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-lg md:text-xl font-semibold mb-2">Product Price</p>
            <input
              type="number"
              placeholder="₹ 2000"
              className="w-full h-12 rounded-lg border-2 border-gray-500 bg-slate-600 px-4 text-[18px] placeholder:text-gray-300 focus:border-[#65d8f7]"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          {/* Sizes */}
          <div>
            <p className="text-lg md:text-xl font-semibold mb-3">Product Size</p>
            <div className="flex gap-3 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-5 py-2 rounded-lg border-2 cursor-pointer text-lg ${
                    sizes.includes(size)
                      ? "bg-green-400 text-black border-[#65d8f7]"
                      : "bg-slate-600 border-gray-500 text-white"
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((s) => s !== size)
                        : [...prev, size]
                    )
                  }
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="checkbox"
              className="w-5 h-5 cursor-pointer"
              onChange={() => setBestSeller((prev) => !prev)}
              checked={bestseller}
            />
            <label htmlFor="checkbox" className="text-lg font-semibold">
              Add to Bestseller
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-44 h-14 rounded-xl bg-[#65d8f7] text-black text-lg font-semibold flex items-center justify-center hover:bg-[#4abddc] transition-all"
          >
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Add;
