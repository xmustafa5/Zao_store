import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState(null);

  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setPrice(product.price); // Set the default price
    setPopupVisible(true);
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscountCode = async () => {
    try {
      const discountQuerySnapshot = await getDocs(collection(db, "products"));
      const discounts = discountQuerySnapshot.docs.map((doc) => doc.data());
  
      const discount = discounts.find((d) => d.code === discountCode);
  
      if (discount) {
        setPrice(discount.priceCode);
        console.log("Discount applied successfully!");
      } else {
        console.log("Invalid discount code");
      }
    } catch (error) {
      console.error("Error applying discount code: ", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name,
        location,
        number,
        price,
      };

      // Add the productData to the Firestore collection
      const docRef = await addDoc(collection(db, "requests"), productData);
      console.log("Document written with ID: ", docRef.id);

      // Reset the input fields
      setName("");
      setLocation("");
      setNumber("");
      setDiscountCode("");

      // Close the popup
      setPopupVisible(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.title}</h3>
          <img src={product.imgUrl} alt={product.title} width={110} />
          <p>Price: ${product.price}</p>
          <button onClick={() => handleBuyProduct(product)}>Buy</button>
        </div>
      ))}

      {popupVisible && selectedProduct && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <h3>{selectedProduct.title}</h3>
            <img
              src={selectedProduct.imgUrl}
              alt={selectedProduct.title}
              width={110}
            />
            <p>Price: ${price}</p> {/* Display the price */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Number"
              required
            />
            <input
              type="text"
              value={discountCode}
              onChange={handleDiscountCodeChange}
              placeholder="Discount Code"
              required
            />
            <button type="button" onClick={applyDiscountCode}>
              Apply Code
            </button>
            <button type="submit">Buy Now</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Home;
