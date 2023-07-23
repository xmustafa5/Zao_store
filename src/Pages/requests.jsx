import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'
import  './items.css';
import  './requests.css';
import  '../components/cards.css';
import logo from "../assets/images/LogoZao.png"
import backlogo from "../assets/images/backlogoshape.png"
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
    const handleDeleteRequest = async (requestId) => {
      try {
        // Delete the document from the Firestore collection
        await deleteDoc(doc(db, 'requests', requestId));
        // Update the state to remove the deleted request from the list
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
      } catch (error) {
        console.error('Error deleting request: ', error);
      }
    };
  return (
    <div className='cooe'>
      <div className='ddde '>
       <img src={logo} alt="logo" className='logoe z-10'  />
       {/* <img src={backlogo} alt="backlogo" className='absolute -top-20  z-0 rotate-45' /> */}
      </div>
    <section className="prfo">
    <div className="fex titles z-40">
      <h1 className='mb-3 mt-3'>الطلبات</h1>
    </div>
    {requests.length > 0 ? (
      <ul className="content d gap-5 " >

        {requests.map((request) => (
          <li className="borditem relative " key={request.id}>
        
        <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 384 512"                 onClick={() => handleDeleteRequest(request.id)} // Add the onClick event handler to delete the request
 className=' svg absolute top-2 left-2 transition-all ease-in-out hover:rotate-45 cursor-pointer'>
  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="#e48b2a" />
</svg>

     

            <div className="pb-2">
              <div className="fex inputs ">
                <div className="flex w-full justify-center frsf text-lg mb-2">
                  <p> {request.name}</p>
                  <p> - {request.location}</p>
                  <p>- {request.number  }</p>
                </div>
             
                <h1 className="text-xl mt-2 frsf"> الطلب  </h1>
              </div>
              <div></div>
              {request.productData && (

                      <div className="projcardo ga">

                        <div className="sssso">
                          <div className="projimgg">
                            <div className='imggg'>
                                                          <img src={request.productData.imgUrl} alt="Selected Option" />

                            </div>
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

        
            </div>
          
          </li>
        ))}
      </ul>
    ) : (
      <div className="noitem ">
        <h1>لا يوجد طلب</h1>
      </div>
    )}
  </section>
  </div>
  );
};
export default Requests;
