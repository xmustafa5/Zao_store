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
  if (isPopupOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      <p className="text-3xl ">
        التعاون مع المصممين ومطوري الواجهة الخلفية لتحويل تصاميم واجهة المستخدم
        إلى واجهات ويب عمليبية.
      </p>{" "}
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.title}</h3>
          <img src={product.imgUrl} alt={product.title} width={110} />
          <p>Price: ${product.price}</p>
          <button onClick={() => handleBuyProduct(product)}>Buy</button>
        </div>
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
