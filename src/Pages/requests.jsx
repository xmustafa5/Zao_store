import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const Requests = () => {
  const [requestItems, setRequestItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequestItems = async () => {
      try {
        const snapshot = await db.collection("requests").get();
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequestItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching request items:", error);
      }
    };

    fetchRequestItems();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const removeItemFromRequest = async (requestId, itemId, length) => {
    try {
      // Remove the item from the request document
      await db
        .collection("requests")
        .doc(requestId)
        .update({
          items: requestItems
            .find((item) => item.id === requestId)
            .items.filter((item) => item.id !== itemId),
        });

      // Update the local state
      setRequestItems((prevRequestItems) => {
        return prevRequestItems.map((item) => {
          if (item.id === requestId) {
            return {
              ...item,
              items: item.items.filter((item) => item.id !== itemId),
            };
          }
          return item;
        });
      });

      console.log("Item successfully removed from the request");
    } catch (error) {
      console.error("Error removing item from the request:", error);
    }
    if (length == 1) {
      removeRequest(requestId);
    }
  };

  const removeRequest = async (requestId) => {
    try {
      // Remove the request document from the collection
      await db.collection("requests").doc(requestId).delete();

      // Update the local state by filtering out the removed request
      setRequestItems((prevRequestItems) => {
        return prevRequestItems.filter((item) => item.id !== requestId);
      });

      console.log("Request successfully removed");
    } catch (error) {
      console.error("Error removing request:", error);
    }
  };

  return (
    <section className="pro">
      <div className="fex titles">
        <h1>Requests</h1>
      </div>
      {requestItems.length > 0 ? (
        <ul className="content d">
          {requestItems.map((request) => (
            <li className="borditem " key={request.id}>
              <div className="pb-2">
                <div className="fex inputs">
                  <div className="flex w-full justify-center text-lg mb-2">
                    <p> {request.input1}</p>
                    <p> - {request.input2}</p>
                    <p>- {request.input3}</p>
                  </div>
                  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="vvv  prth  px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" class="vvv  prth px-6 py-3">
                            SPH
                          </th>
                          <th scope="col" class=" vvv prth px-6 py-3">
                            CYL
                          </th>
                          <th scope="col" class="vvv  prth px-6 py-3">
                            AIX
                          </th>
                          <th scope="col" class="vvv  prth px-6 py-3">
                            lens type
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th
                            scope="row"
                            class="vvv px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Lift Eye
                          </th>
                          <td class="vvv px-6 py-4">{request.input8}</td>
                          <td class="vvv px-6 py-4">{request.input8}</td>
                          <td class="vvv px-6 py-4">{request.input8}</td>
                          <td class="vvv px-6 py-4">{request.input8}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th
                            scope="row"
                            class="vvv px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Right Eye
                          </th>
                          <td class="vvv px-6 py-4">{request.input8}</td>
                          <td class="vvv px-6 py-4">{request.input8}</td>
                          <td class="vvv px-6 py-4">{request.input8}</td>
                          <td class="vvv px-6 py-4"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>{" "}
                  <h1 className="text-xl mt-2">Glasses:</h1>
                </div>
                <div></div>

                {request.items && request.items.length > 0 ? (
                  <ul className="contento ">
                    {request.items.map((item) => (
                      <li key={item.id}>
                        <div className="projcardo">
                          <div className="sssso">
                            <div className="projimg">
                              <img src={item.imageUrl} alt="Selected Option" />
                            </div>
                            {/* <img src={imageSource} alt="Selected Option"  /> */}
                          </div>
                          <div className="projinfo">
                            <strong className="projtitle">
                              <span className="titlecard">{item.title} </span>
                              <div className="centerbrn">
                                {item.color && (
                                  <button className={`radio-buttono`}>
                                    {item.color}
                                  </button>
                                )}
                              </div>
                            </strong>
                            <div className="prices">
                              <p className="iopp">{item.price}$</p>
                            </div>
                            <div className="fexbtn">
                              <div className={"homebtngroup1"}>
                                <button
                                  className={"btnbtnprimary"}
                                  onClick={() =>
                                    removeItemFromRequest(
                                      request.id,
                                      item.id,
                                      request.items.length
                                    )
                                  }
                                >
                                  <p className={"btntext4"}>remove</p>
                                  <span className={"square"}></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items in the request.</p>
                )}
              </div>
              <div className="fexbtn">
                <button
                  className="button-29"
                  onClick={() => removeRequest(request.id)}
                >
                  Remove Request
                </button>
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
