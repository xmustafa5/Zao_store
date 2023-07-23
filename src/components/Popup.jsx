import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import "./Model.css";
import { Link } from "react-router-dom";
const Popup = ({
  setDiscountCode,
  discountCode,
  selectedProduct,
  price,
  prices,
  applyDiscountCode,
  setIsOverlayVisible,
  setIsPopupOpen,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [discountEnabled, setDiscountEnabled] = useState(false);

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        id: selectedProduct.id,
        title: selectedProduct.title,
        imgUrl: selectedProduct.imageUrl1,
        price: price || 0, // Set a default value of 0 if price is null
      };
      const requestData = {
        name,
        location,
        number,
        productData, // Include the selected product information in the request data
        // ... (other information you want to include in the request)
      };

      applyDiscountCode();
      // Apply discount code if it matches the selected product
      // applyDiscountCode();

      // Decrease the usageCount in all product documents
      const productsQuerySnapshot = await getDocs(collection(db, "products"));
      productsQuerySnapshot.forEach(async (productDoc) => {
        const productRef = doc(db, "products", productDoc.id);
        const productData = productDoc.data();
        if (
          productData.code === discountCode &&
          productData.usageCount &&
          productData.usageCount > 0
        ) {
          const updatedUsageCount = productData.usageCount - 1;
          await updateDoc(productRef, { usageCount: updatedUsageCount });
        }
      });

      // Add the productData to the Firestore collection
      const docRef = await addDoc(collection(db, "requests"), requestData);
      console.log("Document written with ID: ", docRef.id);

      // Reset the input fields
      setName("");
      setLocation("");
      setNumber("");
      setDiscountCode("");
      setIsPopupOpen(false);
      setIsOverlayVisible(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className="popup-content">
    <div className="left-popup"></div>
    <img
      src={selectedProduct.imageUrl1} // Display the image of the selected product
      alt={selectedProduct.title}
    />
    <div className="right-popup">
      <div className="title-popup">
        <h3>{selectedProduct.title}</h3>
      </div>
      <hr />
      <p>{prices}$</p>
      <p>
      {selectedProduct.discrabe}
      </p>
    </div>

  </div>
    
    // {/* <div className="popup">
    // <form onSubmit={handleSubmit}>
    //    <h3>{selectedProduct.title}</h3>
    //   <img
    //     src={selectedProduct.imgUrl}
    //     alt={selectedProduct.title}
    //     width={110}
    //   />
    //   <p>Price: ${price}</p>
    //   {/* Display the price */}
    //   <input
    //     type="text"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     placeholder="Name"
    //     required
    //   />
    //   <input
    //     type="text"
    //     value={location}
    //     onChange={(e) => setLocation(e.target.value)}
    //     placeholder="Location"
    //     required
    //   />
    //   <input
    //     type="tel"
    //     value={number}
    //     onChange={(e) => setNumber(e.target.value)}
    //     placeholder="Number"
    //     required
    //   />
    //   <input
    //     type="text"
    //     value={discountCode}
    //     onChange={handleDiscountCodeChange}
    //     placeholder="Discount Code"
    //     required
    //   />
    //   <button type="button" onClick={applyDiscountCode}>
    //     Apply Code
    //   </button>
    //   <button type="submit">Buy Now</button>
    // </form>
    // </div> */}
  );
};

export default Popup;
