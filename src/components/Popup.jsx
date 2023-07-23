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
import "./pop.css";
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
  //   <form onSubmit={handleSubmit} className="form">
   
  //     <div className="mb-5  inp  ">
  //       <label
  //         for="default-input"
  //         class="block mb-2 containetinput  font-medium text-gray-900 dark:text-white"
  //       >
  //         الاسم
  //       </label>
  //       <input
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //         placeholder="name"
  //         type="text"
  //         id="default-input"
  //         class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //       />
  //     </div>
  //     <div class="mb-5">
  //       <label
  //         for="default-input"
  //         class="block mb-2  containetinput text-gray-900 dark:text-white  rtl:"
  //       >
  //         العنوان
  //       </label>
  //       <input
  //         value={number}
  //         onChange={(e) => setLocation(e.target.value)}
  //         type="text"
  //         id="default-input"
  //         class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //       />
  //     </div>
  //     <div class="mb-5">
  //       <label
  //         for="default-input"
  //         class="block mb-2  containetinput text-gray-900 dark:text-white"
  //       >
  //         رقم الهاتف
  //       </label>
  //       <input
  //         value={number}
  //         onChange={(e) => setNumber(e.target.value)}
  //         type="text"
  //         id="default-input"
  //         class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //       />
  //     </div>
  //     <div class="flex items-center mb-4">
  //       <input
  //         id="default-checkbox"
  //         type="checkbox"
  //         checked={discountEnabled}
  //         onChange={(e) => setDiscountEnabled(e.target.checked)}
  //         value=""
  //         class="w-4 h-4 0 dark:focus:ring-orange-600 dark:ring-offset-gray-800   dark:border-gray-600"
  //       />
  //       <label
  //         for="default-checkbox"
  //         class="mr-2  font-medium text-gray-900 dark:text-gray-300"
  //       >
  //         {" "}
  //         لدي كود الخصم
  //       </label>
  //     </div>

  //     <div className="mb-5">
  //       <label
  //         for="discount-input"
  //         className="block mb-2 containetinput text-gray-900 dark:text-white"
  //       >
  //         كود الخصم
  //       </label>
  //       <div
  //         className={`relative discontinput ${
  //           discountEnabled ? "" : "opacity-70"
  //         }`}
  //       >
  //         <input
  //           value={discountCode}
  //           onChange={handleDiscountCodeChange}
  //           type="text"
  //           id="discount-input"
  //           disabled={!discountEnabled} // Add the disabled attribute based on discountEnabled state
  //           className={`block w-full p-4 ${
  //             discountEnabled ? "" : "cursor-not-allowed"
  //           }
                
  //             } bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
  //             `}
  //         />

  //         <button
  //           onClick={applyDiscountCode}
  //           type="button"
  //           className="text-white check absolute left-2.5 bottom-2 focus:ring-2 z-30 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 dark:focus:ring-orange-400"
  //         >
  //           تاكيد
  //         </button>
  //         <div className="text-white checkprice absolute left-16 bottom-2.5  z-10  font-medium rounded-md text-sm px-4 py-1.5">
  //           <p className="">{prices} الف</p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* <input
  //    type="text"
   
  //    placeholder="Name"
  //    required
  //  />
  //  <input
  //    type="text"
   
  //    placeholder="Location"
  //    required
  //  />
  //  <input
  //    type="tel"

  //    placeholder="Number"
  //    required
  //  />
  //  <input
  //    type="text"
   
  //    placeholder="Discount Code"
  //    required
  //  /> */}
  //     {/* <button type="button" >
  //    Apply Code
  //  </button> */}
  //     <div className={"homebtngroup"}>
  //       <button
  //         type="submit"
  //         className={"btnbtnprimary"}
  //         data-aos="zoom-in"
  //         data-aos-duration="1400"
  //       >
  //         <p className={"btntext3"}> شراء </p>
  //         <span className={"square"}></span>
  //       </button>
  //       {/* <Link href="/aboutus">
  //              <button onClick={"handleButton1Click"}
  //                className={"btnbtnsecondary"}
  //                data-aos="zoom-in"
  //                data-aos-duration="1400"
  //              >
  //                <p className={"btntext"}>Discover your current vision</p>
  //                <span className={"square"}></span>
  //              </button>
  //            </Link> */}
  //     </div>
  //     {/* <button type="submit" className='btntext3'>طلب الان</button> */}
  //   </form>
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
