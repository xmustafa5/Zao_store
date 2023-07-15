import React, { useState } from "react";
import { collection, getDocs, addDoc, query, updateDoc, doc } from "firebase/firestore";

import { db } from "../firebase"; // Assuming you have exported the Firestore instance as 'db'

const Dashboard = () => {
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productsQuerySnapshot = await getDocs(collection(db, "products"));
      
      // Iterate over each document in the "products" collection
      productsQuerySnapshot.forEach((productDoc) => {
        const productRef = doc(db, "products", productDoc.id);

        // Update the product document with the entered code
        updateDoc(productRef, { discount: code })
          .then(() => {
            console.log("Code added to product: ", productDoc.id);
          })
          .catch((error) => {
            console.error("Error updating product: ", error);
          });
      });

      setCode("");
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
      <button type="submit">Buy Now</button>
    </form>
  );
};

export default Dashboard;
