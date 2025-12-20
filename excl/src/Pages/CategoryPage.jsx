import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgSearchLoading } from "react-icons/cg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ViewProductmodal from "./modals/ViewProductmodal";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log("hkhvkbkhbvk", response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      console.log("Categories:", response.data);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const searchProducts = () => {
    if (!products) {
      return [];
    }
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredProducts;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader scroll-float"></div>
      </div>
    );
  }

  const filteredProducts = searchProducts();

  const pageAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <motion.div
        variants={pageAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="min-h-screen  p-6">
          {/* Search and Filters */}
          <div className="max-w-7xl  mx-auto mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative  w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search"
                  onClick={searchProducts}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <CgSearchLoading
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>

              {/* Filters */}
              {/* <div className="flex gap-4">
            <div className="relative">
              <select className="appearance-none flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50">
                <option disabled>All</option>
                <option>10</option>
                <option>Blue</option>
             </select>
            </div>
            <div className="relative">
             <select className="appearance-none flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50">
                <option disabled>All</option>
                <option>10</option>
                <option>Blue</option>
             </select>
            </div>
          </div> */}
            </div>

            {/* Category Pills */}
            <div className="relative mb-8">
              <div className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth px-1 scrollbar-hide group-hover:scrollbar-show">
                {category?.length === 0 ? (
                  <p className="text-gray-500 border rounded px-4 py-2">
                    ❓ Categories not found ❓
                  </p>
                ) : (
                  category?.map((cat) => (
                    <button
                      key={cat.id}
                      className="flex-shrink-0 px-3 py-1.5 rounded-full border text-xs text-white border-black bg-black font-medium hover:bg-gray-800 transition"
                    >
                      {cat.name}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto ">
              {filteredProducts?.length === 0 ? (
                <div className="text-center border rounded text-gray-500 text-lg py-20">
                  ❓ Products not found ❓
                </div>
              ) : (
                <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts?.map((product) => (
                    <div
                      key={product?.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsOpen(true);
                      }}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={product?.thumbnail}
                          alt={product?.title || "Product"}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              {product?.title || "Unnamed product"}
                            </p>
                            <p className="text-lg font-bold">
                              $ {product?.price ?? "N/A"}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(product?.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            {favorites?.[product?.id] ? (
                              <AiFillHeart size={24} className="text-red-500" />
                            ) : (
                              <AiOutlineHeart
                                size={24}
                                className="text-gray-400"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <ViewProductmodal
        open={open}
        setIsOpen={setIsOpen}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default CategoryPage;
