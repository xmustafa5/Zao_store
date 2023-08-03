import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Hompg from "../components/Hompg";
import Shop from "./../components/Shop";
import Loading from "./../components/Loading";
import { useAuth } from "../context/AuthContext.js";

const Home = () => {
  const { isLoading,products } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Hompg />
      <Shop products={products}  />
    </>
  );
};

export default Home;
