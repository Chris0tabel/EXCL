import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgSearchLoading } from "react-icons/cg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import Banner from "../assets/Banner.png";
import woman from "../assets/woman-9.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";


const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState(""); // <-- new state

  const navigate = useNavigate();

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);

      const prices = res.data.products.map((p) => p.price);
      const highest = Math.max(...prices);
      setMaxPrice(highest);
      setPriceRange([0, highest]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
  const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
  const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
  return matchesSearch && matchesPrice && matchesCategory;
});

  const pageAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const gridAnimation = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center loader">
      </div>
    );
  }

  return (
    <>
      <motion.div variants={pageAnimation} initial="hidden" animate="show">
        {/* hero */}
        <div
          className="bg-black text-white relative bg-cover bg-center overflow-visible"
          style={{ backgroundImage: `url(${Banner})` }}
        >
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-snug text-center md:text-left">
              Discover <br /> Our <br /> Latest Trends
            </h2>

            <div className="relative hidden sm:block w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
              <div className="absolute inset-0 rounded-full bg-gray-400"></div>

              <img
                src={woman}
                alt="hero"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 md:w-40 lg:w-48"
              />
            </div>
          </div>
        </div>

        {/* mobile filter */}
        <div className="lg:hidden flex justify-left mb-4 fixed top-20 left-4 z-40">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-black text-white p-4 rounded-full shadow-lg"
          >
            <MdOutlineFormatListBulleted size={22} />
          </button>
        </div>

        {isFilterOpen && (
          <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto lg:hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <IoMdClose size={26} />
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border rounded-lg"
                />
                <CgSearchLoading
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 text-xs border rounded-full hover:bg-black hover:text-white transition
                    ${selectedCategory === "" ? "bg-black text-white" : ""}`}
                >
                  All
                </button>
                {category?.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 text-xs border rounded-full hover:bg-black hover:text-white transition
                      ${selectedCategory === cat.slug ? "bg-black text-white" : ""}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mt-2">
                Price
              </h3>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
              <p className="text-sm mt-2">
                Up to <strong>${priceRange[1]}</strong>
              </p>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Search
              </h3>
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 text-xs border rounded-full hover:bg-black hover:text-white transition
                    ${selectedCategory === "" ? "bg-black text-white" : ""}`}
                >
                  All
                </button>
                {category?.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 text-xs border rounded-full hover:bg-black hover:text-white transition
                      ${selectedCategory === cat.slug ? "bg-black text-white" : ""}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
                <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mt-2">
                Price
              </h3>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
              <p className="text-sm mt-2">
                Up to <strong>${priceRange[1]}</strong>
              </p>
            </div>
          </div>

          {/* products card */}
          <motion.div
            className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4"
            variants={gridAnimation}
            initial="hidden"
            animate="show"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardAnimation}
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <img
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {product?.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {product?.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-[10px] border rounded bg-black text-white "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="font-semibold text-sm mt-2">
                    ${product?.price}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-3">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className=" flex  border px-3 py-1.5 text-xs rounded hover:bg-black hover:text-white transition"
                    >
                      Details <FaArrowRight className="pt-1" />
                    </button>

                    <button
                      onClick={() => navigate(`/cart`)}
                      className="  bg-black text-white px-1 py-1.5 text-xs rounded-full hover:opacity-90 transition"
                    >
                      <CiShoppingCart className="center" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CategoryPage;
