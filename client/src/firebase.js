// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4GwqISz3JsirgTTxf9Y7d0G4bnJyDhWs",
  authDomain: "dallolmart-react.firebaseapp.com",
  projectId: "dallolmart-react",
  storageBucket: "dallolmart-react.appspot.com",
  messagingSenderId: "286757640853",
  appId: "1:286757640853:web:2b2152b089dd8f66a2199c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;