import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsRef = collection(db, 'requests');
        const snapshot = await getDocs(requestsRef);
        const requestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching requests: ', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Requests List</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <p>Name: {request.name}</p>
            <p>Location: {request.location}</p>
            <p>Number: {request.number}</p>
            {/* Render the product data if available */}
            {request.productData && (
              <div>
                <p>Product Title: {request.productData.title}</p>
                <img src={request.productData.imgUrl} alt={request.productData.title} />
                <p>Product Price: {request.productData.price}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestsList;
