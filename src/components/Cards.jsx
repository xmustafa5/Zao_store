import React, { useState,useEffect} from 'react'
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Popup from './Popup';

const Cards = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");

  const handleDiscountCodeChange = (e) => {
      setDiscountCode(e.target.value);
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
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const productData = {
          name,
          location,
          number,
          price,
        };
  
        // Apply discount code if it matches the selected product
        applyDiscountCode();
  
        // Decrease the usageCount in all product documents
        const productsQuerySnapshot = await getDocs(collection(db, "products"));
        productsQuerySnapshot.forEach(async (productDoc) => {
          const productRef = doc(db, "products", productDoc.id);
          const productData = productDoc.data();
          if (productData.code === discountCode && productData.usageCount && productData.usageCount > 0) {
            const updatedUsageCount = productData.usageCount - 1;
            await updateDoc(productRef, { usageCount: updatedUsageCount });
          }
        });
  
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
  
  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setPrice(product.price); // Set the price to the priceCode of the selected product
    setIsPopupOpen(true);
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
  return (
    <>
    <p className="text-3xl ">التعاون مع المصممين ومطوري الواجهة الخلفية لتحويل تصاميم واجهة المستخدم إلى واجهات ويب عمليبية.</p>      {products.map((product, index) => (
        <div key={index} >
          <h3>{product.title}</h3>
          <img src={product.imgUrl} alt={product.title} width={110} />
          <p>Price: ${product.price}</p>
          <button onClick={() => handleBuyProduct(product)}>Buy</button>
        </div>
      ))}
        {isOverlayVisible && <div className="overlay"></div>}
      {isPopupOpen && (
        <div className="popuplog ">
           <div className="modal">
              <div onClick={handleBuyProduct} className="overlay"></div>
              <div className="modal-content">
          <form onSubmit={handleSubmit}>
            {/* <h3>{selectedProduct.title}</h3>
            <img
              src={selectedProduct.imgUrl}
              alt={selectedProduct.title}
              width={110}
            />
            <p>Price: ${price}</p>
            Display the price */}
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
        </div>
        </div>
      )}
      {/* {popupVisible && selectedProduct && (
        <Popup selectedProduct={selectedProduct} products={products} setPopupVisible={setPopupVisible}  setPrice={setPrice} price={price} products={products}/>
      )} */}
    </>
  )
}

export default Cards