import React, { useState, useEffect,useRef  } from "react";
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
const Shop = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prices, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
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

 
  const shopRef = useRef(null); // Create a ref for the "shop" section



 
  return (
    <div>
          <section className="pro" ref={shopRef}  id="shop">
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
          />        

      ))}

    </div>
        </section> 
        
           </div>
  );
};

export default Shop;
