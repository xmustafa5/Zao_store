import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get the reference to the product document using the productId
        const productRef = doc(db, "products", productId);
        // Fetch the document data
        const productDoc = await getDoc(productRef);
        // Check if the document exists
        if (productDoc.exists()) {
          // If the product document exists, set the product state with the data
          setProduct(productDoc.data());
        } else {
          // Handle the case where the product document does not exist
          console.log("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Render the product details once the data is fetched
  if (product) {
    return (
      <div>
        <div className="right-image">
          <img src={product.imageUrl1} alt="" />
        </div>
        <div className="left-info">
          <div className="title-prodect">{product.title}</div>
          <hr />
          <div>
            <div>
                {product.price}الف
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur voluptates itaque magnam error corrupti accusantium
                voluptatem labore placeat, sint, harum eum vitae? Delectus natus
                veniam aut molestiae amet, est perspiciatis enim adipisci
                mollitia architecto unde obcaecati. Quam officiis eveniet nulla
                dolorem iure provident dolores!
              </p>
            </div>
            التوصيل كذا سعر
          </div>
          <div className={"homebtngroup1"}>
                <button className={"btnbtnprimary"} onClick={handleBuyProduct}>
              <p className="btntext1">Buy</p>
             <span className="square"></span>
                </button>
              </div>
        </div>
      </div>
    );
  }

  // Render a loading state while the data is being fetched
};

export default SingleProduct;
