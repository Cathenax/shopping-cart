// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, query, orderBy, increment, where, deleteDoc } from "firebase/firestore";
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
    const productRef = collection(db, "ProductList");
    const q = query(productRef, orderBy("price"));
    const querySnapshot = await getDocs(q);
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
    // console.log("new docid:",docRef.id);
    return docRef.id;
  };

  const updateProduct = async(product) =>{
    const curRef = doc(db, "ProductList", product.id);
    await updateDoc(curRef, {
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const addToCart = async(product) => {
    // look for possible same product in the cart
    const shoppingCartRef = collection(db, "ShoppingCart");
    const q = query(shoppingCartRef, where("productID", "==", product.id));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      console.log(querySnapshot);
      const doc = querySnapshot.docs[0];
      // console.log("Document data exists:", doc);
      // console.log(doc.id, " => ", doc.data(), doc.ref);
      
      // Atomically increment the number of the product by 1
      await updateDoc(doc.ref, {
        number: increment(1),
      });
    }
    else{
      // Document data does not exist, creating new doc
      // Add a new document in collection "ShoppingCart"
      await addDoc(collection(db, "ShoppingCart"), {
        productID: product.id,
        name: product.name,
        price: product.price,
        number: 1,
      });
    }
  };

  const removeFromCart = async(product) => {
    const shoppingCartRef = collection(db, "ShoppingCart");
    const q = query(shoppingCartRef, where("productID", "==", product.productID));
    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs[0].ref;

    // Remove the document
    await deleteDoc(docRef);
  };

  db.getProductList = getProductList;
  db.getShoppingCart = getShoppingCart;
  db.addNewProduct = addNewProduct;
  db.updateProduct = updateProduct;
  db.addToCart = addToCart;
  db.removeFromCart = removeFromCart;

  return db;
}

const mydb = MyFirestore();
export default mydb; 