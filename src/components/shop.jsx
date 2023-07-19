import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Cards from "./Cards";
import "./buttoncss.css"
const Shop = () => {
  const [products, setProducts] = useState([]);

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
          <section className="pro" id="shop">
          <div className="fex titles">
            
            <h2>اشتري ما يعجبك</h2>
          </div>
          <div className="r">
      {products.map((product) => (
        <Cards
          key={product.id}
          title={product.title}
          imgUrl={product.imgUrl}
          price={product.price}
          products={products} // Pass the array of products as a prop
        />
      ))}

    </div>
        </section> 
           </div>
  );
};

export default Shop;
