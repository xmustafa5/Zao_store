import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD_xZdgsvQEIb8Bhlve0niJZOGbgISt-dg",
    authDomain: "zao-store-e7fe8.firebaseapp.com",
    projectId: "zao-store-e7fe8",
    storageBucket: "zao-store-e7fe8.appspot.com",
    messagingSenderId: "215115864210",
    appId: "1:215115864210:web:f4acbbd46a293e4f8fae4b"
  };



  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };