import React, { useState } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, setDoc } from "firebase/firestore";

import { db } from "../firebase"; // Assuming you have exported the Firestore instance as 'db'

const Dashboard = () => {
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="code"
        placeholder="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="number"
        name="usageCount"
        placeholder="usage count"
        value={usageCount}
        onChange={(e) => setUsageCount(Number(e.target.value))}
      />
      <button type="submit">Buy Now</button>
    </form>
  );
};

export default Dashboard;
