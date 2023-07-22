import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'
const Requests = () => {
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
    <section className="pro">
    <div className="fex titles">
      <h1>Requests</h1>
    </div>
    {requests.length > 0 ? (
      <ul className="content d">
        {requests.map((request) => (
          <li className="borditem " key={request.id}>
            <div className="pb-2">
              <div className="fex inputs">
                <div className="flex w-full justify-center text-lg mb-2">
                  <p> {request.name}</p>
                  <p> - {request.location}</p>
                  <p>- {request.number  }</p>
                </div>
             
                <h1 className="text-xl mt-2">الطلب:</h1>
              </div>
              <div></div>
              {request.productData && (

                      <div className="projcardo">
                                        <img src={request.productData.imgUrl} alt={request.productData.title} />

                        <div className="sssso">
                          <div className="projimg">
                            <img src={request.productData.imgUrl} alt="Selected Option" />
                          </div>
                          {/* <img src={imageSource} alt="Selected Option"  /> */}
                        </div>
                        <div className="projinfo">
                          <strong className="projtitle">
                            <span className="titlecard">{request.productData.title} </span>
                            {/* <div className="centerbrn">
                              {item.color && (
                                <button className={`radio-buttono`}>
                                  {item.color}
                                </button>
                              )}
                            </div> */}
                          </strong>
                          <div className="prices">
                            <p className="iopp">{request.productData.price}$</p>
                          </div>
                         
                        </div>
                      </div>
                              )}

              ) 
            </div>
          
          </li>
        ))}
      </ul>
    ) : (
      <div className="noitem">
        <h1>No requests available.</h1>
      </div>
    )}
  </section>
  );
};
export default Requests;
