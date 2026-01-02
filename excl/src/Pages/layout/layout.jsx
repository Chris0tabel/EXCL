import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <nav className="flex items-center justify-between px-8 h-16 border-b">
          <div className="text-4xl font-bold tracking-wider">
            <NavLink to="/">EXCL</NavLink>
          </div>
          <div className="flex gap-8 text-sm">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              SHOP
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              CART
              {/* <span className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
    3
  </span> */}
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="flex-1 overflow-y-auto pt-16 pb-1 ">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm mb-1">
              THE CONTENT ON EXCL.COM IS BEING CONSTANTLY REVIEWED AND REVISED
            </p>
            <p className="text-sm mb-1">
              IT IS BEING RENDERED TO DISPLAY IN ACCORDANCE WITH THE COMPANY'S
            </p>
            <p className="text-xs text-gray-400">
              COPYRIGHT © EXCL INTERNATIONAL INC. ALL RIGHTS RESERVED
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF size={20} />
            </a>

            <a href="#" className="hover:text-gray-400">
              <AiOutlineInstagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default layout;
