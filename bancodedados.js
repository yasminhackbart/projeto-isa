import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyApARnTmHSX71ofA7iSPGSGhG_Ill9Fcpk",
    authDomain: "loja-cigarra.firebaseapp.com",
    projectId: "loja-cigarra",
    storageBucket: "loja-cigarra.appspot.com",
    messagingSenderId: "28022064498",
    appId: "1:28022064498:web:55ee16624c4a61970789eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;