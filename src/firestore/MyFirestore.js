// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


function MyFirestore(){
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC4dgO73HOg7t22aP1n0fswrqHDJN-U4Pw",
    authDomain: "cs5010-hw3.firebaseapp.com",
    projectId: "cs5010-hw3",
    storageBucket: "cs5010-hw3.appspot.com",
    messagingSenderId: "836049563833",
    appId: "1:836049563833:web:d92ad911c36ce1faf66b68",
    measurementId: "G-C05FY7YP0G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  return db;
}

const mydb = MyFirestore();
export default mydb; 