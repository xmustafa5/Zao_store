import React, { useState,useEffect} from 'react'
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Popup = (setPrice,price,products,selectedProduct,setPopupVisible) => {
    const [discountCode, setDiscountCode] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [number, setNumber] = useState("");

    const handleDiscountCodeChange = (e) => {
        setDiscountCode(e.target.value);
      };
      const applyDiscountCode = () => {
        try {
          const product = products.find((p) => p.id === selectedProduct.id);
          if (product && product.priceCode && discountCode === product.code) {
            setPrice(product.priceCode);
            console.log("Discount applied successfully!");
          } else {
            setPrice(selectedProduct.price);
            console.log("Invalid product or discount code not available");
          }
        } catch (error) {
          console.error("Error applying discount code: ", error);
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const productData = {
            name,
            location,
            number,
            price,
          };
    
          // Apply discount code if it matches the selected product
          applyDiscountCode();
    
          // Decrease the usageCount in all product documents
          const productsQuerySnapshot = await getDocs(collection(db, "products"));
          productsQuerySnapshot.forEach(async (productDoc) => {
            const productRef = doc(db, "products", productDoc.id);
            const productData = productDoc.data();
            if (productData.code === discountCode && productData.usageCount && productData.usageCount > 0) {
              const updatedUsageCount = productData.usageCount - 1;
              await updateDoc(productRef, { usageCount: updatedUsageCount });
            }
          });
    
          // Add the productData to the Firestore collection
          const docRef = await addDoc(collection(db, "requests"), productData);
          console.log("Document written with ID: ", docRef.id);
    
          // Reset the input fields
          setName("");
          setLocation("");
          setNumber("");
          setDiscountCode("");
    
          // Close the popup
          setPopupVisible(false);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };
  return (
    <div className="popup">
          <form onSubmit={handleSubmit}>
            <h3>{selectedProduct.title}</h3>
            <img
              src={selectedProduct.imgUrl}
              alt={selectedProduct.title}
              width={110}
            />
            <p>Price: ${price}</p>
            {/* Display the price */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Number"
              required
            />
            <input
              type="text"
              value={discountCode}
              onChange={handleDiscountCodeChange}
              placeholder="Discount Code"
              required
            />
            <button type="button" onClick={applyDiscountCode}>
              Apply Code
            </button>
            <button type="submit">Buy Now</button>
          </form>
        </div>
  )
}

export default Popup