import {  createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const AuthContext = createContext()
const AuthProvider = ({ children }) => { 
      const [count,setcount]=useState(0)
      const [products, setProducts] = useState([]);
       const [isLoading, setIsLoading] = useState(true);

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
  return (
    <AuthContext.Provider value={{count,setcount,isLoading,products }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


export const useAuth =() =>{
    return useContext(AuthContext)
}