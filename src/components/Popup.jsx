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
  setPrice,
  price,
  products,
  selectedProduct,
  setIsPopupOpen,
  setIsOverlayVisible,
}) => {
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
        price: price || 0, // Set a default value of 0 if price is null
      };

      // Apply discount code if it matches the selected product
      applyDiscountCode();

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
      const docRef = await addDoc(collection(db, "requests"), productData);
    console.log("Document written with ID: ", docRef.id);

      // Reset the input fields
      setName("");
      setLocation("");
      setNumber("");
      setDiscountCode("");

      // Close the popup
      setIsPopupOpen(false);
      setIsOverlayVisible(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      {/* <h3>{selectedProduct.title}</h3>
  <img
    src={selectedProduct.imgUrl}
    alt={selectedProduct.title}
    width={110}
  />
  <p>Price: ${price}</p>
  Display the price */}

      <div className="mb-5  inp  ">
        <label
          for="default-input"
          class="block mb-2 containetinput  font-medium text-gray-900 dark:text-white"
        >
          الاسم
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          type="text"
          id="default-input"
          class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-5">
        <label
          for="default-input"
          class="block mb-2  containetinput text-gray-900 dark:text-white  rtl:"
        >
          العنوان
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-5">
        <label
          for="default-input"
          class="block mb-2  containetinput text-gray-900 dark:text-white"
        >
          رقم الهاتف
        </label>
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-5">
        <label
          for="default-input"
          class="block mb-2  containetinput text-gray-900 dark:text-white"
        >
          كود الخصم
        </label>
        <div class="relative discontinput">
          <input
            value={discountCode}
            onChange={handleDiscountCodeChange}
            type="search"
            id="search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            onClick={applyDiscountCode}
            type="submit"
            class="text-white check absolute left-2.5 bottom-2.5 focus:ring-2  focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-blue-800"
          >
            تاكيد
          </button>
        </div>
      </div>
      {/* <input
    type="text"
   
    placeholder="Name"
    required
  />
  <input
    type="text"
   
    placeholder="Location"
    required
  />
  <input
    type="tel"

    placeholder="Number"
    required
  />
  <input
    type="text"
   
    placeholder="Discount Code"
    required
  /> */}
      {/* <button type="button" >
    Apply Code
  </button> */}
      <div className={"homebtngroup"}>
        <button
  type="submit"
 
  className={"btnbtnprimary"}
  data-aos="zoom-in"
  data-aos-duration="1400"
>
  <p className={"btntext3"}> شراء </p>
  <span className={"square"}></span>
</button>
        {/* <Link href="/aboutus">
              <button onClick={"handleButton1Click"}
                className={"btnbtnsecondary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"}>Discover your current vision</p>
                <span className={"square"}></span>
              </button>
            </Link> */}
      </div>
      {/* <button type="submit" className='btntext3'>طلب الان</button> */}
    </form>
  );
};

export default Popup;
