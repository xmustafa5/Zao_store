import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD_xZdgsvQEIb8Bhlve0niJZOGbgISt-dg",
    authDomain: "zao-store-e7fe8.firebaseapp.com",
    projectId: "zao-store-e7fe8",
    storageBucket: "zao-store-e7fe8.appspot.com",
    messagingSenderId: "215115864210",
    appId: "1:215115864210:web:f4acbbd46a293e4f8fae4b"
  };



 

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
export const db = firebase.firestore();

// Initialize Storage
export const storage = firebase.storage();
export const auth = firebase.auth();

// You can also export other Firebase services if needed

export default firebase;