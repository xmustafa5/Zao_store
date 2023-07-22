import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [prices, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        console.log(productsData.price);
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
    <AuthContext.Provider
      value={{
        products,
        selectedProduct,
        setPrice,
        isPopupOpen,
        isOverlayVisible,
        setIsOverlayVisible,
        setIsPopupOpen,
        prices,
        handleBuyProduct,
        applyDiscountCode,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
