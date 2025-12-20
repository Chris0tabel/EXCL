import React from "react";
import model1 from "../assets/model1.jpg";
import model2 from "../assets/model2.jpg";
import model3 from "../assets/model3.jpg";
import model6 from "../assets/model6.jpg";
import model7 from "../assets/model7.jpg";
import aigenerated from "../assets/ai-generated.jpg";
import model8 from "../assets/model8.webp";
import { TbNorthStar } from "react-icons/tb";
import { FaArrowDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [loading] = React.useState(false);
  const pageAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader scroll-float"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative text-white">
          <div className="flex items-center justify-center py-2">
            <img
              src={model8}
              alt="Fashion model"
              className="w-full sm:w-2/5 h-[60vh] sm:h-128 object-cover grayscale"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-4xl sm:text-8xl text-black font-serif italic select-none">
              EXCLEL
            </div>
            <div className="text-4xl sm:text-8xl font-serif italic opacity-20 select-none">
              EXCLEXCL
            </div>
            <div className="text-4xl sm:text-8xl font-serif italic text-black select-none">
              EXCLXL
            </div>
          </div>
        </div>

        {/* Discover Section */}
        <div className="py-12 sm:py-16">
          <div className="text-center scroll-float mb-4">
            <div className="h-3 w-86 rounded-xl bg-black mx-auto mb-8"></div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Discover Our Latest Trends
            </h2>
          </div>

          <div className="bg-black w-full py-12 sm:py-20">
            <p className="text-white text-center max-w-2xl mx-auto px-4">
              Lorem ipsum dolor sit amet consectetur. In laceret maecenas elit
              nibh massa ac sit vitae consequat. Est ut pellentesque nulla
              mollis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto px-4">
              {/* Card 1 */}
              <div className="relative group">
                <TbNorthStar
                  className="absolute top-4 left-4 text-white z-10"
                  size={24}
                />
                <img
                  src={aigenerated}
                  alt="Blazing"
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-white text-lg">Blazing</h3>
                  <p className="text-sm text-white">Fashion & Lifestyle</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative group">
                <TbNorthStar
                  className="absolute top-4 left-4 text-white z-10"
                  size={24}
                />
                <img
                  src={model7}
                  alt="Chilling"
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-white text-lg">Chilling</h3>
                  <p className="text-sm text-white">Fashion & Lifestyle</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative group">
                <TbNorthStar
                  className="absolute top-4 left-4 text-white z-10"
                  size={24}
                />
                <img
                  src={model1}
                  alt="Party Mode"
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-white text-lg">Party Mode</h3>
                  <p className="text-sm text-white">Fashion & Lifestyle</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <NavLink to="/shop">
                <button className="bg-white border-2 border-black px-8 py-2 font-semibold hover:bg-black hover:text-white transition-colors">
                  SHOP NOW <FaArrowDown className="inline-block ml-2" />
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Christmas Haul */}
        <div className="px-4 sm:px-8 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Our Christmas Haul
          </h2>
          <div className="h-2 w-86 rounded-xl bg-black mx-auto mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <img src={model2} className="w-full h-60 sm:h-80 object-cover" />
            <img src={model3} className="w-full h-60 sm:h-80 object-cover" />
            <img src={model6} className="w-full h-60 sm:h-80 object-cover" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
