import React, { useState } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, setDoc } from "firebase/firestore";

import { db } from "../firebase"; // Assuming you have exported the Firestore instance as 'db'
import "./Dashpord.css";

const Dashboard = ({products}) => {
  const [code, setCode] = useState("");
  const [usageCount, setUsageCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productsQuerySnapshot = await getDocs(collection(db, "products"));

      // Iterate over each document in the "products" collection
      productsQuerySnapshot.forEach(async (productDoc) => {
        const productRef = doc(db, "products", productDoc.id);

        // Add the usageCount field to each product document
        await setDoc(productRef, { usageCount: usageCount }, { merge: true });

        // Update the product document with the entered code
        await updateDoc(productRef, { code: code });
        
        console.log("Code added to product: ", productDoc.id);
      });

      setCode("");
      setUsageCount(0);
    } catch (error) {
      console.error("Error getting products: ", error);
    }
  };
  const handleIncrement = () => {
    setUsageCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setUsageCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard-form ">
      <div className="mb-4">
              <h1 className="fex titles">اضافه دسكاونت</h1>

      </div>
        <div className="flex gap-5 dddddddddd">

       <input
        type="text"
        name="code"
        placeholder="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

      />
       <div className="dashboard-number-input form-control quantity"> {/* Use a div as the container */}
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        <input
          type="number"
          name="usageCount"
          placeholder="Enter usage count"
          value={usageCount}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500  w-10 text-center p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

          onChange={(e) => setUsageCount(Number(e.target.value))}
        />
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>
      <div className={"homebtngroup1 dddddddddd"}>
                <button className={"btnbtnprimary"} >
                  <p className={"btntext5"}>اضافه</p>
                  <span className={"square"}></span>
                </button>
              </div>
             
      </div>

    </form>
  );
};

export default Dashboard;
