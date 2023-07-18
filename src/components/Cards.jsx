import React, { useState,useEffect} from 'react'
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Popup from './Popup';

const Cards = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [price, setPrice] = useState(null);
  const [products, setProducts] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };
  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setPrice(product.price); // Set the price to the priceCode of the selected product
    setPopupVisible(true);
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

      {popupVisible && selectedProduct && (
        <Popup/>
      )}
    </>
  )
}

export default Cards