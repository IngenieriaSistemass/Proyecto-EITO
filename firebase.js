// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyD0CwIGDPTOEdhWbX7Toj2YiDXQGwecz2c",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "fingers-4934a",
  storageBucket: "fingers-4934a.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: "1:546408144211:web:c63b35e782fcbe349b15a6",
  measurementId: "G-RNMDPLZ5HB"
};


const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
