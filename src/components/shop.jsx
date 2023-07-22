import React, { useState, useEffect } from "react";

import Cards from "./Cards";
import "./buttoncss.css"
import { useParams } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Shop = () => {
  const { productId } = useParams();
  
  const {  products,
    selectedProduct,
    setPrice,
    isPopupOpen,
    isOverlayVisible,
    setIsOverlayVisible,
    setIsPopupOpen,
    prices,
    handleBuyProduct,
    } = useAuth();

 

 



 
  return (
    <div>
          <section className="pro" id="shop">
          <div className="fex titles">
            
            <h2>اشتري ما يعجبك</h2>
          </div>
          <div className="r" >
      {products.map((product) => (
        <Cards
        key={product.id}
        imgUrl={product.imageUrl1} // Pass the correct imgUrl prop
        title={product.title} // Pass the correct title prop
        price={product.price} // Pass the correct prices prop
        handleBuyProduct={() => handleBuyProduct(product)} // Pass the handleBuyProduct function with the product
        products={products}
        selectedProduct={selectedProduct}
        setPrice={setPrice}
        isPopupOpen={isPopupOpen}
        isOverlayVisible={isOverlayVisible}
        setIsOverlayVisible={setIsOverlayVisible}
        setIsPopupOpen={setIsPopupOpen}
        prices={prices}
        productLink={`/single-product/${product.id}`}

          />        

      ))}

    </div>
        </section> 
        
           </div>
  );
};

export default Shop;
