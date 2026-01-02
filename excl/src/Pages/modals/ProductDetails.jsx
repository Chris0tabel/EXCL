import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { CiShoppingCart } from "react-icons/ci";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        console.log("response",res)
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen max-w-full bg-white">
     

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <NavLink
          to="/shop"
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back
        </NavLink>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mt-8">
          {/* IMAGE */}
          <div>
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>
            <p className="text-sm text-gray-400 mb-2">
              {product?.tag}
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              {product?.title}
            </h2>

            <p className="text-xl font-bold mb-6">
              ${product?.price}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm">Qty</span>
              <select className="border px-3 py-2 rounded"> 
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <button className="w-full bg-black text-gray-200 py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              Add to Cart
              <CiShoppingCart size={20} /> |{""} ${product?.price}
            </button>

            <div className="mt-10">
              <h3 className="font-semibold mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="mt-8 text-sm text-gray-600 space-y-2">
              <p>
                <strong>Warranty:</strong>{product?.warrantyInformation}
              </p>
              <p>
                <strong>Shipping:</strong> Ships in 2–5 business days
              </p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ProductDetails;
