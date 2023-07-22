import React, { useState } from "react";

import "./cards.css";
import { Link } from "react-router-dom";
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
  const [discountCode, setDiscountCode] = useState("");
  
  const applyDiscountCode = () => {
    try {
      const product = products.find((p) => p.id === selectedProduct.id);
      if (product && product.priceCode && discountCode === product.code) {
        setPrice(product.priceCode);
        console.log("Discount applied successfully!");
      } else {
        setPrice(selectedProduct.price);
        console.log("Invalid product or discount code not available");
      }
    } catch (error) {
      console.error("Error applying discount code: ", error);
    }
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
                  <Link to={productLink} className="btnbtnprimary">
                  <p className="btntext1">Buy</p>
                  <span className="square"></span>
                 </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>

  

      {/* {popupVisible && selectedProduct && (
        <Popup selectedProduct={selectedProduct} products={products} setPopupVisible={setPopupVisible}  setPrice={setPrice} price={price} products={products}/>
      )} */}
    </>
  );
};

export default Cards;
