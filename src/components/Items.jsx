import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { Link } from "react-router-dom";

const Items = () => {
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [title, setTitle] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  const handleImageChange = (e, setImageFile) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadTasks = [];

    if (imageFile1) {
      const uploadTask1 = storage
        .ref(`images/${imageFile1.name}`)
        .put(imageFile1);
      uploadTasks.push(uploadTask1);
    }

    if (imageFile2) {
      const uploadTask2 = storage
        .ref(`images/${imageFile2.name}`)
        .put(imageFile2);
      uploadTasks.push(uploadTask2);
    }

    Promise.all(uploadTasks)
      .then(() => {
        const imageUrlPromises = [];

        if (imageFile1) {
          const imageUrl1Promise = storage
            .ref("images")
            .child(imageFile1.name)
            .getDownloadURL();
          imageUrlPromises.push(imageUrl1Promise);
        }

        if (imageFile2) {
          const imageUrl2Promise = storage
            .ref("images")
            .child(imageFile2.name)
            .getDownloadURL();
          imageUrlPromises.push(imageUrl2Promise);
        }

        return Promise.all(imageUrlPromises);
      })
      .then((imageUrls) => {
        const item = {
          imageUrl1: imageUrls[0] || "",
          imageUrl2: imageUrls[1] || "",
          title,
          color1,
          color2,
          price,
        };

        return db.collection("products").add(item);
      })
      .then(() => {
        console.log("Item added successfully!");
        setImageFile1(null);
        setImageFile2(null);
        setTitle("");
        setColor1("");
        setColor2("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = db.collection("products").onSnapshot((snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    return () => unsubscribe();
  }, []);

  const handleRemoveProduct = (productId) => {
    db.collection("products")
      .doc(productId)
      .delete()
      .then(() => {
        console.log("Product removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing product:", error);
      });
  };

  return (
    <div className="pro">
<div className="contfrom">
      <form onSubmit={handleSubmit} className="form">
        <div className="fleoxx">
          
          <h1 className="fex titles pt-8">Add Item</h1>
        </div>
        <div className="  flex justify-center mt-4 mb-3 ">
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="first_name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
            />
          </div>
        </div>

        <div className="flexxx">
          <div className="flexinputs">
            <div class="inputsss">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  for="file_input"
                >
                  glass 1
                </label>
                <input
                  onChange={(e) => handleImageChange(e, setImageFile1)}
                  class="block w-64 align-Items-center    mb-5 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
              </div>
              <div>
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                  color 1
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="black"
                />
              </div>
            </div>
            <div class="inputsss">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  for="file_input"
                >
                  glass 2
                </label>
                <input
                  onChange={(e) => handleImageChange(e, setImageFile2)}
                  class="block w-64 align-Items-center    mb-5 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
              </div>
              <div>
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                  color 2
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="whithe"
                />
              </div>
              <div></div>
            </div>
            <div></div>
          </div>
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
            >
              price
            </label>
            <input
              type="text"
              id="last_name"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="200"
            />
          </div>{" "}
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-64 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
</div>  
      <div className="proo">
        
        <h1 className="fex mt-10 text-lg mb-6 titles">items</h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg border-r-2">
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
            {products.map((product) => (
              // <div key={product.id}>
              //   <h3>{product.title}</h3>
              //   {product.color1 && <p>Color 1: {product.color1}</p>}
              //   {product.color2 && <p>Color 2: {product.color2}</p>}
              //   <p>Price: {product.price}</p>
              //   <button onClick={() => handleRemoveProduct(product.id)}>
              //     Remove Product
              //   </button>
              //   <hr />
              // </div>

              <tbody key={product.id}>
  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <th
      scope="row"
      class="vvv px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {product.title?.length > 0 ? (
        product.title
      ) : (
        <span>no title</span>
      )}
    </th>
    <td class="vvv px-6 py-4">{product.color1}</td>
    <td class="vvv px-6 py-4">{product.color2}</td>
    <td class="vvv px-6 py-4">{product.price}</td>
    <td class="vvv px-6 py-4">
      <Link
        onClick={() => handleRemoveProduct(product.id)}
        class="font-medium text-blue-300 dark:text-blue-200 hover:underline"
      >
        remove
      </Link>
    </td>
  </tr>
</tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Items;
