import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Smpop from "./Smpop";

import "./Model.css";
import { Link } from "react-router-dom";
import downShape from "../assets/images/shape-down-orange.png";
import upShape from "../assets/images/shape-up-orange.png";
const Popup = ({
  setDiscountCode,
  discountCode,
  selectedProduct,
  price,
  prices,
  applyDiscountCode,
  setIsOverlayVisible,
  setIsPopupOpen,
  handleBuyProduct,
  isOverlayVisible,
  isPopupOpen,
}) => {
  const [isPopupOpent, setIsPopupOpent] = useState(false);
  const [isOverlayVisiblet, setIsOverlayVisiblet] = useState(false);
  const handleBuyProducttow = (product) => {
   
    setIsPopupOpent(!isPopupOpent);
    setIsOverlayVisiblet(!isOverlayVisiblet);
    console.log("dd");
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
    <div className={"homebtngroup1"}>
                <button className={"btnbtnprimary"} onClick={handleBuyProducttow}>
                  <p className={"btntext1"}>Buy</p>
                  <span className={"square"}></span>
                </button>
              </div>
     {isOverlayVisiblet && <div className="overlay"></div>}
      {isPopupOpent && (
        <div className="modal">
          <div onClick={handleBuyProducttow} className="overlay"></div>
          <div className="modal-content  ">
            <img src={downShape} className="downShap" alt="downShape" />
            <img src={upShape} className="upShap" alt="upShape" />
            <Smpop
              applyDiscountCode={applyDiscountCode}
              setIsOverlayVisible={setIsOverlayVisible}
              setIsPopupOpen={setIsPopupOpen}
              prices={prices}
              price={price}
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              selectedProduct={selectedProduct}
              />
          </div>
        </div>
      )} 
  </div>
    
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
