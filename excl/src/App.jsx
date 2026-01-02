import "./App.css";
import { Routes, Route,useLocation } from "react-router-dom";
import React from "react";
import LandingPage from "./Pages/LandingPage";
import CategoryPage from "./Pages/CategoryPage";
import Layout from "./Pages/layout/layout";
import AddtoCart from "./Pages/AddtoCart";
import { AnimatePresence } from "framer-motion";
import ProductDetails from "./Pages/modals/ProductDetails";


function App() {
  const location = useLocation();
  return (
    <>
     <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<AddtoCart />} />
        </Route>
      </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
