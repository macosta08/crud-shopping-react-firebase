import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDBaa702Alb20qy4zmEKStHDqDShhue_PA",
  authDomain: "shopping-supermarket.firebaseapp.com",
  projectId: "shopping-supermarket",
  storageBucket: "shopping-supermarket.appspot.com",
  messagingSenderId: "890600804521",
  appId: "1:890600804521:web:7b4711ef0097eb4a7e99b8",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
