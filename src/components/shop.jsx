import React from 'react'
import Cards from './Cards';
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
const Shop = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      
      <Card
                key={product.id}
                title={product.title}
                color1={product.color1}
                color2={product.color2}
                imageUrl1={product.imageUrl1}
                imageUrl2={product.imageUrl2}
                price={product.price}
                basketItems={basketItems}
                addToBasket={handleAddToBasket}
                setPopupMessage={setPopupMessage}
                setShowPopup={setShowPopup}
                handlePopupToggle={handlePopupToggle}
              />
            ))}
    </div>
  )
}

export default Shop