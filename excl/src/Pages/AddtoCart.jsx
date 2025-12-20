import React,{useState} from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";

const AddtoCart = () => {
  const [loading] = useState(false);
    const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Lipstick', color: 'Ruby Red', size: 'Standard', price: 600, quantity: 2, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop' },
    { id: 2, name: 'Eye Shadow Palette', color: 'Natural Tones', size: 'Large', price: 850, quantity: 1, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop' },
    { id: 3, name: 'Foundation', color: 'Medium Beige', size: '30ml', price: 1200, quantity: 1, image: 'https://images.unsplash.com/photo-1522335789203-aaac1d86b01c?w=200&h=200&fit=crop' },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 150;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  
  const pageAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
if(loading){
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
     <div>
     <div className="max-w-7xl  bg-gray-50 mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600">Color: {item.color}</p>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MdDeleteOutline size={20} className="text-gray-400 hover:text-red-500" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                          >
                            <span size={16} >-</span>
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                          >
                            <span size={16} >+</span>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">$ {item.price * item.quantity}</p>
                          <p className="text-sm text-gray-500">$ {item.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$ {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$ {shipping}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>$ {tax}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>$ {total}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <button className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-3 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-colors mb-3">
                Proceed to Checkout
              </button>
              <NavLink to="/shop">
              <button className="w-full py-3 bg-white text-black border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-colors">
                Continue Shopping
              </button>
              </NavLink>
              

              {/* Payment Icons */}
              {/* <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500 text-center mb-3">We Accept</p>
                <div className="flex justify-center gap-3 opacity-60">
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">MC</div>
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div> 
    </motion.div>
    
  )
}

export default AddtoCart