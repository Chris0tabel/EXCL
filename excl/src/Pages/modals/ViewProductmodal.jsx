// import React,{useState} from 'react'
// import { Modal } from 'react-bootstrap'

// const ViewProductmodal = ({ open, setIsOpen,selectedProduct }) => {

//   return (
//     <Modal 
//     show={open} 
//     onHide={() => setIsOpen(false)} 
//     size="lg"
//      centered
//     backdropClassName='backdrop'>
//       <Modal.Header closeButton><Modal.Title>Product Details</Modal.Title></Modal.Header>
//       <Modal.Body>
//          <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <img
//   src={selectedProduct?.thumbnail || "fallback.jpg"}
//   alt={selectedProduct?.title || "Product"}
//   className="w-full h-auto object-cover"
// />

// <h2 className="text-5xl font-bold mb-6">${selectedProduct?.price}</h2>
// <h3 className="text-lg font-medium mb-4">{selectedProduct?.title}</h3>
// <p className="text-gray-700 leading-relaxed mb-8">
//   {selectedProduct?.description || "No description available."}
// </p>

//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   )
// }

// export default ViewProductmodal
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiShoppingCart } from 'react-icons/ci';

const ViewProductmodal = ({ open, setIsOpen, selectedProduct }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Product Details</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <img
              src={selectedProduct?.thumbnail || selectedProduct?.image || "fallback.jpg"}
              alt={selectedProduct?.title || "Product"}
              className="w-full h-auto object-cover rounded-lg"
            />
            
            <div>
              <h2 className="text-5xl font-bold mb-6">${selectedProduct?.price}</h2>
              <h3 className="text-lg font-medium mb-4">{selectedProduct?.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-2 text-sm">
                {selectedProduct?.description || "No description available."}
              </p>
              <div className="mt-4">
              <NavLink
              to="/cart">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  ADD TO CART <CiShoppingCart className="inline-block ml-2" size={20} />
                </button>
              </NavLink>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductmodal;