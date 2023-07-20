import React, { useState } from "react";
import downShape from '../assets/images/shape-down-orange.png'
import Popup from "./Popup";
import "./cards.css"
const Cards = ({title,prices,imgUrl,products}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
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
                <p className="iopp">{prices}$</p>
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
                <button className={"btnbtnprimary"} onClick={handleBuyProduct} >
                  <p className={"btntext1"} >Buy</p>
                  <span className={"square"}></span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {isOverlayVisible && <div className="overlay"></div>}
      {isPopupOpen && (
        <div className="modal" >
          <div onClick={handleBuyProduct} className="overlay"></div>
          <div className="modal-content  ">          <img src={downShape} className="downShap" alt="downShape" />

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
        </div>
      )}

      {/* {popupVisible && selectedProduct && (
        <Popup selectedProduct={selectedProduct} products={products} setPopupVisible={setPopupVisible}  setPrice={setPrice} price={price} products={products}/>
      )} */}
    </>
  );
};

export default Cards;
