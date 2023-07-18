import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Popup from "./Popup";

const Cards = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setPrice(product.price); // Set the price to the priceCode of the selected product
    setIsPopupOpen(true);
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };


  if (isPopupOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      {products.map((product, index) => (
        <ul className="content">
        <li className="">
          <div className="projcard boxs">
            <div className="ssss">
              <div className="projimg">
                <img src={imageSource} alt="Selected Option" />
              </div>
              {/* <img src={imageSource} alt="Selected Option"  /> */}
            </div>
            <div className="projinfo">
              <strong className="projtitle">
                <span className="titlecard">{title}</span>
                <div>
                  {color1 && (
                    <button
                      className={`radio-button ${
                        selectedOption === "option1" ? "active" : ""
                      }`}
                      onClick={() => handleOptionClick("option1")}
                    >
                      <p className="btntext2 "> {color1}</p>
                    </button>
                  )}
                  {color2 && (
                    <button
                      className={`radio-button ${
                        selectedOption === "option2" ? "active" : ""
                      }`}
                      onClick={() => handleOptionClick("option2")}
                    >
                      <p className="btntext2"> {color2}</p>
                    </button>
                  )}
                </div>
              </strong>
              <div className="prices">
                <p className="iopp">{price}$</p>
              </div>
            </div>
            <div className="fexbtn">
              {/* <button className="button-5" onClick={handleAddToBasket}>
                Add to Basket
              </button> */}
              {/* <button className="button-29" onClick={handlePopupToggle}>
                Add to Basket
              </button> */}

              <div className={"homebtngroup1"}>
                <button className={"btnbtnprimary"} onClick={handleAddToBasket}>
                  <p className={"btntext1"}>Buy</p>
                  <span className={"square"}></span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      ))}
      {isOverlayVisible && <div className="overlay"></div>}
      {isPopupOpen && (
            <div className="modal">
            <div onClick={handleBuyProduct} className="overlay"></div>
            <div className="modal-content">
          <Popup
            handleBuyProduct={handleBuyProduct}
            selectedProduct={selectedProduct}
            products={products}
            setIsPopupOpen={setIsPopupOpen}
            setIsOverlayVisible={setIsOverlayVisible}
            setPrice={setPrice}
            price={price}
            
          />
        </div>
     </div>   )}  
        
      {/* {popupVisible && selectedProduct && (
        <Popup selectedProduct={selectedProduct} products={products} setPopupVisible={setPopupVisible}  setPrice={setPrice} price={price} products={products}/>
      )} */}
    </>
  );
};

export default Cards;
