import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setPopupVisible(true);
    // Additional logic related to buying the product
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let price = selectedProduct.price;
  
      if (discountedPrice) {
        price = discountedPrice;
      }
  
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
      setSelectedProduct(null);
      setDiscountedPrice(null);
  
      // Close the popup
      setPopupVisible(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products"); // Replace "products" with your actual collection name
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchDiscountCode = async () => {
      try {
        const discountRef = collection(db, "Discount");
        const snapshot = await getDocs(discountRef);
        const discountData = snapshot.docs.map((doc) => doc.data());
        const matchedDiscount = discountData.find(
          (discount) => discount.code === discountCode
        );
  
        if (matchedDiscount) {
          setDiscountedPrice(matchedDiscount.pricecode);
        } else {
          setDiscountedPrice(null);
        }
      } catch (error) {
        console.error("Error fetching discount code: ", error);
      }
    };
  
    fetchDiscountCode();
  }, [discountCode]);
  
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
          <p>
  Price: ${discountedPrice || selectedProduct.price}
</p>            <input
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
            
            <button type="submit">Buy Now</button>
          </form>
          <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Discount Code"
            /> 
            <button>enter discount Code</button>
        </div>
      )}
    </>
  );
};

export default Home;
