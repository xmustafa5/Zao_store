import React, { useState,useEffect} from 'react'
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./Model.css"
const Popup = ({
  setPrice,
  price,
  products,
  selectedProduct,
  setIsPopupOpen,
  setIsOverlayVisible,
})=> {    const [discountCode, setDiscountCode] = useState("");
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
        setIsPopupOpen(false);
        setIsOverlayVisible(false)
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };
  return (

<form  onSubmit={handleSubmit}>
  {/* <h3>{selectedProduct.title}</h3>
  <img
    src={selectedProduct.imgUrl}
    alt={selectedProduct.title}
    width={110}
  />
  <p>Price: ${price}</p>
  Display the price */}

<div class="mb-6 ">
    <label for="default-input" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">الاسم</label>
    <input placeholder="name" type="text" id="default-input" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
<div class="mb-6">
    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white  rtl:">العنوات</label>
    <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
<div class="mb-6">
    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label>
    <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
<div class="mb-6">
    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label>
    <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
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
  )
}

export default Popup