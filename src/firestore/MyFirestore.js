// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
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

  const getProductList = async() =>{
    const querySnapshot = await getDocs(collection(db, "ProductList"));
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const curData = doc.data();
      // use the id in the database
      curData.id = doc.id;
      data.push(curData);
    });
    return data;
  };

  const getShoppingCart = async() =>{
    const querySnapshot = await getDocs(collection(db, "ShoppingCart"));
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const curData = doc.data();
      curData.id = doc.id;
      data.push(curData);
    });
    return data;
  };

  const addNewProduct = async(product) =>{
    // Add a new document in collection "ProductList"
    const docRef = await addDoc(collection(db, "ProductList"), {
      name: product.name,
      price: product.price,
      image: product.image,
    });
    console.log("new docid:",docRef.id);
    return docRef.id;
  };

  db.getProductList = getProductList;
  db.getShoppingCart = getShoppingCart;
  db.addNewProduct = addNewProduct;

  // addNewProduct({name:"test",price:0,image:"https://images.albertsons-media.com/is/image/ABS/960038585-ECOM?$ng-ecom-pdp-tn$&defaultImage=Not_Available"});

  return db;
}

const mydb = MyFirestore();
export default mydb; 