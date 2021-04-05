// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import firebase from "firebase";

//   if (!firebase.apps.length){
//       firebase.initializeApp(config);
//   }

  const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyCjvj_yD1p36Pq_3C-TlEfLeilnItWBa-E",
    authDomain: "instagram-clone-83c62.firebaseapp.com",
    databaseURL: "https://instagram-clone-83c62-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-83c62",
    storageBucket: "instagram-clone-83c62.appspot.com",
    messagingSenderId: "501529235627",
    appId: "1:501529235627:web:7c7273155fb5e0f9f4e7ee",
    measurementId: "G-SDB3TYFB2D"
  });

  const db =firebaseapp.firestore();
  const auth =firebase.auth();
  const storage =firebase.storage();

  export {db, auth, storage};




//   export default db;