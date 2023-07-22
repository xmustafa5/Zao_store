import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get the reference to the product document using the productId
        const productRef = doc(db, 'products', productId);
        // Fetch the document data
        const productDoc = await getDoc(productRef);
        // Check if the document exists
        if (productDoc.exists()) {
          // If the product document exists, set the product state with the data
          setProduct(productDoc.data());
        } else {
          // Handle the case where the product document does not exist
          console.log('Product not found!');
        }
      } catch (error) {
        console.error('Error fetching product: ', error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Render the product details once the data is fetched
  if (product) {
    return (
        <div>
        <div className='left-image'>
  
        </div>
        <div className='right-info'>
          <div className='title'>
              {productId.name}
              
          </div>
        </div>
      </div>
    );
  }

  // Render a loading state while the data is being fetched
  return <p>Loading...</p>;
};

export default SingleProduct;
