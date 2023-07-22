import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Cards from "./Cards";
import "./buttoncss.css"
import { useParams } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prices, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);    console.log(productsData.price);

      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);


  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setPrice(product.price); // Set the price to the priceCode of the selected product
    setIsPopupOpen(true);
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

 
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
