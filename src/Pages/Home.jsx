import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Hompg from "../components/Hompg";
import Shop from "./../components/Shop";
import Loading from "./../components/Loading";

const Home = () => {
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Hompg />
      <Shop products={products}  />
    </>
  );
};

export default Home;
