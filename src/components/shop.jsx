
import Cards from "./Cards";
import "./buttoncss.css"
import Loading from "../components/Loading";
import { useState } from "react";
const Shop = ({products,isLoading}) => {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prices, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);


 
  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setPrice(product.price); // Set the price to the priceCode of the selected product
    setIsPopupOpen(true);
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };
  
  return (
    <div>
          <section className="pro"   id="shop">
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
