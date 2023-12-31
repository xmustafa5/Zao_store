import React, { useState } from "react";
import downShape from "../assets/images/shape-down-orange.png";
import upShape from "../assets/images/shape-up-orange.png";
import Popup from "./Popup";
import "./cards.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cards = ({

  productLink,
  handleBuyProduct,
  isOverlayVisible,
  isPopupOpen,
  setIsOverlayVisible,
  setIsPopupOpen,
  imgUrl,
  title,
  price,
  prices,
  setPrice,
  products,
  selectedProduct,
  
}) => {
  const { discountCode, setDiscountCode,applyDiscountCode } = useAuth();


   if (isPopupOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      <ul className="content">
        <li className="">
          <div className="projcard boxs">
            <div className="ssss">
              <div className="projimg">
                <img src={imgUrl} alt="Selected Option" />
              </div>
              {/* <img src={imageSource} alt="Selected Option"  /> */}
            </div>
            <div className="projinfo">
              <strong className="projtitle">
                <span className="titlecard">{title}</span>
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
                <button className={"btnbtnprimary"} onClick={handleBuyProduct}>
                <Link to={productLink} className="btnbtnprimary">
              <p className="btntext1">Buy</p>
             <span className="square"></span>
             </Link>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {isOverlayVisible && <div className="overlay"></div>}
      {isPopupOpen && (
        <div className="modal">
          <div onClick={handleBuyProduct} className="overlay"></div>
          <div className="modal-content  ">
            <img src={downShape} className="downShap" alt="downShape" />
            <img src={upShape} className="upShap" alt="upShape" />
            <Popup
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

      {/* {popupVisible && selectedProduct && (
        <Popup selectedProduct={selectedProduct} products={products} setPopupVisible={setPopupVisible}  setPrice={setPrice} price={price} products={products}/>
      )} */}
    </>
  );
};

export default Cards;