import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const Items = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [priceCode, setPriceCode] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to Firebase
    const db = firebase.firestore();
    db.collection("products")
      .add({
        imgUrl,
        title,
        price,
        priceCode,
      })
      .then(() => {
        // Clear form inputs after successful submission
        setImgUrl("");
        setTitle("");
        setPrice("");
        setPriceCode("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Price Code:
          <input
            type="text"
            value={priceCode}
            onChange={(e) => setPriceCode(e.target.value)}
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default Items;
